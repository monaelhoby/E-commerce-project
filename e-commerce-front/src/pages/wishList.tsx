

import Product from '@components/ecommerce/product/index'
import {TProduct} from "@customTypes/products";
import Loading from "@components/feedback/loading";
import {GridList, Heading} from "@components/common";
import UseWishlist from '@hooks/useWishlist';

function WishList() {

  const {error, loading, records} = UseWishlist()
  
  return (<>
        <Heading title="Your WishList" />
        < Loading type="product" status = {
        loading
    }
    error = {
        error
    } > <GridList<TProduct> records={records}
      renderItem={(record) => <Product {...record} />} message={'your wishlist is empty'} /> 
    </Loading>
  </>)
}

export default WishList