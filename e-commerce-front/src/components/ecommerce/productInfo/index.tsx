
import styles from './style.module.css'

type TproductProps = {
    title: string,
    price: number,
    img: string,
    quantity?: number,
    children?: React.ReactNode,
    direction: 'row' | 'column',
    style?: React.CSSProperties 
}

const ProductInfo = ({price, title, img,quantity, children, direction = 'row', style}: TproductProps) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
    <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt={title}/>
    </div>
    <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)}
            EGP</h3>
            {quantity && (<h3>Totla Quantity: {quantity}</h3>)}
            {quantity && (<h3>Totla Price: {price * quantity} EGP</h3>)}
        {children}
    </div>
</div>
  )
}

export default ProductInfo
