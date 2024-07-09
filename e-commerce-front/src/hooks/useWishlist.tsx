import { useEffect } from 'react'


import getWishlist from '@store/wishList/actions/getWishlist'
import {useAppDispatch, useAppSelector} from '@store/hooks'
import {TProduct} from "@customTypes/products";
import { wishlistCleanup } from '@store/wishList/wishListSlice';


function UseWishlist() {
    const dispatch = useAppDispatch()

  const {error, loading, productFullInfo} = useAppSelector(state => state.wishListSlice)
  const cartItems = useAppSelector(state => state.CartSlice.items)

  const records = productFullInfo.map((record : TProduct) => ({
    ...record,
    quantity: cartItems[record.id] || 0,
    isLiked: true,
    isAuthorized: true
}))

  useEffect(() => {
    const promise = dispatch(getWishlist("productsFullInfo"))
    return () => {
      dispatch(wishlistCleanup())
      promise.abort()
    }
  },[dispatch])

 
  return {error, loading, records}
}

export default UseWishlist