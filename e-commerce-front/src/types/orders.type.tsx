import { TProduct } from "./products"

export type TorderItem = {
    id: number,
    subTotal: number,
    items: TProduct[]
}