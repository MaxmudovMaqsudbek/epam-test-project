class BasePage{
    open(path){
        return browser.url(path);
    }

    async click(element){
        await element.waitForDisplayed();
        await element.waitForClickable();
        await element.click();
    }

    async type(element, value){
        await element.waitForDisplayed();
        await element.setValue(value);
    }

    async wait(element){
        await element.waitForDisplayed();
    }

}

export default BasePage;