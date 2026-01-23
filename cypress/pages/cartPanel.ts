import TestData from './testData'; 
import { calculateCartAmount } from "../support/storeUtils";

class CartPanel { 
    openCartPanel() {
        return cy.get('button:has([title="Products in cart quantity"])').click();
    }

    closeCartPanel() { 
        return cy.contains('button','X').click();
    }

   getCartSubtotal() { 
        return cy.contains('SUBTOTAL').closest('div').find('p').eq(1).invoke('text').then((text) => {
            return parseFloat(text.match(/[\d.]+/)?.[0] || '0');
        });
    }

    verifyCartAmount() { 
        return calculateCartAmount().then((expectedTotal) => {
            return this.getCartSubtotal().then((actualTotal) => { 
                const expected = parseFloat(expectedTotal);
                return { expected, actualTotal };
            });
        });
    }

    verifyCartItemCount() {
        // Based on the HTML of the website, its better to use the div title when the cart panel is closed
        // There's no sable selector of the cart quantity when the cart panel is open
        this.closeCartPanel();
        return cy.get('div[title="Products in cart quantity"]').invoke('text').then(text => {
            const cartQuantity = Number(text);

            // Reopen the cart panel so we can check the quantities of items from the cart
            this.openCartPanel();
            let totalQuantity = 0;
            return cy.get('p:contains("Quantity:")').each(($el) => {
                const text = $el.text();
                const quantityMatch = text.match(/Quantity:\s*(\d+)/);
                if (quantityMatch) {
                    totalQuantity += parseInt(quantityMatch[1]);
                }
            }).then(() => {
                return { cartQuantity, totalQuantity };
            });
        });
    }

    updateQuantity(productItem: string) { 
        TestData.getProductByName(productItem).then((product) => { 
            const productQuantity = product.quantity;
            if (productQuantity > 0) { 
                const timesToClick = productQuantity - 1; 
                for (let i = 0; i < timesToClick; i++) {
                    this.getCartItem(product.item)
                    .find('button:not([disabled])')
                    .last()
                    .click();
                }
            }
        });
    }

    // Helper Functions // 
    private getCartItem(productName: string) {
        return cy.get(`img[alt="${productName}"]`).parent();
    }

    removeItemFromCart(productName: string) {
        this.getCartItem(productName)
            .find('button[title="remove product from cart"]')
            .click();
    }
}
export default new CartPanel();