    import { expect } from 'chai';
    import filterPage from '../../pageobjects/filter.page';
    import filterData from '../../data/filter.data';

    describe('Filter Functionality Spec', () => {
        beforeEach(async () => {
            await filterPage.open('https://www.imdb.com/');
        });
        it('should filter movie by User Rating', async () => {
            await filterPage.openTop250Movies();
            await filterPage.openFilterMenu();
            await filterPage.setUserRatingFilter(
                filterData.ratingRange.min,
                filterData.ratingRange.max
            );
            await filterPage.closeFilterMenu();
            const movies = await filterPage.moviesList;
            expect(movies.length).to.be.greaterThan(0);
            await filterPage.validateRatingRange(
                filterData.ratingRange.min,
                filterData.ratingRange.max
            );
        });
        it('should filter movies by Number of Votes', async () => {
            await filterPage.openTop250Movies();
            await filterPage.openFilterMenu();
            await filterPage.setUserVoteFilter(
                filterData.voteRange.min,
                filterData.voteRange.max
            );
            await filterPage.closeFilterMenu();
            const movies = await filterPage.moviesList;
            expect(movies.length).to.be.greaterThan(0);
            await filterPage.validateVotesAreWithinRange(
                filterData.voteRange.min,
                filterData.voteRange.max
            );
        });
        it('should check the first movie when IMDb rating is sorted in descending order', async () => {
            await filterPage.openTop250Movies();
            await filterPage.sortByImdbRating();
            await filterPage.changeSortedItemsDescendingOrder();
            await browser.pause(500);
            await filterPage.waitForFirstMovieToBe(filterData.expectedFirstMovie);
            const movies = await filterPage.moviesList;
            expect(movies.length).to.be.greaterThan(0);
        });
    });
