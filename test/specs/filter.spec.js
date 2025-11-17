import { expect } from 'chai';

function parseVoteCount(text){
    const cleaned = text.replace(/[()]/g,'').trim();
    if(cleaned.includes('M')){
        return parseFloat(cleaned.replace('M','')) * 1000000;
    } else if(cleaned.includes('K')){
        return parseFloat(cleaned.replace('K','')) * 1000;
    } else {
        return parseInt(cleaned);
    }
}

describe("Filter Functionality Spec", ()=>{
    beforeEach("it should open the page", async()=>{
        await browser.url("https://www.imdb.com/");
    }) 
    
    
    it("should filter movie by User Rating", async()=>{
        const menuButton = await $("div.sc-8798a0ad-0");
        await menuButton.click();

        const topMovies = await $("//span[contains(text(),'Top 250 movies')]");
        await topMovies.click();

        const filterButton = await $("[data-testid='filter-menu-button']");
        await filterButton.click();

        const minRatingInput = await $("#text-input__2");
        await minRatingInput.scrollIntoView();
        await minRatingInput.setValue(9);
        const maxRatingInput = await $("#text-input__3");
        await maxRatingInput.scrollIntoView();
        await maxRatingInput.setValue(10);
        const closeButton = await $(".ipc-promptable-base__close");
        await closeButton.click();
        await browser.pause(1000);
        const movies = await $$(".ipc-metadata-list li")
        expect(movies.length, 'No movies found after filtering').to.be.greaterThan(0);

        for(const movie of movies){
            const ratingElement = await movie.$(".ipc-metadata-list-summary-item__c .ipc-rating-star .ipc-rating-star--rating");
            const ratingText = await ratingElement.getText();
            const ratingValue = parseFloat(ratingText);
            expect(ratingValue).to.not.be.NaN;
            expect(ratingValue).to.be.at.least(9);
            expect(ratingValue).to.be.at.most(10);
        }
    })

    it("should filter movies by Number of Votes", async()=>{
        const menuButton = await $("div.sc-8798a0ad-0");
        await menuButton.click();

        const topMovies = await $("//span[contains(text(),'Top 250 movies')]");
        await topMovies.click();

        const filterButton = await $("[data-testid='filter-menu-button']");
        await filterButton.click();

        const minVoteInput = await $("[name='filter-user-rating-count-start-input']")
        await minVoteInput.scrollIntoView();
        await minVoteInput.setValue(3000000);
        const maxVoteInput = await $("[name='filter-user-rating-count-end-input']")
        await maxVoteInput.scrollIntoView();
        await maxVoteInput.setValue(4000000);
        const closeButton = await $(".ipc-promptable-base__close");
        await closeButton.click();
        await browser.pause(1000);
        const movies = await $$(".ipc-metadata-list li")
        expect(movies.length, 'No movies found after filtering').to.be.greaterThan(0);
        console.log("movies",movies);
        expect(movies.length, 'Expected only one movie to match the filter criteria').to.equal(2);

        for(const movie of movies){
            const ratingElement = await movie.$(".ipc-metadata-list-summary-item__c .ipc-rating-star .ipc-rating-star--voteCount");
            const ratingText = await ratingElement.getText();
            const voteCount = parseVoteCount(ratingText);
            expect(voteCount).to.not.be.NaN;
            expect(voteCount).to.be.at.least(3000000);
            expect(voteCount).to.be.at.most(4000000);
        }
    })

    it("should check the first movie when IMDb rating is sorted in descending order", async()=>{
        const menuButton = await $("div.sc-8798a0ad-0");
        await menuButton.click();

        const topMovies = await $("//span[contains(text(),'Top 250 movies')]");
        await topMovies.click();

        const sortingItemsSelector =  await $("#sort-by-selector");
        sortingItemsSelector.click();

        const imdbOption = await $("#sort-by-selector option[value='USER_RATING']");
        await imdbOption.click();
        const isSelected = await imdbOption.isSelected();
        expect(isSelected).to.be.true;

        const descendingButton = await $("#swap-sort-order-button");
        await descendingButton.click();
        await browser.pause(1000);

        const movies = await $$(".ipc-metadata-list li");
        expect(movies.length, 'No movies found after filtering').to.be.greaterThan(0);
        
        const firstMovie = await movies[0].$("a .ipc-title__text");
        const firstMovieText = await firstMovie.getText();
        expect(firstMovieText).to.include('The Incredibles');
    })
})

