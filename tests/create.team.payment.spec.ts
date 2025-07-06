import {hubstaffTest as test} from "./test.base";

test('Create a team payment: one time amount aka "bonus" payment', async ({
                                                                              app: {
                                                                                  financialsPage,
                                                                                  paymentSummaryPage
                                                                              }
                                                                          }) => {
    const oneTimeAmount = financialsPage.oneTimeAmount;
    await oneTimeAmount.open();
    const member = await oneTimeAmount.selectFirstMember();
    const amount = await oneTimeAmount.fillAmountPerMember()
    await oneTimeAmount.fillNote();
    await oneTimeAmount.clickCreatePayment();
    await oneTimeAmount.paymentModal.clickCreatePayment();
    await oneTimeAmount.notifications.expectTextVisible('Marked as paid')
    await oneTimeAmount.paymentModal.dismiss();
    await paymentSummaryPage.expectGroupBy('Member');
    await paymentSummaryPage.expectTableData({
        member,
        rateType: 'One time',
        hours: '0:00:00',
        status: 'Pending',
        amount: amount
    });
})