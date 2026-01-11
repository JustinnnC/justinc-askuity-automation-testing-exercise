import { BASE_URL, TIMEOUTS } from '../constants/config'; 
import CartPanel from './cartPanel';
import TestData from './testData'; 

class StorePage { 
    open() {
        cy.visit(BASE_URL);
    }

    selectSizes(sizes: string[]) { 
        sizes.forEach(size => { 
            this.clickSizeFilter(size);
        });
    }

    fillCartFromFixture() {
        TestData.forEachProduct((product) => { 
            if (product.quantity > 0){ 
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

    private clickSizeFilter(size: string){ 
        try {
            cy.get(this.getSizeCheckbox(size), { timeout: 5000 }).should('exist').check({ force: true });
            cy.wait(TIMEOUTS.SHORT);
            this.getProductCount().then(currCount => {
                this.verifyProductCountMatches(currCount);
            });
        } catch (error) {
            cy.log('Unable to click on Size Filter');
            throw error;
        }
    }

    private verifyProductCountMatches(displayedCount: number) {
        try {
            this.getProductCountText().should('contain', displayedCount.toString());
            cy.get('button:contains("Add to cart")').should(($buttons) => {
                const actualCount = $buttons.length;
                if (actualCount !== displayedCount) {
                    throw new Error(`Mismatch - Product(s) Found Value: ${displayedCount}, Visible Items : ${actualCount}`);
                }
                expect(actualCount).to.equal(displayedCount);
            });
        } catch (error) {
            cy.log('Mismatch product count values');
            throw error;
        }
    }
}
export default new StorePage(); 