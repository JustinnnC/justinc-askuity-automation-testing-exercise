import { BASE_URL, TIMEOUTS } from '../constants/config'; 
import CartPanel from './cartPanel';
import TestData from './testData'; 

class StorePage { 
    open() {
        cy.visit(BASE_URL);
    }

    /**
     * Takes size input and clicks on the size button
     * @param sizes 
     */
    selectSizes(sizes: string) { 
        try { 
            cy.get(this.getSizeCheckbox(sizes), { timeout: 5000 }).should('exist').check({ force: true });
            cy.wait(TIMEOUTS.SHORT);
        } catch (error) { 
            cy.log('Unable to click on Size Filter');
            throw error;
        }
    }

    /**
     * Verify product count matches the display count by finding the 'Add to cart' button on the screen 
     * This function is called when the size filters are selected
     * @returns actualCount, displayedCount
     */
    verifyProductCountMatches() {
        return this.getProductCount().then(displayedCount => {
            return cy.get('button:contains("Add to cart")').then(($buttons) => {
                const actualCount = $buttons.length;
                return {
                    actualCount,
                    displayedCount
                };
            });
        });
    }

    /**
     * Add product item to the cart
     * @param productName 
     */
    addToCart(productName: string) {
        TestData.getProductByName(productName).then((product) => {
            if (product.quantity > 0) {
                cy.get(`[alt="${product.item}"]`)
                    .parent()
                    .find('button:contains("Add to cart")')
                    .click();
                CartPanel.closeCartPanel();
            }
        });
    }

    // Helper Functions //
    /**
     * Get input of the size and use input to find selector
     * @param size 
     * @returns Size selctor
     */
    private getSizeCheckbox(size: string) { 
        return `input[data-testid="checkbox"][value="${size}"]`; 
    }

    /**
     * Created a function to find 'Products found' to avoid duplicated code
     * @returns Products found text
     */
    private getProductCountText() {
        return cy.contains(/Product\(s\) found/);
    }
    
    /**
     * Finds the product count on the screen and extract the count value
     * @returns Product count
     */
    private getProductCount() { 
        return this.getProductCountText().invoke('text').then(text => {
            const count = Number(text.match(/\d+/)?.[0]);
            return count;
        }); 
    }
}
export default new StorePage(); 