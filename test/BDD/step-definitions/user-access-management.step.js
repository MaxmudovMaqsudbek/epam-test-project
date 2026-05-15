import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import userAccessManagementPage from '../../pageobjects/user-access-management.page';


Given('I am on the IMDb home page', async () => {
    await userAccessManagementPage.open('https://www.imdb.com/');
});

When('I click the "Sign In" button', async () => {
    await userAccessManagementPage.click(userAccessManagementPage.signInButton);
});

Then('I should be redirected to the Sign In page', async () => {
    const isDisplayed = await userAccessManagementPage.createAccountButton.isDisplayed();
    expect(isDisplayed).to.equal(true);
});

Then('I should see two options: "Sign In" and "Create a New Account"', async () => {
    const isDisplayed = await userAccessManagementPage.createAccountButton.isDisplayed();
    expect(isDisplayed).to.equal(true);
});

//Scenarios

When('I click the "Create a New Account" button', async () => {
    await userAccessManagementPage.click(userAccessManagementPage.createAccountButton);
});

When('I leave the email field empty', async () => {
    await userAccessManagementPage.type(userAccessManagementPage.inputEmail, '');
});

When('I click the Continue button', async () => {
    await userAccessManagementPage.click(userAccessManagementPage.continueButton);
});

When('I enter {string} in the email field', async (email) => {
    await userAccessManagementPage.type(userAccessManagementPage.inputEmail, email);
});

Then('I should see an error message {string}', async (errorMessage) => {
    const alerts = await userAccessManagementPage.errorMessages;
    const texts = await Promise.all(alerts.map(alert => alert.getText()));
    const found = texts.some(t => t.includes(errorMessage));
    expect(found).to.equal(true, `Expected error message "${errorMessage}" to be found in: ${JSON.stringify(texts)}`);
});


//Positive Scenario

When('I enter a valid email {string}', async (email) => {
    await userAccessManagementPage.type(userAccessManagementPage.inputEmail, email);
});

When('I enter a valid password {string}', async (password) => {
    await userAccessManagementPage.type(userAccessManagementPage.inputPassword, password);
});

When('I click the Sign In button', async () => {
    await userAccessManagementPage.click(userAccessManagementPage.signInSubmitButton);
});

When('I enter the received 6-digit OTP code', async () => {
    const inputOtp = await userAccessManagementPage.inputOtp;
    await browser.waitUntil(
        async () => {
            const otp = await inputOtp.getValue();
            return otp.length === 6;
        },
        {
            timeout: 120000,
            timeoutMsg: 'OTP was not entered within 2 minutes',
            interval: 500,
        }
    );
});

When('I click the final Submit button', async () => {
    await userAccessManagementPage.click(userAccessManagementPage.submitButton);
});

Then('I should see my username {string} in the IMDb header', async (username) => {
    const text = await userAccessManagementPage.getUserMenuText();
    expect(text).to.include(username);
});
