import { flow, getSnapshot, types, onPatch, onAction, getRoot } from "mobx-state-tree";

export const Product = types
    .model("Product", {
        brand: types.maybe(types.string),
        description: types.maybe(types.string),
        id: types.identifierNumber,
        image: types.maybe(types.string),
        price: types.maybe(types.number),
        shortDesc: types.maybe(types.string),
        type: types.maybe(types.string),
    })
    // .views(self => ({
    //     // * Product Views
    //         get includeInAggregations() {

    //         }
    //     }))
    .actions(self => ({
        filterProducts(brand){
            return self.brand.filter;
        }
    }))