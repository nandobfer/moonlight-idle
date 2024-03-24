import { WithoutFunctions } from "../../types/helpers"

export type ItemForm = WithoutFunctions<Item>

export class Item {
    name: string
    price: number
    row: number
    column: number

    constructor(data: ItemForm) {
        this.name = data.name
        this.price = data.price
        this.row = data.row
        this.column = data.column
    }
}
