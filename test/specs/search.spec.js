import { expect } from 'chai';
import searchPage from '../pageobjects/search.page';
import searchData from '../data/search.data';

describe('Search Functionality Spec', () => {
    beforeEach('it should open the page', async () => {
        await searchPage.open('https://www.imdb.com');
    });

    it('should return correct results for a valid search query', async () => {
        await searchPage.searchFor(searchData.correctMovie);
        const firstResultText = await searchPage.firstResultTitle.getText();
        expect(firstResultText).to.not.include(searchData.nonExistentMovie);
        expect(firstResultText).to.include(searchData.correctMovie);
    });

    it('should return at least one result for a common search query', async () => {
        await searchPage.searchFor(searchData.commonMovie);
        const result = await searchPage.resultsList;
        expect(result.length).to.be.greaterThan(0);
    });

    it('should verify that each result contains a title and a working link', async () => {
        await searchPage.searchFor(searchData.sciFiMovie);
        for (const item of await searchPage.resultsList) {
            const title = await item.$('.ipc-title__text');
            const link = await item.$('a');
            expect(await title.isDisplayed()).to.equal(true);
            expect(await link.getAttribute('href')).to.not.be.empty;
        }
    });

    it('should return a proper message for a non-existing movie', async () => {
        await searchPage.searchFor(searchData.gibberish);
        const notFound = await searchPage.emptyResultsMessage.getText();
        expect(notFound).to.include(searchData.notFoundMessage);
    });
});
