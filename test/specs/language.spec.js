import { expect } from 'chai';

describe("Language Functionality Spec", () => {
    beforeEach("it should open the page", async () => {
        await browser.url("https://www.imdb.com/");
    })

    it("should open language selector and display available languages", async () => {
        const languageButton = await $("label[for='nav-language-selector']");
        await languageButton.click();
        const languagesList = await $("#nav-language-selector-contents .ipc-list");
        await languagesList.waitForDisplayed();
        expect(await languagesList.isDisplayed()).to.equal(true);

        const languagesListItems = await $$("#nav-language-selector-contents .ipc-list li");
        expect(languagesListItems.length).to.be.greaterThan(0);
    })

  it("should contain Spanish in the list of available languages", async () => {
        const languageButton = await $("label[for='nav-language-selector']");
        await languageButton.click();
        
        const languageMenu = await $("#nav-language-selector-contents");
        await languageMenu.waitForDisplayed();
        const spanishOption = await $("=Español (España)");
        await spanishOption.waitForClickable();
        
        const fullText = await spanishOption.getText();
        console.log("Found text:", fullText);
        
        expect(fullText).to.include("Español");
    });

    it("should change the website language to German", async () => {
        const languageButton = await $("label[for='nav-language-selector']");
        await languageButton.click();
        
        const languageMenu = await $("#nav-language-selector-contents");
        await languageMenu.waitForDisplayed();
        const germanOption = await $("=Deutsch (Deutschland)");
        await germanOption.waitForClickable();
        await germanOption.click();
        
        const changedLanguage = await browser.waitUntil(async () => (await browser.getUrl()).includes('https://www.imdb.com/de'));
        
        expect(changedLanguage).to.equal(true);
        expect(await browser.getUrl()).to.include('https://www.imdb.com/de');
    });
})