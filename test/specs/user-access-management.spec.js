import { expect } from 'chai';
import userAccessManagementPage from '../pageobjects/user-access-management.page';
import userAccessManagementData from '../data/user-access-management.data';

describe('User Access Management Spec', () => {
    beforeEach('it should open the page', async () => {
        await userAccessManagementPage.open('https://www.imdb.com/');
    });

    describe('Negative Tests with invalid credentials', () => {
        it('should show error when email is missing', async () => {
            await userAccessManagementPage.clickSignIn();
            await userAccessManagementPage.enterEmail(
                userAccessManagementData.emptyEmail
            );
            const errorText = await userAccessManagementPage.getErrorMessage(2);
            expect(errorText).to.include(
                userAccessManagementData.messageForEmptyEmail
            );
        });

        it('should show error for invalid email format', async () => {
            await userAccessManagementPage.clickSignIn();
            await userAccessManagementPage.enterEmail(
                userAccessManagementData.wrongEmailFormat
            );
            const errorText = await userAccessManagementPage.getErrorMessage(3);
            expect(errorText).to.include(
                userAccessManagementData.messageForWrongEmailFormat
            );
        });

        it('should show error when email not exists', async () => {
            await userAccessManagementPage.clickSignIn();
            await userAccessManagementPage.enterEmail(
                userAccessManagementData.nonExistentEmail
            );
            const errorText = await userAccessManagementPage.getErrorMessage(0);
            expect(errorText).to.include(
                userAccessManagementData.messageForNonExistentEmail
            );
        });
    });

    describe.skip('Positive Tests with valid credentials', () => {
        it('should login successfully with valid credentials', async () => {
            await userAccessManagementPage.clickSignIn();
            await userAccessManagementPage.enterEmail(
                userAccessManagementData.validEmail
            );
            await userAccessManagementPage.enterPassword(
                userAccessManagementData.password
            );
            await userAccessManagementPage.enterOtp();
            const userMenuText =
                await userAccessManagementPage.getUserMenuText();
            expect(userMenuText).to.include(userAccessManagementData.userName);
        });
    });
});
