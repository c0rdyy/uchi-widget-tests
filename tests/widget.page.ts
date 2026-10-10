import {Locator, Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_CLOSE = 'button[class^=closeBtn__]',
    BUTTON_WRITE_TO_US = '[data-test=button_feedback_form]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    async openWidget() {
        return this.page.locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    async closeWidget() {
        await this.page.locator(WidgetPage.selector.BUTTON_CLOSE).click();
    }

    async getPopularArticles() {
        await this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST).waitFor({ state: 'visible' });
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM).all();
    }

    async clickWriteToUs() {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    getTitle(): Locator {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT);
    }

    getWidgetBody() {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }
}

