import TestData from '../pages/testData';
import { Product } from '../types';

export const calculateCartAmount = () => { 
    return TestData.getShoppingList().then((shoppingList) => {
        const total = shoppingList.reduce((sum: number, product: Product) => 
            sum + (product.price * product.quantity), 0);
        return total.toFixed(2);
    });
}
