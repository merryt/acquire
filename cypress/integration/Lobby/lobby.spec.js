/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("My First Test", () => {
  it("Check to see if new game button is present", () => {
    cy.visit("localhost:3000");
    cy.contains("New Game").click();
    cy.get("game-list").children().should("have.length.at.least", 2);
  });
});
