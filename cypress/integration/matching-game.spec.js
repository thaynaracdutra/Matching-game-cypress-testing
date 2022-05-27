const elementArray = [
  '[data-testid="cypress1"]',
  '[data-testid="cypress2"]',
  '[data-testid="html1"]',
  '[data-testid="html2"]',
  '[data-testid="node1"]',
  '[data-testid="node2"]',
  '[data-testid="javascr1"]',
  '[data-testid="javascr2"]',
  '[data-testid="postman1"]',
  '[data-testid="postman2"]',
  '[data-testid="css1"]',
  '[data-testid="css2"]',
];

describe("Matching Game Test", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/src/index.html");
  });

  it("must have 12 cards displayed", () => {
    cy.get(".card").should("have.length", 12).and("be.visible");
  });

  it("all cards should be back face", () => {
    cy.get(".card-back")
      .should("have.length", 12)
      .and("be.visible")
      .and("have.attr", "src", "./img/inter.png");
  });

  it("cards must be flipped on click", () => {
    cy.get('[data-testid="cypress2"]')
      .click()
      .should("have.class", "card flip");
    cy.get('[data-testid="cypress2"] > .card-front')
      .should("have.attr", "src", "./img/cypress.png")
      .and("be.visible");

    cy.get('[data-testid="cypress1"]')
      .click()
      .should("have.class", "card flip");
    cy.get('[data-testid="cypress1"] > .card-front')
      .should("have.attr", "src", "./img/cypress.png")
      .and("be.visible");
  });

  it("cards must be disable on match", () => {
    cy.get('[data-testid="postman1"]').click();
    cy.get('[data-testid="postman2"]').click();

    cy.get('[data-testid="postman1"] > .card-front')
      .should("have.attr", "src", "./img/postman.png")
      .and("be.visible");
    cy.get('[data-testid="postman2"] > .card-front')
      .should("have.attr", "src", "./img/postman.png")
      .and("be.visible");

    cy.get('[data-testid="postman1"]')
      .click()
      .should("have.class", "card flip");
    cy.get('[data-testid="postman2"]')
      .click()
      .should("have.class", "card flip");
  });

  it("cards must get back to back face on mismatch", () => {
    cy.get('[data-testid="html1"]').click();
    cy.get('[data-testid="node2"]').click();

    cy.get('[data-testid="html1"] > .card-front')
      .should("have.attr", "src", "./img/html.png")
      .and("be.visible");
    cy.get('[data-testid="node2"] > .card-front')
      .should("have.attr", "src", "./img/node.png")
      .and("be.visible");

    cy.get('[data-testid="html1"] > .card-back')
      .should("be.visible")
      .and("have.attr", "src", "./img/inter.png");
    cy.get('[data-testid="node1"] > .card-back')
      .should("be.visible")
      .and("have.attr", "src", "./img/inter.png");
  });

  it("flip all cards and reset game", () => {
      elementArray.forEach((element)  => {
          cy.get(element).click(); 
        })

    cy.get(".card-front")
      .should("have.length", 12)
      .and("be.visible")

      cy.reload()

      cy.get(".card-back")
      .should("have.length", 12)
      .and("be.visible")
      .and("have.attr", "src", "./img/inter.png")
  });
});
