import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import languagePage from '../../pageobjects/language.page';

//Background

Given('I open the IMDb homepage', async () => {
    await languagePage.open('https://www.imdb.com/');
});


//Scenarios

When('I open the language menu', async () => {
    await languagePage.openMenu();
});

Then('the language list should be visible', async () => {
    expect(await languagePage.list.isDisplayed()).to.equal(true);
});

Then('the list should contain at least one language', async () => {
    const items = await languagePage.listItems;
    expect(items.length).to.be.greaterThan(0);
});

Then('I should see {string} in the language options', async (language) => {
    
    if (language === 'Español') {
        const text = await languagePage.getSpanishText();
        expect(text).to.include(language);
    } else {
        const text = await languagePage.menu.getText();
        expect(text).to.include(language);
    }
});

When('I choose the German language option', async () => {
    await languagePage.selectGerman();
});

Then('the website should switch to the German version', async () => {
    const url = await browser.getUrl();
    expect(url).to.include('/de');
});
