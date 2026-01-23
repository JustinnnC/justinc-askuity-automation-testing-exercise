import StorePage from "../pages/storePage";
import CartPage from "../pages/cartPanel";
import TestData from "../pages/testData";

// End-to-End flow of filtering products, manging cart quantities and verifying pricing logic
describe("Shopping Cart Validation", () => { 
  before(() => {
    // Load fixture file of the shopping cart before starting the test
    TestData.setFixtureFile('testExample.json');
    StorePage.open();
  });
  
  it("Open WebPage and validate title", () => {
    cy.title().should("equal", "Typescript React Shopping cart");
  });

  it("Select sizes XS and ML and validate filter results are correct", () => { 
    cy.contains('Sizes:');
    StorePage.selectSizes('XS');
    StorePage.verifyProductCountMatches().then((counts) => {
      expect(counts.actualCount).to.equal(counts.displayedCount);
    });
    StorePage.selectSizes('ML');
    StorePage.verifyProductCountMatches().then((counts) => {
      expect(counts.actualCount).to.equal(counts.displayedCount);
    });
    cy.reload();
  });

  it("Add Items to the cart", () => { 
    cy.contains('Blue T-Shirt').should('exist');
    StorePage.addToCart('Blue T-Shirt');
    cy.contains('Black T-shirt with white stripes').should('exist');
    StorePage.addToCart('Black T-shirt with white stripes');
  });

  it("Open the cart menu", () => { 
    CartPage.openCartPanel();
    cy.contains('Cart').should('be.visible');
    CartPage.getCartSubtotal().then((amount) => {
      expect(amount).to.be.greaterThan(0);
    });
  });

  it("Verify initial cart state", () => { 
    CartPage.verifyCartItemCount().then((quantities) => {
      expect(quantities.cartQuantity).to.equal(quantities.totalQuantity);
    });
  });

  it("Update the quantity of the products", () => { 
    CartPage.updateQuantity('Blue T-Shirt');
    CartPage.getQuantity('Blue T-Shirt').then((quantity => {
      expect(quantity).to.equal(3);
    }));
  });

  it("Verify updated quantity cart state", () => { 
    CartPage.verifyCartItemCount().then((quantities) => {
      expect(quantities.cartQuantity).to.equal(quantities.totalQuantity);
    });
  });

  it("Verify the pricing logic and subtotal amount", () => {
    CartPage.verifyCartAmount().then((amounts) => {
      expect(amounts.expectedTotal).to.equal(amounts.actualTotal);
    });
  });

  it("Clear the cart", () => {
    CartPage.removeItemFromCart('Blue T-Shirt');
    CartPage.removeItemFromCart('Black T-shirt with white stripes');
  });

  it("Verify the empty state of the cart", () => {
    CartPage.getCartSubtotal().then((amount) => { 
      expect(amount).to.equal(0.00);
    });
    cy.contains("Add some products in the cart").should('be.visible');
  });
});