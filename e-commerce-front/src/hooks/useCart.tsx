import {useCallback, useEffect} from 'react'

import {actGetProductsByItems} from "@store/cart/actions"
import {useAppDispatch, useAppSelector} from '@store/hooks'
import {cartCleanup, cartItemChangeQuantity, cartItemRemove} from '@store/cart/cartSlice'
import { resetOrderStatus } from '@store/orders/orderSlice'


function UseCart() {
    const dispatch = useAppDispatch()

    const {items, prductInfo, loading, error} = useAppSelector(
        state => state.CartSlice
    )

    const {accessToken} = useAppSelector(state => state.authRegisterSlice)

    const placeorderStatus = useAppSelector(state => state.OrderSlice.loading)

    useEffect(() => {
        const promise = dispatch(actGetProductsByItems())
        return () => {
            promise.abort() // if you open page and suddenly close it in half way
            dispatch(cartCleanup())
            dispatch(resetOrderStatus())
        }
    }, [dispatch])

    const products = prductInfo.map(ele => ({
        ...ele,
        quantity: items[ele.id]
    }))

    const changequantityHandler = useCallback((id : number, quantity : number) => {
        dispatch(cartItemChangeQuantity({id, quantity}))
    }, [dispatch])

    const remveItemHandler = useCallback((id : number) => {
        dispatch(cartItemRemove(id))
    }, [dispatch])

  return {error, loading, items, products, accessToken, placeorderStatus, changequantityHandler, remveItemHandler}
}

export default UseCart