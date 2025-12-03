import { parseVoteCount } from "../utils/parse.utils";
import BasePage from "./base.page";
import { expect } from "chai";
class FilterPage extends BasePage {

    get allMenuButton() { return $("div.sc-8798a0ad-0") }
    get top250MoviesLink() { return $("//span[contains(text(),'Top 250 movies')]") }
    get filterButton() { return $("[data-testid='filter-menu-button']") }
    get closeButton() { return $(".ipc-promptable-base__close") }
    get minRatingInput() { return $("[name='filter-user-rating-start-input']") }
    get maxRatingInput() { return $("[name='filter-user-rating-end-input']") }
    get minVoteInput() { return $("[name='filter-user-rating-count-start-input']") }
    get maxVoteInput() { return $("[name='filter-user-rating-count-end-input']") }
    get moviesList() { return $$(".ipc-metadata-list li") }
    get movieRatingSelector() { return ".ipc-metadata-list-summary-item__c .ipc-rating-star .ipc-rating-star--rating"}
    get numberOfVotesSelector() {return ".ipc-metadata-list-summary-item__c .ipc-rating-star .ipc-rating-star--voteCount"}
    get sortDropdown() { return $("#sort-by-selector") }
    get sortOptionUserRating() { return $("#sort-by-selector option[value='USER_RATING']") }
    get descendingButton() { return $("#swap-sort-order-button") }
    
    get firstMovieTitle() { 
        return this.moviesList[0].$("a .ipc-title__text");
    }

    getResult(index) {
        return this.moviesList[index];
    }

    async getMovieRating(index) {
        const movie = await this.getResult(index);
        return movie.$(this.movieRatingSelector);
    }

    async getNumberOfVotes(index) {
        const movie = await this.getResult(index);
        return movie.$(this.numberOfVotesSelector);
    }

    async openTop250Movies() {
        await this.click(this.allMenuButton);
        await this.click(this.top250MoviesLink);
    }

    async openFilterMenu() {
        await this.click(this.filterButton);
    }

    async setUserRatingFilter(min, max) {
        await this.minRatingInput.scrollIntoView();
        await this.type(this.minRatingInput, min);
        await this.maxRatingInput.scrollIntoView();
        await this.type(this.maxRatingInput, max);
    }

    async setUserVoteFilter(min, max) {
        await this.minVoteInput.scrollIntoView();
        await this.type(this.minVoteInput, min);
        await this.maxVoteInput.scrollIntoView();
        await this.type(this.maxVoteInput, max);
    }

    async closeFilterMenu() {
        await this.click(this.closeButton);
        await browser.pause(500);
    }

    async sortByImdbRating() {
        this.click(await this.sortDropdown);
        await this.sortOptionUserRating.click();
    }

    async changeSortedItemsDescendingOrder() {
        this.click(await this.descendingButton);
    }

    async waitForFirstMovieToBe(title) {
        await browser.waitUntil(
            async () => {
                const text = await this.firstMovieTitle.getText();
                return text.includes(title);
            }
        );
    }

    async validateRatingRange(min, max) {
        const movies = await this.moviesList;

        for (let i = 0; i < movies.length; i++) {
            const ratingElement = await this.getMovieRating(i);
            const ratingText = await ratingElement.getText();
            const value = parseFloat(ratingText);

            if (!isNaN(value)) {
                expect(value).to.be.within(min, max);
            }
        }
    }

    async validateVotesAreWithinRange(min, max) {
        const movies = await this.moviesList;

        for (let i = 0; i < movies.length; i++) {
            const votesElement = await this.getNumberOfVotes(i);
            const votesText = await votesElement.getText();
            const count = parseVoteCount(votesText);

            if (!isNaN(count)) {
                expect(count).to.be.within(min, max);
            }
        }
    }
}

export default new FilterPage();

