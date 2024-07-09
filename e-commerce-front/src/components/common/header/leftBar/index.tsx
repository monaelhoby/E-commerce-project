


import HeaderCounter from '../headerCounter/headerCounter';
import {getTotalQuantity} from '@store/selectors'
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import CartIcon from "@assets/svg/cart.svg?react"; //?react this for vite only
import { useAppSelector } from "@store/hooks";

function LeftBar() {

    const totalQuantityWishlist = useAppSelector(state => state.wishListSlice.itemsId.length);
    
    const totalQuantityCart = useAppSelector(getTotalQuantity)
  return (
    <>
    <HeaderCounter totalQuantity={totalQuantityWishlist} svgIcon={<WishlistIcon title="basket icon" />} to={"/wishlist"} title="Wishlist"/>
    <HeaderCounter totalQuantity={totalQuantityCart} svgIcon={<CartIcon title="basket icon" />} to={"/shopping-cart"} title="Cart"/>
    </>
  )
}

export default LeftBar