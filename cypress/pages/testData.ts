import { Product, Fixture } from '../types';

class TestData { 
    private fixtureFile: string = 'testExample.json';
    /**
    *   Fixture file is a shopping cart list
    *   The testExample.json is loaded by default
    *   However to test other fixture file, we can set to the fixture file we want to test
     */
    setFixtureFile(fileName: string) {
        this.fixtureFile = fileName;
        return this;
    }

    /**
     * loads and extracts fixture file
     * @returns Shopping array
     */
    getShoppingList() { 
        return cy.fixture<Fixture>(this.fixtureFile).then(file => file.shoppingList);
    }

    /**
     * Iterate all products in the shopping list
     * @param callback 
     * @returns Products as chain
     */
    forEachProduct(callback: (product: Product) => void) { 
        return this.getShoppingList().then((shoppingList) => {
            shoppingList.forEach(callback);
        });
    }

    /**
     * Get product item and returns the product if it exists on fixture file. Throw error if product does not exist
     * @param itemName 
     * @returns Product item
     */
    getProductByName(itemName: string) {
        return this.getShoppingList().then((shoppingList) => {
            const product = shoppingList.find(item => item.item === itemName);
            if (!product) {
                throw new Error(`Item "${itemName}" is not found in fixture file`);
            }
            return product;
        });
    }
}
export default new TestData();