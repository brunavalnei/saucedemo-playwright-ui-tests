const { test, expect } = require('@playwright/test');
const allure = require('allure-js-commons');

test.describe('Validação de ordenação dos produtos', () => {

    test.beforeEach(async ({ page }) => {

        console.log('Realizando login');

        await page.goto('https://www.saucedemo.com/');

        await page.locator('[data-test="username"]').fill('standard_user');

        await page.locator('[data-test="password"]')
            .fill('secret_sauce');

        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL(/inventory/);

        console.log('Login realizado com sucesso');

        await allure.attachment(
            'Login realizado com sucesso',
            await page.screenshot({
                fullPage: true
            }),
            'image/png'
        );

    });

    test('Validar ordenação Nome A-Z', async ({ page }) => {

        console.log('Selecionando ordenação A-Z');

        await page.locator('[data-test="product-sort-container"]')
            .selectOption('az');

        const produtos = await page
            .locator('.inventory_item_name')
            .allTextContents();

        const ordenado = [...produtos].sort();

        console.log('Produtos exibidos:', produtos);
        console.log('Produtos esperados:', ordenado);

        expect(produtos).toEqual(ordenado);

        await page.screenshot({
            path: 'evidences/screenshots/ordenacao-az.png',
            fullPage: true
        });

        await allure.attachment(
            'Ordenação A-Z',
            await page.screenshot({
                fullPage: true
            }),
            'image/png'
        );

        console.log('Ordenação A-Z validada com sucesso');

    });

    test('Validar ordenação Nome Z-A', async ({ page }) => {

        console.log('Selecionando ordenação Z-A');

        await page.locator('[data-test="product-sort-container"]')
            .selectOption('za');

        const produtos = await page
            .locator('.inventory_item_name')
            .allTextContents();

        const ordenado = [...produtos].sort().reverse();

        console.log('Produtos exibidos:', produtos);
        console.log('Produtos esperados:', ordenado);

        expect(produtos).toEqual(ordenado);

        await page.screenshot({
            path: 'evidences/screenshots/ordenacao-za.png',
            fullPage: true
        });

        await allure.attachment(
            'Ordenação Z-A',
            await page.screenshot({
                fullPage: true
            }),
            'image/png'
        );

        console.log('Ordenação Z-A validada com sucesso');

    });

    test('Validar ordenação menor preço para maior', async ({ page }) => {

        console.log('Selecionando ordenação menor preço para maior');

        await page.locator('[data-test="product-sort-container"]')
            .selectOption('lohi');

        const precosTexto = await page
            .locator('.inventory_item_price')
            .allTextContents();

        const precos = precosTexto.map(preco =>
            Number(preco.replace('$', ''))
        );

        const ordenado = [...precos].sort((a, b) => a - b);

        console.log('Preços exibidos:', precos);
        console.log('Preços esperados:', ordenado);

        expect(precos).toEqual(ordenado);

        await page.screenshot({
            path: 'evidences/screenshots/ordenacao-menor-maior.png',
            fullPage: true
        });

        await allure.attachment(
            'Ordenação menor preço para maior',
            await page.screenshot({
                fullPage: true
            }),
            'image/png'
        );

        console.log('Ordenação menor para maior validada com sucesso');

    });

    test('Validar ordenação maior preço para menor', async ({ page }) => {

        console.log('Selecionando ordenação maior preço para menor');

        await page.locator('[data-test="product-sort-container"]')
            .selectOption('hilo');

        const precosTexto = await page
            .locator('.inventory_item_price')
            .allTextContents();

        const precos = precosTexto.map(preco =>
            Number(preco.replace('$', ''))
        );

        const ordenado = [...precos].sort((a, b) => b - a);

        console.log('Preços exibidos:', precos);
        console.log('Preços esperados:', ordenado);

        expect(precos).toEqual(ordenado);

        await page.screenshot({
            path: 'evidences/screenshots/ordenacao-maior-menor.png',
            fullPage: true
        });

        await allure.attachment(
            'Ordenação maior preço para menor',
            await page.screenshot({
                fullPage: true
            }),
            'image/png'
        );

        console.log('Ordenação maior para menor validada com sucesso');

    });

});