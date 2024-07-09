
import Category from "@components/ecommerce/category/index";
import Loading from "@components/feedback/loading";
import { GridList, Heading } from "@components/common";
import { TCategory } from "@customTypes/category";
import UseCategory from "@hooks/useCategory";

const Categories = () => {

  const {loading, error, records} = UseCategory()


  return ( 
    <>
    <Heading title="Category" />
      <Loading status={loading} error={error} type="category">
        <GridList<TCategory> records={records} renderItem={(record) => <Category {...record} />} message={"there is no categories"} />
      </Loading>
  </>
  )
}

export default Categories
