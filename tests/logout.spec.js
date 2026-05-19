const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const { ContentType } = require('allure-js-commons');

test.describe('Logout SauceDemo', () => {

    test('Deve realizar logout com sucesso', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL(/inventory/);

        await allure.attachment(
            '01 - Login realizado com sucesso',
            await page.screenshot({ fullPage: true }),
            ContentType.PNG
        );

        await page.locator('#react-burger-menu-btn').click();

        await expect(page.locator('[data-test="logout-sidebar-link"]'))
            .toBeVisible();

        await page.waitForTimeout(500);

        await allure.attachment(
            '02 - Menu lateral aberto',
            await page.screenshot({ fullPage: true }),
            ContentType.PNG
        );

        await page.locator('[data-test="logout-sidebar-link"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
        await expect(page.locator('[data-test="username"]')).toBeVisible();
        await expect(page.locator('[data-test="password"]')).toBeVisible();

        await allure.attachment(
            '03 - Logout realizado com sucesso',
            await page.screenshot({ fullPage: true }),
            ContentType.PNG
        );

    });

});