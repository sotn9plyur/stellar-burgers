import { selectors } from '../support/selectors';

describe('Constructor Burger', () => {
  beforeEach(() => {
    // Моки запросов к API
    cy.intercept('GET', '/api/auth/user', { fixture: 'login.json' }).as('getUser');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    // Токены
    window.localStorage.setItem('refreshToken', 'refreshTokenMock');
    cy.setCookie('accessToken', 'mockedAccessToken');

    // Открываем страницу
    cy.visit('/');

    // Ждем завершения запросов
    cy.wait('@getUser');
    cy.wait('@getIngredients');

    // Загружаем фикстуру ингредиентов
    cy.fixture('ingredients.json').then((data) => {
      // Ищем элементы по типу через содержимое (название, картинка и т.д.)
      const ingredients = data.data;

      // Булка
      const bun = ingredients.find((i: any) => i.type === 'bun');
      cy.contains(bun.name)
        .parents(selectors.ingredient)
        .as('bun');
      cy.get('@bun')
        .find('button', { timeout: 10000 })
        .should('exist')
        .as('bunAddBtn');

      // Начинка
      const filling = ingredients.find((i: any) => i.type === 'main');
      cy.contains(filling.name)
        .parents(selectors.ingredient)
        .as('filling');
      cy.get('@filling')
        .find('button', { timeout: 10000 })
        .should('exist')
        .as('fillingAddBtn');

      // Соус
      const sauce = ingredients.find((i: any) => i.type === 'sauce');
      cy.contains(sauce.name)
        .parents(selectors.ingredient)
        .as('sauce');
      cy.get('@sauce')
        .find('button', { timeout: 10000 })
        .should('exist')
        .as('sauceAddBtn');
    });
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('добавление ингредиента в конструктор', () => {
    cy.contains(selectors.selectBun).should('be.visible');
    cy.contains(selectors.selectMain).should('be.visible');

    cy.get('@bunAddBtn').click({ force: true });
    cy.contains(selectors.selectBun).should('not.exist');
    cy.get(selectors.constructorElement).should('have.length', 2);

    cy.get('@fillingAddBtn').click({ force: true });
    cy.contains(selectors.selectMain).should('not.exist');
    cy.get(selectors.constructorElement).should('have.length', 3);

    cy.get('@sauceAddBtn').click({ force: true });
    cy.get(selectors.constructorElement).should('have.length', 4);
  });

  it('закрытие модалки по крестику', () => {
    cy.get('@bun').find('a').click({ force: true });
    cy.get(selectors.modal, { timeout: 10000 }).should('exist');
    cy.get(selectors.modalClose).click({ force: true });
    cy.get(selectors.modal, { timeout: 10000 }).should('not.exist');
  });

  it('закрытие модалки по оверлею', () => {
    cy.get('@bun').find('a').click({ force: true });
    cy.get(selectors.modalOverlay).should('exist');
    cy.get(selectors.modalOverlay).click({ force: true });
    cy.get(selectors.modal).should('not.exist');
  });

  it('создание заказа', () => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.get('@bunAddBtn').click({ force: true });
    cy.get('@fillingAddBtn').click({ force: true });
    cy.get('@sauceAddBtn').click({ force: true });
    cy.get(selectors.constructorElement).should('have.length', 4);

    cy.contains('Оформить заказ').click({ force: true });
    cy.wait('@createOrder');

    cy.get(selectors.modal, { timeout: 10000 }).should('exist');
    cy.fixture('order.json').then((json) => {
      cy.get(selectors.orderNumber)
        .should('exist')
        .and('have.text', json.order.number.toString());
    });

    cy.get(selectors.modalClose).click({ force: true });
    cy.get(selectors.modal, { timeout: 10000 }).should('not.exist');
    cy.contains(selectors.selectBun).should('be.visible');
    cy.contains(selectors.selectMain).should('be.visible');
    cy.get(selectors.constructorElement).should('have.length', 0);
  });
});
