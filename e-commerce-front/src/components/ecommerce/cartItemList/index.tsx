import { TProduct } from "@customTypes/products"
import CartItem from "../cartItem"

type ListProps = {
    products: TProduct[],
    changeHandler: (id: number, quantity: number) => void
    remveItemHandler: (id: number) => void
}

const List = ({products, changeHandler, remveItemHandler}: ListProps) => {
    const renderList= products.map(ele => <CartItem key={ele.id} {...ele} changeHandler={changeHandler} remveItemHandler={remveItemHandler}/>)
  return (
    <>{renderList}</>
  )
}

export default List
