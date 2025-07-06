import {faker} from '@faker-js/faker';

export class FakerUtil {

    public static appendUUID(prefix: string) {
        return `${prefix}_${faker.string.uuid()}`;
    }

    public static randomUUID() {
        return faker.string.uuid();
    }

    public static randomAddress() {
        return faker.location.streetAddress({useFullAddress: true});
    }

    public static randomPhoneNumber() {
        return faker.phone.number();
    }

    public static randomNumber() {
        return faker.number.int({min: 1, max: 9999}).toString();
    }

    public static randomWord() {
        return faker.word.noun();
    }

    public static randomFirstName() {
        return faker.person.firstName();
    }

    public static randomLastName() {
        return faker.person.lastName();
    }

    public static randomEmail() {
        return `testemailstoday25+${faker.number.int({min: 5, max: 100})}@gmail.com`;
    }

    public static randomPassword() {
        return faker.internet.password({
            length: 12,
            memorable: false,
        });
    }
}
