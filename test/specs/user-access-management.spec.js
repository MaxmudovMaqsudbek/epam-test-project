
import { expect } from 'chai';

describe("User Access Management Spec", () => {
    beforeEach("it should open the page", async () => {
        await browser.url("https://www.imdb.com/");
    });

    describe("Negative Tests with invalid credentials", () => {

            it("should show error when email is missing", async () => {
                const signInButton = await $("a.ipc-btn[href*='registration/signin']");
                await signInButton.click();

                const createAccountButton = await $(".display-button-container a.ipc-btn");
                await createAccountButton.click();

                const inputEmail = await $("#ap_email");
                await inputEmail.setValue("");

                const continueButton = await $("#continue");
                await continueButton.click();

                const errorMessage = await $$(".a-alert-content")[2];
                const errorText = await errorMessage.getText();
                
                expect(errorText).to.include("Enter your email or mobile phone num");
            });

            it("should show error for invalid email format", async () => {
                const signInButton = await $("a.ipc-btn[href*='registration/signin']");
                await signInButton.click();

                const createAccountButton = await $(".display-button-container a.ipc-btn");
                await createAccountButton.click();

                const inputEmail = await $("#ap_email");
                await inputEmail.setValue("wrongemail");

                const continueButton = await $("#continue");
                await continueButton.click();

                const errorMessage = await $$(".a-alert-content")[3]
                const errorText = await errorMessage.getText();
                expect(errorText).to.include("Wrong or Invalid email address or mobile phone number. Please correct and try again.");
            });

            it("should show error when email not exists", async () => {
                const signInButton = await $("a.ipc-btn[href*='registration/signin']");
                await signInButton.click();

                const createAccountButton = await $(".display-button-container a.ipc-btn");
                await createAccountButton.click();

                const inputEmail = await $("#ap_email");
                await inputEmail.setValue("nonexisting@example.com");

                const continueButton = await $("#continue");
                await continueButton.click();

                const errorMessage = await $$(".a-alert-content")[0];
                const errorText = await errorMessage.getText();
                expect(errorText).to.include("We couldn't find an IMDb account with that email address. If you recently signed in using your Amazon account, your IMDb account may now be managed through Amazon. Try signing in with your Amazon account or visit the IMDb Help Center.");
            });
     });

    describe.skip("Positive Tests with valid credentials", () => {
        it("should login successfully with valid credentials", async () => {
            const signInButton = await $("a.ipc-btn[href*='registration/signin']");
            await signInButton.click();
            const createAccountButton = $("[data-testid='create_account_aap']")
            await createAccountButton.click();
            const inputEmail = await $("#ap_email");
            await inputEmail.setValue("mahmudovmaqsudbek2607@gmail.com");
            const continueButton = await $("#continue");
            await continueButton.click();
    
            const inputPassword = await $("#ap_password");
            await inputPassword.setValue("Maqsudbek2607");
            const signInSubmitButton = await $("#signInSubmit");
            await signInSubmitButton.click();
    
            const inputOtp = await $("#auth-mfa-otpcode");
            await browser.waitUntil(
                async () => {
                    const otp = await inputOtp.getValue();
                    return otp.length === 6;
                },
                {
                    timeout: 120000, 
                    timeoutMsg: 'OTP was not entered within 2 minutes',
                    interval: 500
                }
            );
            const submitButton = await $("#auth-signin-button");
            await submitButton.click();
            const userMenu = await $("#imdbHeader .nav__userMenu .ipc-btn");
            const userMenuText = await userMenu.getText();
            
            expect(userMenuText).to.include("Maqsudbek");
        });
    })
});


