import Product from './Product'
import { types, flow  } from 'mobx-state-tree';

export const ShopStore = types.model('ShopStore', {
    products: types.array(Product),
    loadingProductData: false
})
    .actions(self => ({
        setProducts(products) { self.products = products; },
        loadProductData: flow(function* loadProductData() {
            try {
                self.loadingProductData = true;
                const response = yield fetch('https://butterknifestore-default-rtdb.europe-west1.firebasedatabase.app/products.json', { mode: "cors" })
                if (response.status === 401) return new Error("401 - Not authenticated");
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
                const productFetch = yield response.json();
                self.products = productFetch;
                self.loadingProductData = false;
                return productFetch
            } catch (ex) {
                console.error('Error fetching products', ex);
            } finally {
                self.loadingTransactionData = false;
            }
            // debugger;
        })

    }))