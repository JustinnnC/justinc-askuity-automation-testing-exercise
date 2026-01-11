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
    const getSize = ['XS','ML'];
    StorePage.selectSizes(getSize);
    cy.reload();
  });

  it("Add products to the cart from fixture file", () => {
    StorePage.fillCartFromFixture();
  });

  it("Open the cart menu", () => { 
    CartPage.openCartPanel();
  });

  it("Verify initial cart state", () => { 
    CartPage.verifyCartItemCount();
  });

  it("Update the quantity of the products", () => { 
    CartPage.updateQuantity();
  });

  it("Verify updated quantity cart state", () => { 
    CartPage.verifyCartItemCount();
  });

  it("Verify the pricing logic and subtotal amount", () => {
    CartPage.verifyCartAmount();
  });

  it("Clear the cart", () => {
    CartPage.clearCart();
  });

  it("Verify the empty state of the cart", () => {
    CartPage.getCartSubtotal().then((amount) => { 
      expect(amount).to.equal(0.00);
    });
    cy.contains("Add some products in the cart").should('be.visible');
  });
});