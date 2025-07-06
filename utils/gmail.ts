import {google} from 'googleapis';

export async function getConfirmationLinkFromGmail(
    toEmail: string,
    options?: { timeoutMs?: number; intervalMs?: number }
): Promise<string | null> {
    const timeoutMs = options?.timeoutMs ?? 30_000; // default: 30s
    const intervalMs = options?.intervalMs ?? 5_000; // default: check every 5s
    const maxAttempts = Math.ceil(timeoutMs / intervalMs);

    const credentials = JSON.parse(process.env.GMAIL_CREDENTIALS_JSON);
    const token = JSON.parse(process.env.GMAIL_TOKEN_JSON);

    const {client_id, client_secret, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(token);

    const gmail = google.gmail({version: 'v1', auth: oAuth2Client});

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

        const list = await gmail.users.messages.list({
            userId: 'me',
            q: `to:${toEmail}`,
            maxResults: 5,
        });

        const message = list.data.messages?.[0];
        if (message) {
            const fullMessage = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
                format: 'full',
            });

            const payload = fullMessage.data.payload;
            const parts = payload?.parts ?? [];
            const htmlPart = parts.find(p => p.mimeType === 'text/html') ?? payload;

            const bodyData = htmlPart?.body?.data;
            if (bodyData) {
                const decodedHtml = Buffer.from(bodyData, 'base64').toString('utf-8');
                const match = RegExp(/https:\/\/account\.hubstaff\.com\/confirm_account\/[a-zA-Z0-9_-]+/).exec(decodedHtml);

                if (match?.[0]) {
                    return match[0];
                }
            }
        }
        if (attempt < maxAttempts) {
            await new Promise((res) => setTimeout(res, intervalMs));
        }
    }
    throw new Error('Confirmation link not found within timeout');
}