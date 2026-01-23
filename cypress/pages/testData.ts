import { Product, Fixture } from '../types';

class TestData { 
    /*
        Fixture file is a shopping cart list
        The testExample.json is loaded by default
        However to test other fixture file, we can set to the fixture file we want to test
    */
    private fixtureFile: string = 'testExample.json';
    setFixtureFile(fileName: string) {
        this.fixtureFile = fileName;
        return this;
    }

    getShoppingList() { 
        return cy.fixture<Fixture>(this.fixtureFile).then(file => file.shoppingList);
    }

    forEachProduct(callback: (product: Product) => void) { 
        return this.getShoppingList().then((shoppingList) => {
            shoppingList.forEach(callback);
        });
    }

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