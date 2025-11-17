import { expect } from 'chai';

describe("Search Functionality Spec", ()=>{
    beforeEach("it should open the page", async()=>{
        await browser.url("https://www.imdb.com/");

    })

    it("should return correct results for a valid search query", async()=>{
        const searchInput = await $("input[id='suggestion-search']");
        await searchInput.setValue("Home Alone");
        const searchButton = await $("button[id='suggestion-search-button']");
        await searchButton.click();
        const firstResult = await $("[data-testid='find-results-section-title'] .ipc-metadata-list:nth-child(1) .ipc-title a.ipc-title-link-wrapper .ipc-title__text");
        const firstResultText = await firstResult.getText();
        expect(firstResultText).to.not.include("Back to the Future");
        expect(firstResultText).to.include("Home Alone");
    })

    it("should return at least one result for a common search query", async()=>{
        const searchInput = await $("input[id='suggestion-search']");
        await searchInput.setValue("Batman");
        const searchButton = await $("button[id='suggestion-search-button']");
        await searchButton.click();
        const result = await $$("[data-testid='find-results-section-title'] .ipc-metadata-list");
        expect(result.length).to.be.greaterThan(0);
    })

    it("should verify that each result contains a title and a working link", async()=>{
        const searchInput = await $("input[id='suggestion-search']");
        await searchInput.setValue("Matrix");
        const searchButton = await $("button[id='suggestion-search-button']");
        await searchButton.click();

        const items = await $$("[data-testid='find-results-section-title'] .ipc-metadata-list li");
        for(const item of items){
            const title = await item.$(".ipc-title__text");
            const link = await item.$("a") ;

            expect(await title.isDisplayed()).to.equal(true);
            expect(await link.getAttribute("href")).to.not.be.empty;
        }
    })

    it("should return a proper message for a non-existing movie", async()=>{
        const searchInput = await $("input[id='suggestion-search']");
        await searchInput.setValue("thjsdhfjhwfjkewjkjfek");
        const searchButton = await $("button[id='suggestion-search-button']");
        await searchButton.click();

        const noResults = await $("[data-testid='results-section-empty-results-msg']");
        const notFound = await noResults.getText();
        expect(notFound).to.include("No results found for");
    })
})