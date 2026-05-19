const { test, expect } = require('@playwright/test');

test.describe('Fluxo de compra SauceDemo', () => {

    test('Deve realizar compra com sucesso', async ({ page }, testInfo) => {

        // =========================
        // DADOS RANDOMICOS
        // =========================

        const random = Math.floor(Math.random() * 100000);

        const firstName = `Bruna${random}`;
        const lastName = `QA${random}`;
        const zipCode = `${Math.floor(10000 + Math.random() * 90000)}`;

        console.log('Dados gerados:');
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('ZIP Code:', zipCode);

        // =========================
        // LOGIN
        // =========================

        console.log('Acessando SauceDemo');

        await page.goto('https://www.saucedemo.com/');

        await page.locator('[data-test="username"]')
            .fill('standard_user');

        await page.locator('[data-test="password"]')
            .fill('secret_sauce');

        await page.locator('[data-test="login-button"]')
            .click();

        await expect(page).toHaveURL(/inventory/);

        console.log('Login realizado com sucesso');

        await testInfo.attach('Login realizado com sucesso', {
            body: await page.screenshot({
                fullPage: true
            }),
            contentType: 'image/png'
        });

        // =========================
        // ADICIONAR PRODUTO
        // =========================

        console.log('Adicionando produto ao carrinho');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await expect(page.locator('[data-test="shopping-cart-badge"]'))
            .toHaveText('1');

        await testInfo.attach('Produto adicionado ao carrinho', {
            body: await page.screenshot({
                fullPage: true
            }),
            contentType: 'image/png'
        });

        // =========================
        // ABRIR CARRINHO
        // =========================

        console.log('Acessando carrinho');

        await page.locator('[data-test="shopping-cart-link"]')
            .click();

        await expect(page).toHaveURL(/cart/);

        await expect(page.locator('.inventory_item_name'))
            .toHaveText('Sauce Labs Backpack');

        await testInfo.attach('Carrinho com produto', {
            body: await page.screenshot({
                fullPage: true
            }),
            contentType: 'image/png'
        });

        // =========================
        // CHECKOUT
        // =========================

        console.log('Iniciando checkout');

        await page.locator('[data-test="checkout"]')
            .click();

        await expect(page).toHaveURL(/checkout-step-one/);

        await testInfo.attach('Tela checkout step one', {
            body: await page.screenshot({
                fullPage: true
            }),
            contentType: 'image/png'
        });

        // =========================
        // PREENCHER DADOS
        // =========================

        console.log('Preenchendo dados do checkout');

        await page.locator('[data-test="firstName"]')
            .fill(firstName);

        await page.locator('[data-test="lastName"]')
            .fill(lastName);

        await page.locator('[data-test="postalCode"]')
            .fill(zipCode);

        await testInfo.attach('Dados preenchidos', {
            body: await page.screenshot({
                fullPage: true
            }),
            contentType: 'image/png'
        });

        // =========================
        // CONTINUE
        // =========================

        console.log('Continuando checkout');

        await page.locator('[data-test="continue"]')
            .click();

        await expect(page).toHaveURL(/checkout-step-two/);

        await expect(page.locator('.inventory_item_name'))
            .toHaveText('Sauce Labs Backpack');

        await testInfo.attach('Resumo da compra', {
            body: await page.screenshot({
                fullPage: true
            }),
            contentType: 'image/png'
        });

        // =========================
        // FINALIZAR COMPRA
        // =========================

        console.log('Finalizando compra');

        await page.locator('[data-test="finish"]')
            .click();

        await expect(page).toHaveURL(/checkout-complete/);

        // =========================
        // VALIDAR MENSAGEM FINAL
        // =========================

        const mensagemFinal = page.locator('[data-test="complete-header"]');

        await expect(mensagemFinal)
            .toHaveText('Thank you for your order!');

        console.log('Mensagem final validada com sucesso');

        await testInfo.attach('Compra finalizada com sucesso', {
            body: await page.screenshot({
                fullPage: true
            }),
            contentType: 'image/png'
        });

    });

});