import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import filterPage from '../../pageobjects/filter.page';

//Background

Given('I open the IMDb homepage', async () => {
    await filterPage.open('https://www.imdb.com/');
});

When('I open the main menu', async () => {
    await filterPage.click(filterPage.allMenuButton);
});

When('I go to the Top 250 movies page', async () => {
    await filterPage.click(filterPage.top250MoviesLink);
});

//Filter by Rating

When('I open the filter menu', async () => {
    await filterPage.openFilterMenu();
});

When('I set the minimum rating to {int}', async (min) => {
    await filterPage.type(filterPage.minRatingInput, min);
});

When('I set the maximum rating to {int}', async (max) => {
    await filterPage.type(filterPage.maxRatingInput, max);
});

When('I close the filter menu', async () => {
    await filterPage.closeFilterMenu();
});

Then('I should see at least one movie', async () => {
    const movies = await filterPage.moviesList;
    expect(movies.length).to.be.greaterThan(0);
});

Then('each movie rating should be between {float} and {float}', async (min, max) => {
    await filterPage.validateRatingRange(min, max);
});

 //Filter by Votes 

When('I set the minimum votes to {int}', async (min) => {
    await filterPage.type(filterPage.minVoteInput, min);
});

When('I set the maximum votes to {int}', async (max) => {
    await filterPage.type(filterPage.maxVoteInput, max);
});

Then('each movie vote count should be between {int} and {int}', async (min, max) => {
    await filterPage.validateVotesAreWithinRange(min, max);
});

Then('exactly {int} movies should be shown', async (count) => {
    const movies = await filterPage.moviesList;
    expect(movies.length).to.equal(count);
});

//Sorting

When('I open the sort menu', async () => {
    await filterPage.click(filterPage.sortDropdown);
});

When('I choose sort by IMDb rating', async () => {
    await filterPage.click(filterPage.sortOptionUserRating);
});

When('I sort in descending order', async () => {
    await filterPage.changeSortedItemsDescendingOrder();
});

Then('the first movie should be {string}', async (title) => {
    await filterPage.waitForFirstMovieToBe(title);
});
