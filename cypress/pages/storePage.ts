import { BASE_URL, TIMEOUTS } from '../constants/config'; 
import CartPanel from './cartPanel';
import TestData from './testData'; 

class StorePage { 
    open() {
        cy.visit(BASE_URL);
    }

    selectSizes(sizes: string) { 
        try { 
            cy.get(this.getSizeCheckbox(sizes), { timeout: 5000 }).should('exist').check({ force: true });
            cy.wait(TIMEOUTS.SHORT);
        } catch (error) { 
            cy.log('Unable to click on Size Filter');
            throw error;
        }
    }

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
    private getSizeCheckbox(size: string) { 
        return `input[data-testid="checkbox"][value="${size}"]`; 
    }

    private getProductCountText() {
        return cy.contains(/Product\(s\) found/);
    }
    
    private getProductCount() { 
        return this.getProductCountText().invoke('text').then(text => {
            const count = Number(text.match(/\d+/)?.[0]);
            return count;
        }); 
    }
}
export default new StorePage(); 