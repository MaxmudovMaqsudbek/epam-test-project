import BasePage from "./base.page";

class FilterPage extends BasePage {

    get allMenuButton() { return $("div.sc-8798a0ad-0"); }
    //get allMenuButton() { return $("button[aria-label='Menu']"); }
    get top250MoviesLink() { return $("//span[contains(text(),'Top 250 movies')]"); }
    get filterButton() { return $("[data-testid='filter-menu-button']"); }
    get closeButton() { return $(".ipc-promptable-base__close"); }
    get minRatingInput() { return $("[name='filter-user-rating-start-input']"); }
    get maxRatingInput() { return $("[name='filter-user-rating-end-input']") }
    get minVoteInput() { return $("[name='filter-user-rating-count-start-input']"); }
    get maxVoteInput() { return $("[name='filter-user-rating-count-end-input']"); }
    get moviesList() { return $$(".ipc-metadata-list li"); }
    get movieRatingSelector() { return ".ipc-metadata-list-summary-item__c .ipc-rating-star .ipc-rating-star--rating";}
    get numberOfVotesSelector() {return ".ipc-metadata-list-summary-item__c .ipc-rating-star .ipc-rating-star--voteCount";}
    get sortDropdown() { return $("#sort-by-selector"); }
    get sortOptionUserRating() { return $("#sort-by-selector option[value='USER_RATING']"); }
    get descendingButton() { return $("#swap-sort-order-button"); }

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

        const dropdown = await this.sortDropdown;

        await dropdown.waitForDisplayed();
        await dropdown.waitForClickable();
        await dropdown.scrollIntoView();

        await dropdown.click();

        const option = await this.sortOptionUserRating;
        await this.click(option);
        return true;
    }

    async changeSortedItemsDescendingOrder() {
        await this.click(this.descendingButton);
    }
}

export default new FilterPage();

