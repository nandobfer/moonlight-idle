import { WithoutFunctions } from "../../types/helpers"

export type ItemForm = Omit<WithoutFunctions<Item>, "favorite">

export class Item {
    name: string
    price: number
    row: number
    column: number
    favorite = false

    constructor(data: ItemForm) {
        this.name = data.name
        this.price = data.price
        this.row = data.row
        this.column = data.column
    }
}
