import BasePage from "./base.page";

class UserAccessManagementPage extends BasePage{
    get signInButton(){return $("a.ipc-btn[href*='registration/signin']")}
    get createAccountButton(){return $(".display-button-container a.ipc-btn")}
    get inputEmail(){return $("#ap_email")}
    get continueButton(){return $("#continue")}
    get errorMessages(){return $$(".a-alert-content")}
    get inputPassword(){return $("#ap_password")}
    get signInSubmitButton(){return $("#signInSubmit")}
    get inputOtp(){return $("#auth-mfa-otpcode")}
    get submitButton(){return $("#auth-signin-button")}
    get userMenu(){return $("#imdbHeader .nav__userMenu .ipc-btn")}

    async clickSignIn(){
        await this.click(this.signInButton);
        await this.click(this.createAccountButton);
    }

    async enterEmail(email){
        await this.type(this.inputEmail, email);
        await this.click(this.continueButton);
    }

    async enterPassword(password){
        await this.type(this.inputPassword, password);
        await this.click(this.signInSubmitButton);
    }

    async enterOtp(){
        const inputOtp = await this.inputOtp;
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
        await this.click(this.submitButton);
    }

    async getUserMenuText(){
        await this.wait(this.userMenu);
        return this.userMenu.getText();
    }

    async getErrorMessage(index){
        await this.wait(this.errorMessages[index]);
        return this.errorMessages[index].getText();
    }
}

export default new UserAccessManagementPage();