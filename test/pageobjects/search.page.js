import BasePage from "./base.page"

class SearchPage extends BasePage{

    get searchInput(){return $("#suggestion-search")}
    get searchButton(){return $("#suggestion-search-button")}
    get firstResultTitle(){return $("[data-testid='find-results-section-title'] .ipc-metadata-list:nth-child(1) .ipc-title a.ipc-title-link-wrapper .ipc-title__text")}
    get resultsList(){return $$("[data-testid='find-results-section-title'] .ipc-metadata-list li")}
    get emptyResultsMessage(){return $("[data-testid='results-section-empty-results-msg']")}

    async searchFor(query){
        await this.type(this.searchInput, query);
        await this.click(this.searchButton);
        // Wait for search results or empty message to appear
        await browser.waitUntil(
            async () => {
                const results = await this.resultsList;
                const emptyMsg = await this.emptyResultsMessage;
                return results.length > 0 || await emptyMsg.isExisting();
            },
            { timeout: 15000, timeoutMsg: 'Search results did not load' }
        );
    }
}

export default new SearchPage()