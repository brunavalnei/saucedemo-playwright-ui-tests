const { test, expect } = require('@playwright/test');
const allure = require('allure-js-commons');

const senha = 'secret_sauce';

const usuarios = [
  {
    username: 'standard_user',
    tipo: 'sucesso'
  },
  {
    username: 'locked_out_user',
    tipo: 'bloqueado',
    mensagem: 'Epic sadface: Sorry, this user has been locked out.'
  },
  {
    username: 'problem_user',
    tipo: 'sucesso'
  },
  {
    username: 'performance_glitch_user',
    tipo: 'lento'
  },
  {
    username: 'error_user',
    tipo: 'sucesso'
  },
  {
    username: 'visual_user',
    tipo: 'sucesso'
  }
];

test.describe('Validação de login SauceDemo', () => {

  for (const usuario of usuarios) {

    test(`Validar comportamento do usuário ${usuario.username}`, async ({ page }) => {

      console.log(`Iniciando teste do usuário: ${usuario.username}`);

      await page.goto('https://www.saucedemo.com/');

      await page.locator('[data-test="username"]')
        .fill(usuario.username);

      await page.locator('[data-test="password"]')
        .fill(senha);

      const inicioLogin = Date.now();

      await page.locator('[data-test="login-button"]').click();

      // =========================
      // LOGIN COM SUCESSO
      // =========================
      if (usuario.tipo === 'sucesso') {

        await expect(page).toHaveURL(/inventory/);

        await expect(page.locator('[data-test="title"]'))
          .toHaveText('Products');

        const tempoLogin = Date.now() - inicioLogin;

        console.log(`Login realizado com sucesso em ${tempoLogin}ms`);

        await page.screenshot({
          path: `evidences/screenshots/${usuario.username}-sucesso.png`,
          fullPage: true
        });

        await allure.attachment(
          `Login sucesso - ${usuario.username}`,
          await page.screenshot({
            fullPage: true
          }),
          'image/png'
        );

      }

      // =========================
      // USUÁRIO BLOQUEADO
      // =========================
      if (usuario.tipo === 'bloqueado') {

        const mensagemErro = page.locator('[data-test="error"]');

        await expect(mensagemErro).toBeVisible();

        await expect(mensagemErro)
          .toHaveText(usuario.mensagem);

        console.log('Mensagem de bloqueio validada com sucesso');

        await page.screenshot({
          path: `evidences/screenshots/${usuario.username}-bloqueado.png`,
          fullPage: true
        });

        await allure.attachment(
          `Usuário bloqueado - ${usuario.username}`,
          await page.screenshot({
            fullPage: true
          }),
          'image/png'
        );

      }

      // =========================
      // USUÁRIO LENTO
      // =========================
      if (usuario.tipo === 'lento') {

        await expect(page).toHaveURL(/inventory/, {
          timeout: 10000
        });

        const tempoLogin = Date.now() - inicioLogin;

        console.log(`Tempo de login do usuário lento: ${tempoLogin}ms`);

        expect(tempoLogin).toBeGreaterThan(2000);

        await expect(page.locator('[data-test="title"]'))
          .toHaveText('Products');

        await page.screenshot({
          path: `evidences/screenshots/${usuario.username}-lento.png`,
          fullPage: true
        });

        await allure.attachment(
          `Usuário lento - ${usuario.username}`,
          await page.screenshot({
            fullPage: true
          }),
          'image/png'
        );

      }

    });

  }

});