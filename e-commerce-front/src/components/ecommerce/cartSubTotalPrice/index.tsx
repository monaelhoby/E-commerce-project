
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useState } from 'react';


import { TProduct } from '@customTypes/products'
import style from './style.module.css'
import { useAppDispatch } from '@store/hooks';
import actPlaceOrders from '@store/orders/actions/actPlaceOrder';
import { clearCartAfterPlaceorder } from '@store/cart/cartSlice';

const {container} = style


type CartSubTotalProps = {products: TProduct[], userAAcessToken: string | null}

const CartSubTotal = ({products, userAAcessToken}: CartSubTotalProps) => {

  const dispatch = useAppDispatch()

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const theSubTotoal = products.reduce((acc, product) => {

  const {quantity, price} = product

  if(quantity && typeof quantity == "number"){
    return acc + quantity * price
  }else{
    return acc
  }

  }, 0)


  const handlePlaceOrder = () => {
    setLoading(true);
    dispatch(actPlaceOrders(theSubTotoal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceorder());
        setShow(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }



  return (
    <>
     <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to place order with Subtotal:{" "}
         {theSubTotoal.toFixed(2)} EGP
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" style={{color: "#FFF"}} onClick={handlePlaceOrder}>
          {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
                </>) :
            ("Confirm") }
          </Button>
        </Modal.Footer>
      </Modal>
    <div className={container}>
      <span>SubTotal: </span>
      <span>{theSubTotoal.toFixed(2)} EGP</span>
    </div>
    {
      userAAcessToken ? <div className={container}>
      <span></span>
      <span><Button variant='info' style={{color: 'white'}} onClick={handleShow}>Place Order</Button></span>
    </div> : null
    }
    
    </>
  )
}

export default CartSubTotal
