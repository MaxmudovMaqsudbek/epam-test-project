import { expect } from 'chai';
import searchPage from '../pageobjects/search.page';

describe("Search Functionality Spec", ()=>{
    beforeEach("it should open the page", async()=>{
        await searchPage.open("https://www.imdb.com");
    })

    it("should return correct results for a valid search query", async()=>{
        await searchPage.searchFor("Home Alone");
        const firstResultText = await searchPage.firstResultTitle.getText();
        expect(firstResultText).to.not.include("Back to the Future");
        expect(firstResultText).to.include("Home Alone");
    })

    it("should return at least one result for a common search query", async()=>{
        await searchPage.searchFor("Batman");
        const result = await searchPage.resultsList;
        expect(result.length).to.be.greaterThan(0);
    })

    it("should verify that each result contains a title and a working link", async()=>{
        await searchPage.searchFor("Matrix");
        for(const item of await searchPage.resultsList){
            const title = await item.$(".ipc-title__text");
            const link = await item.$("a") ;
            expect(await title.isDisplayed()).to.equal(true);
            expect(await link.getAttribute("href")).to.not.be.empty;
        }
    })

    it("should return a proper message for a non-existing movie", async()=>{
        await searchPage.searchFor("thjsdhfjhwfjkewjkjfek");
        const notFound = await searchPage.emptyResultsMessage.getText();
        expect(notFound).to.include("No results found for");
    })
})