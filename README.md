# QA Challenge - SauceDemo UI

Projeto de automação de testes de interface desenvolvido com Playwright para validação da aplicação SauceDemo / Swag Labs.

O objetivo deste projeto é validar fluxos principais da jornada do usuário, incluindo login, ordenação de produtos, carrinho, checkout e logout, utilizando boas práticas de automação, evidências e geração de relatórios.

---

# Tecnologias utilizadas

- JavaScript
- Node.js
- Playwright
- Allure Report

---

# Estrutura do projeto

```text
saucedemo-playwright-ui-tests/
├── tests/                  # Cenários automatizados
├── evidences/              # Evidências locais
├── playwright-report/      # Relatório HTML Playwright
├── allure-results/         # Resultados Allure
├── allure-report/          # Relatório Allure gerado
├── test-results/           # Vídeos, traces e screenshots
├── playwright.config.js    # Configuração Playwright
├── package.json            # Dependências e scripts
└── README.md
```

---

# Cenários automatizados

## Login

Validação de comportamento dos usuários disponibilizados pelo SauceDemo:

- standard_user
- locked_out_user
- problem_user
- performance_glitch_user
- error_user
- visual_user

Validações implementadas:

- Login com sucesso
- Usuário bloqueado
- Mensagem de erro
- Tempo de resposta do usuário lento
- Evidências em screenshot
- Logs de execução
- Evidências no Allure Report

---

## Ordenação de produtos

Validação dos filtros de ordenação:

- Nome A → Z
- Nome Z → A
- Menor preço → Maior preço
- Maior preço → Menor preço

Validações implementadas:

- Comparação real da lista ordenada
- Captura dinâmica dos produtos
- Comparação de arrays
- Evidências em screenshot
- Evidências no Allure Report

---

## Fluxo de compra

Fluxo automatizado completo:

1. Login
2. Adicionar produto ao carrinho
3. Acessar carrinho
4. Checkout
5. Preenchimento de dados randomizados
6. Finalização da compra
7. Validação da mensagem:
   `Thank you for your order!`

Validações implementadas:

- Produto adicionado corretamente
- Dados dinâmicos
- Navegação entre etapas
- Validação do pedido finalizado
- Evidências em cada etapa
- Evidências no Allure Report

---

## Logout

Fluxo automatizado de logout:

- Abertura do menu lateral
- Logout do sistema
- Retorno para tela de login

Validações implementadas:

- Validação visual do menu
- Validação da tela inicial
- Evidências no Allure Report

---

# Instalação do projeto

## Clonar repositório

```bash
git clone <url-do-repositorio>
```

## Instalar dependências

```bash
npm install
```

## Instalar navegadores Playwright

```bash
npx playwright install
```

---

# Execução dos testes

## Executar todos os testes

```bash
npm test
```

## Executar testes com navegador visível

```bash
npm run test:headed
```

---

# Relatórios

## Executar testes + gerar Allure

```bash
npm run test:allure
```

## Limpar relatórios antigos + executar novamente

```bash
npm run test:allure:clean
```

---

# Recursos implementados

- Screenshots automáticos
- Evidências Allure
- Vídeos de execução
- Trace Playwright
- Logs detalhados
- Massa dinâmica
- Testes parametrizados
- Estrutura escalável

---

# Configuração do Playwright

Configurações implementadas:

- Resolução Full HD
- Captura de vídeo
- Trace em falhas
- Screenshot em falhas
- Relatório HTML
- Integração com Allure

---

# Autor

Bruna Valnei