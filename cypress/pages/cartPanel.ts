import TestData from './testData'; 
import { calculateCartAmount } from "../support/storeUtils";

class CartPanel { 
    /**
     * Function opens the cart panel
     * @returns Clicking the cart panel selector
     */
    openCartPanel() {
        return cy.get('button:has([title="Products in cart quantity"])').click();
    }

    /**
     * Function closes the cart panel
     * @returns Clicking the close cart panel selector
     */
    closeCartPanel() { 
        return cy.contains('button','X').click();
    }

    /**
     * Function gets the cart subtotal
     * @returns Cart Subtotal from parsing the value
     */
   getCartSubtotal() { 
        return cy.contains('SUBTOTAL').closest('div').find('p').eq(1).invoke('text').then((text) => {
            return parseFloat(text.match(/[\d.]+/)?.[0] || '0');
        });
    }

    /**
     * Function validates the cart amount
     * @returns expectedTotal and actualTotal
     */
    verifyCartAmount() { 
        return calculateCartAmount().then((expected) => {
            return this.getCartSubtotal().then((actualTotal) => { 
                const expectedTotal = parseFloat(expected);
                return { expectedTotal, actualTotal };
            });
        });
    }

    /**
     * Function validates the cart item count to the actual number of items in the cart
     * @returns cartQuantity and totalQuantity
     */
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
    
    /**
     * Function takes in an item name and removes it from the cart
     * @param productName 
     */
    removeItemFromCart(productName: string) {
        this.getCartItem(productName)
            .find('button[title="remove product from cart"]')
            .click();
    }

    /**
     * Function takes in an item name and returns the quantity value
     * @param productItem 
     * @returns Quantity value
     */
    getQuantity(productItem: string) { 
        return cy.get(`img[alt="${productItem}"]`).parent().find('p').then(($paragraphs) => {
            const $quantity = $paragraphs.filter(':contains("Quantity:")');
            const text = $quantity.text();
            const quantityMatch = text.match(/Quantity:\s*(\d+)/);
            const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 0;
            return quantity;
        });
    }

    /**
     * Function gets item name, ensure it exists in the fixture file, and then update to listed quantity on the fixture file 
     * @param productItem 
     */
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
    /**
     * Function takes in an item and then returns the selector of that item in the cart
     * @param productName 
     * @returns Selector of the item in the cart
     */
    private getCartItem(productName: string) {
        return cy.get(`img[alt="${productName}"]`).parent();
    }
}
export default new CartPanel();