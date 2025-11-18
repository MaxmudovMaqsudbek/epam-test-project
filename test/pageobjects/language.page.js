import BasePage from "./base.page.js";

class LanguagePage extends BasePage {
    get languageButton() { return $("label[for='nav-language-selector']"); }
    get menu() { return $("#nav-language-selector-contents"); }
    get list() { return $("#nav-language-selector-contents .ipc-list"); }
    get listItems() { return $$("#nav-language-selector-contents .ipc-list li"); }

    get spanishOption() { return $("=Español (España)"); }
    get germanOption() { return $("=Deutsch (Deutschland)"); }

    async openMenu() {
        await this.click(this.languageButton);
        await this.wait(this.menu);
    }

    async getSpanishText() {
        await this.wait(this.spanishOption);
        return this.spanishOption.getText();
    }

    async selectGerman() {
        await this.click(this.germanOption);
    }
}

export default new LanguagePage();
