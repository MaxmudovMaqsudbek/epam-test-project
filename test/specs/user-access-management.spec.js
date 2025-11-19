
import { expect } from 'chai';
import userAccessManagementPage from '../pageobjects/user-access-management.page';

describe("User Access Management Spec", () => {
    beforeEach("it should open the page", async () => {
        await userAccessManagementPage.open("https://www.imdb.com/");
    });

    describe("Negative Tests with invalid credentials", () => {
            it("should show error when email is missing", async () => {
                await userAccessManagementPage.clickSignIn();
                await userAccessManagementPage.enterEmail("");
                const errorText = await userAccessManagementPage.getErrorMessage(2);
                expect(errorText).to.include("Enter your email or mobile phone num");
            });

            it("should show error for invalid email format", async () => {
                await userAccessManagementPage.clickSignIn();
                await userAccessManagementPage.enterEmail("wrongemail");
                const errorText = await userAccessManagementPage.getErrorMessage(3);
                expect(errorText).to.include("Wrong or Invalid email address or mobile phone number. Please correct and try again.");
            });

            it("should show error when email not exists", async () => {
                await userAccessManagementPage.clickSignIn();
                await userAccessManagementPage.enterEmail("nonexisting@example.com");
                const errorText = await userAccessManagementPage.getErrorMessage(0);
                expect(errorText).to.include("We couldn't find an IMDb account with that email address. If you recently signed in using your Amazon account, your IMDb account may now be managed through Amazon. Try signing in with your Amazon account or visit the IMDb Help Center.");
            });
     });

    describe("Positive Tests with valid credentials", () => {
        it("should login successfully with valid credentials", async () => {
            await userAccessManagementPage.clickSignIn();
            await userAccessManagementPage.enterEmail("mahmudovmaqsudbek2607@gmail.com");
            await userAccessManagementPage.enterPassword("Maqsudbek2607");    
            await userAccessManagementPage.enterOtp();
            const userMenuText = await userAccessManagementPage.getUserMenuText();
            expect(userMenuText).to.include("Maqsudbek");
        });
    })
});


