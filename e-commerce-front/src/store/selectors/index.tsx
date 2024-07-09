import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../index"


const getTotalQuantity= createSelector(
    (state: RootState) => state.CartSlice.items, 
    (items) => {
    const totalQuantity= Object.values(items).reduce((acc, current) => acc + current, 0 )
    return totalQuantity
} 
)



export {getTotalQuantity}