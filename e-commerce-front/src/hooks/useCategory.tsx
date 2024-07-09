import { useEffect } from "react";


import {useAppDispatch, useAppSelector} from '@store/hooks'
import actGetCategories from '@store/categories/actions/index'
import { categoryCleanup } from "@store/categories/categorySlice";

function UseCategory() {                                                    

  const {loading, error, records} = useAppSelector((state) => state.CategoriesSlice)

  const dispatch = useAppDispatch()


  useEffect(() => {

      const promise = dispatch(actGetCategories());

    return () => {
      dispatch(categoryCleanup())
      promise.abort()
    }

  }, [dispatch]);

  return {error, loading, records}
}

export default UseCategory