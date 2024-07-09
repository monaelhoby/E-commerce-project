import {Form, Button} from "react-bootstrap";
import { memo } from "react";

import {TProduct} from "@customTypes/products";
import styles from "./style.module.css";
import ProuctCard from '../productInfo'


const {cartItem, cartItemSelection} = styles;
 
type CartIemProps = TProduct & {changeHandler: (id: number, quantity: number) => void, remveItemHandler: (id: number) => void}

const CartItem = memo(({id, title, img, price, max, quantity, changeHandler, remveItemHandler} : CartIemProps) => {

    const renderOption = Array(max)
        .fill(0)
        .map((_, index) => <option key={index} value={index+1}>{index + 1}</option>)

    const changeQuantityHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const theQuantity = +event.target.value
        changeHandler(id, theQuantity)
    }


    return (
        <div className={cartItem}>
            <ProuctCard img= {img} title={title} price={price} direction="column">
                    <Button
                        variant="secondary"
                        style={{
                            color: "white",
                            width: "100px"
                        }}
                        className="mt-auto"
                        onClick={() => remveItemHandler(id)}>
                        Remove
                    </Button>
            </ProuctCard>

            <div className={cartItemSelection}>
                <span className="d-block mb-1">Quantity</span>
                <Form.Select value={quantity} onChange={changeQuantityHandler}>
                    {renderOption}
                </Form.Select>
            </div>
        </div>
    )
})

export default CartItem
