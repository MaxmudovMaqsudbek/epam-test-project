import { expect } from 'chai';
import languagePage from '../../pageobjects/language.page';
describe('Language Functionality Spec', () => {
    beforeEach(async () => {
        await languagePage.open('https://www.imdb.com/');
    });

    it('should open language selector and display available languages', async () => {
        await languagePage.openMenu();
        expect(await languagePage.list.isDisplayed()).to.equal(true);
        expect((await languagePage.listItems).length).to.be.greaterThan(0);
    });

    it('should contain Spanish in the list', async () => {
        await languagePage.openMenu();
        const text = await languagePage.getSpanishText();
        expect(text).to.include('Español');
    });

    it('should change site language to German', async () => {
        await languagePage.openMenu();
        await languagePage.selectGerman();
        const url = await browser.getUrl();
        expect(url).to.include('/de');
    });
});
