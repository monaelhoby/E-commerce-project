import {useEffect} from "react";
import {useParams} from "react-router-dom";

import actGetProduct from '@store/products/actions/index'
import {productCleanup} from '@store/products/productSlice'
import {useAppDispatch, useAppSelector} from '@store/hooks'
import {TProduct} from "@customTypes/products";



function UseProduct() {

    const params = useParams()

    const dispatch = useAppDispatch()

    const {loading, error, records} = useAppSelector(
        (state) => state.productSlice
    );
    const cartItems = useAppSelector(state => state.CartSlice.items)
    const wishList = useAppSelector(state => state.wishListSlice.itemsId)
    const {accessToken} = useAppSelector(state => state.authRegisterSlice)

    const productFullInfo = records.map((record : TProduct) => ({
        ...record,
        quantity: cartItems[record.id] || 0,
        isLiked: wishList.includes(record.id),
        isAuthorized: accessToken ? true : false
    }))

    useEffect(() => {
        const promise = dispatch(actGetProduct(params.prefix as string))

        return() => {
            dispatch(productCleanup());
            promise.abort()
        };
    }, [dispatch, params]);

  return {error, loading, productFullInfo, params}
}

export default UseProduct