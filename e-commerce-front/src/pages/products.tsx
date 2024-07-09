

import Product from '@components/ecommerce/product/index'
import {TProduct} from "@customTypes/products";
import Loading from "@components/feedback/loading";
import {GridList, Heading} from "@components/common";
import UseProduct from "@hooks/useProduct";

const Products = () => {

    const {error, loading, productFullInfo, params} = UseProduct()

    return (<>
      <Heading title={`${params.prefix?.toUpperCase()} Products`} /> 
      < Loading status = {loading} type="product"
      error = {
          error
      } > <GridList<TProduct> records={productFullInfo}

        renderItem={(record) => <Product {...record} />} message={'there is no products'} /> 
      </Loading>
    </>)
}

export default Products
