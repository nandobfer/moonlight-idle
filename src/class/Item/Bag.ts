import { WithoutFunctions } from "../../types/helpers"
import { Equipment } from "./Equipment"
import { Item } from "./Item"

export type BagForm = WithoutFunctions<Bag>

export class Bag {
    items: (Item | Equipment)[] = []

    constructor(data: BagForm) {
        this.items = data.items
    }

    addItem(item: Item | Equipment) {
        this.items.push(item)
    }

    removeItem(item: Item | Equipment) {
        this.items = this.items.filter((_item) => _item != item)
    }
}
