import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // close cookies popup if it exists
    const cookieButton = page.locator('._UCHI_COOKIE__button');
    const appeared = await cookieButton
      .waitFor({state: 'visible', timeout: 10000})
      .then(() => true, () => false);

    if (appeared) {
      await cookieButton.click();
    }
  });

  test('should open widget on click', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('should show support form title after clicking "Write to us"', async () => {
    await widgetPage.openWidget();

    const articles = await widgetPage.getPopularArticles();
    expect(articles.length).toBeGreaterThan(0);
    await articles[0].click();

    await widgetPage.clickWriteToUs();

    await expect(widgetPage.getTitle()).toHaveText('Связь с поддержкой');
  });

  test('can be closed after opening', async () => {
    await widgetPage.openWidget();
    await expect(widgetPage.getWidgetBody()).toBeVisible();

    await widgetPage.closeWidget();

    await expect(widgetPage.getWidgetBody()).toBeHidden();
  });
});
