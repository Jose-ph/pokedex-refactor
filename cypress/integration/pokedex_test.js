/// <reference types="Cypress" />

const baseUrl = "http://192.168.1.38:8080";

context("Pokedex", () => {
  before(() => {
    cy.visit(baseUrl);
  });

  it("checks if main buttons exist", () => {
    expect(cy.get(".btn")).to.exist;
  });

  it("checks title inner text", () => {
    cy.get("h1").should("have.text", "Pokedex!!");
  });

  it("checks if previous button shows console error message", () => {
    cy.visit(baseUrl, {
      onBeforeLoad(win) {
        cy.stub(win.console, "error").as("consoleError");
      },
    });

    cy.get("#previous-btn").click();
    cy.get("@consoleError").should(
      "be.calledWith",
      "no se puede realizar la petición ERROR"
    );
  });

  it("checks if get button gets the pokemons", () => {
    cy.get("#get-btn").click();

    cy.get(".card").should("have.length", 10);
  });

  it("checks if get button is disabled after click", () => {
    cy.get("#get-btn").should("have.class", "disabled");
  });

  it("checks if next button changes pokemons", () => {
    let originalCards = [];
    cy.get(".card").then((cards) => {
      cards.each((i, card) => {
        originalCards.push(card);
      });
    });

    cy.get("#next-btn").click();

    //need to change cy.wait() for another cypress command
    //problem is cypress gets the elements before them are completely fetched

    cy.wait(1000);

    let newPokemons = [];

    cy.get(".card").then((cards) => {
      cards.each((i, card) => {
        newPokemons.push(card);
      });
    });

    cy.wrap(originalCards).should("not.deep.equal", newPokemons);
  });

  it("checks if details button shows the details", () => {
    cy.get(".detail").then((details) => {
      details[0].click();

      //check modal is visible
      //check modal info
      //check modal close button
    });
  });
});
