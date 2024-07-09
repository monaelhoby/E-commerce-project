
import {Heading} from '@components/common'
import CartSubTotal from '@components/ecommerce/cartSubTotalPrice'
import CartItemList from '@components/ecommerce/cartItemList'
import Loading from '@components/feedback/loading'
import UseCart from '@hooks/useCart'
import LottieHandler from '@components/feedback/lottieHandler'

function Cart() {
    const {items, products, loading, error, accessToken, placeorderStatus, remveItemHandler, changequantityHandler} = UseCart()
    return (
        <>
        
        <Heading title="Shopping Cart" />
        <Loading status={loading} error={error} type="cart">
            {
                Object
                    .values(items)
                    .length > 0
                        ? (
                            <> < CartItemList products = {
                                products
                            }
                            changeHandler = {
                                changequantityHandler
                            }
                            remveItemHandler = {
                                remveItemHandler
                            } /> <CartSubTotal products={products} userAAcessToken={accessToken}/> </>)
                             : placeorderStatus === "succeeded" ? (<LottieHandler message={"Your order has been placed successfully"} type="succededPlaceorder"/>) 
                             : (<LottieHandler message={"No Product in your cart"} type="empty"/>)
            }

        </Loading>
            </>
    )
}

export default Cart