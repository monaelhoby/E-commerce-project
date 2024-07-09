import { Button , Modal, Spinner} from "react-bootstrap";
import { useEffect, useState, memo } from "react";


import { TProduct } from "@customTypes/products";
import styles from "./style.module.css";
import { useAppDispatch } from "@store/hooks";
import {addToCart} from '@store/cart/cartSlice';
import toggleLikeWishList from "@store/wishList/actions";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import ProductCard from '../productInfo'


const { product, productImg,maximumNotice, wishlistBtn } = styles;

const Product = memo(({id, title, img,price, max, quantity, isLiked, isAuthorized}: TProduct) => {
  const dispatch = useAppDispatch()


  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const handelAddCart= () => {
    dispatch(addToCart(id))

    setIsBtnDisabled(true);
  }


  const handelToggleWishList = () => {
    if(isAuthorized){
      if(!isLoading){
        setIsLoading(true)
        dispatch(toggleLikeWishList(id)).unwrap().then(() => 
        setIsLoading(false)).catch(() => setIsLoading(false))
      }
    }else{
      setShowModal(true)
    }
  }

  return (
    <>
     <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
    <ProductCard img={img} title={title} price={price} direction="row">
         <div className={wishlistBtn} 
         onClick={handelToggleWishList}
         >
        {isLoading ? (
          <Spinner animation="border" size="sm" variant="primary" />
        ) : isLiked ? (
          <LikeFill />
        ) : (
          <Like />
        )}
      </div>
      <p className={maximumNotice}>
        {quantityReachedToMax
          ? "You reach to the limit"
          : `You can add ${currentRemainingQuantity} item(s)`}
      </p>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={handelAddCart}
        disabled={isBtnDisabled || quantityReachedToMax}
      >
        {isBtnDisabled ? (
          <>
            <Spinner animation="border" size="sm" /> Loading...
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </ProductCard>
    </>
  );
});

export default Product;