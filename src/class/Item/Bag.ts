import { WithoutFunctions } from "../../types/helpers"
import { Item } from "./Item"

export type BagForm = WithoutFunctions<Bag>

export class Bag {
    items: Item[] = []

    constructor(data: BagForm) {
        this.items = data.items
    }

    addItem(item: Item) {
        this.items.push(item)
    }

    removeItem(item: Item) {
        this.items = this.items.filter((_item) => _item != item)
    }
}
