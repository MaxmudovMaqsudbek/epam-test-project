import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import searchPage from '../../pageobjects/search.page';


//Background

Given('I open the IMDb homepage', async () => {
    await searchPage.open('https://www.imdb.com/');
});

//Search Steps

When('I search for {string}', async (query) => {
    await searchPage.searchFor(query);
});

Then('the first result should contain {string}', async (title) => {
    const text = await searchPage.firstResultTitle.getText();
    expect(text).to.include(title);
});

Then('the first result should not contain {string}', async (title) => {
    const text = await searchPage.firstResultTitle.getText();
    expect(text).to.not.include(title);
});

Then('I should see at least one search result', async () => {
    const results = await searchPage.resultsList;
    expect(results.length).to.be.greaterThan(0);
});

Then('each result should have a visible title', async () => {
    const results = await searchPage.resultsList;
    for (const item of results) {
        const title = await item.$('.ipc-title__text');
        const isDisplayed = await title.isDisplayed();
        expect(isDisplayed).to.equal(true);
    }
});

Then('each result should have a working link', async () => {
    const results = await searchPage.resultsList;
    for (const item of results) {
        const link = await item.$('a');
        const href = await link.getAttribute('href');
        expect(href).to.not.be.empty;
    }
});

Then('I should see a {string} message', async (message) => {
    const text = await searchPage.emptyResultsMessage.getText();
    expect(text).to.include(message);
});
