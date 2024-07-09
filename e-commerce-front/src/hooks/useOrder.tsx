import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "@store/hooks"
import getOrders from "@store/orders/actions/actGetOrders"
import { TProduct } from "@customTypes/products"
import { resetOrderStatus } from "@store/orders/orderSlice"

const UseOrder = () => {
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([])
    const dispatch = useAppDispatch()
    const {orderList, loading, error} = useAppSelector(state => state.OrderSlice)

    const closeModalHandler = () => {
      setShowModal(false)
      setSelectedProduct([])
    }

    const viewDetailsHandler = (id: number) => {
      setShowModal(true)
      const product = orderList.find(order => order.id === id)
      const newProduct = product?.items ?? []
      setSelectedProduct(prev => [...prev, ...newProduct])
    }

    useEffect(() => {
        const promise = dispatch(getOrders())
        return () => {
          promise.abort()
          dispatch(resetOrderStatus())
        }
    }, [dispatch])

  return {showModal, selectedProduct, orderList, loading, error, closeModalHandler, viewDetailsHandler}
}

export default UseOrder