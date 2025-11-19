import { expect } from "chai";
import filterPage from "../pageobjects/filter.page";

function parseVoteCount(text) {
  const cleaned = text.replace(/[()]/g, "").trim();
  if (cleaned.includes("M")) {
    return parseFloat(cleaned.replace("M", "")) * 1_000_000;
  } else if (cleaned.includes("K")) {
    return parseFloat(cleaned.replace("K", "")) * 1_000;
  } else {
    return parseInt(cleaned);
  }
}

describe("Filter Functionality Spec", () => {
  beforeEach(async () => {
    await filterPage.open("https://www.imdb.com/");
  });
  it("should filter movie by User Rating", async () => {
    await filterPage.openTop250Movies();
    await filterPage.openFilterMenu();
    await filterPage.setUserRatingFilter(9, 10);
    await filterPage.closeFilterMenu();
    const movies = await filterPage.moviesList;
    expect(movies.length, "No movies found after filtering").to.be.greaterThan(0);
    for (let i = 0; i < movies.length; i++) {
      const ratingElement = await filterPage.getMovieRating(i);
      const ratingText = await ratingElement.getText();
      const ratingValue = parseFloat(ratingText);
      expect(ratingValue).to.not.be.NaN;
      expect(ratingValue).to.be.at.least(9);
      expect(ratingValue).to.be.at.most(10);
    }
  });
  it("should filter movies by Number of Votes", async () => {
    await filterPage.openTop250Movies();
    await filterPage.openFilterMenu();
    await filterPage.setUserVoteFilter(3000000, 4000000);
    await filterPage.closeFilterMenu();
    const movies = await filterPage.moviesList;
    expect(movies.length, "No movies found after filtering").to.be.greaterThan(0);
    expect(movies.length,"Expected only one movie to match the filter criteria").to.equal(2);
    for (let i = 0; i < movies.length; i++) {
      const votesElement = await filterPage.getNumberOfVotes(i);
      const votesText = await votesElement.getText();
      const voteCount = parseVoteCount(votesText);
      expect(voteCount).to.not.be.NaN;
      expect(voteCount).to.be.at.least(3000000);
      expect(voteCount).to.be.at.most(4000000);
    }
  });
  it("should check the first movie when IMDb rating is sorted in descending order", async () => {
        await filterPage.openTop250Movies();
        await filterPage.sortByImdbRating();
        await filterPage.changeSortedItemsDescendingOrder();
        await browser.pause(500);
        await filterPage.waitForFirstMovieToBe("The Incredibles");
        const movies = await filterPage.moviesList;
        expect(movies.length).to.be.greaterThan(0);
  });
});
