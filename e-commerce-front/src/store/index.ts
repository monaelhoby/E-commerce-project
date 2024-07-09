import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {persistStore, persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from "redux-persist"
import storage from 'redux-persist/lib/storage'

import CategoriesSlice from './categories/categorySlice'
import productSlice from './products/productSlice'
import CartSlice from './cart/cartSlice'
import wishListSlice from './wishList/wishListSlice'
import authRegisterSlice from './auth/authSlice'
import OrderSlice from './orders/orderSlice'


const rootPresistConfig= {
  key: 'root',
  storage,
  whitelist: ['CartSlice', 'authRegisterSlice']
}

// for caching item
const cartPresistConfig= {
  key: 'CartSlice',
  storage,
  whitelist: ['items']
}

const authPresistConfig= {
  key: 'authRegisterSlice',
  storage,
  whitelist: ['user', 'accessToken']
}

const wishListPresistConfig= {
  key: 'wishList',
  storage,
  whitelist: ['itemsId']
}

const rootReducer= combineReducers({
  authRegisterSlice: persistReducer(authPresistConfig, authRegisterSlice),
  CategoriesSlice,
  productSlice,
  OrderSlice,
  CartSlice: persistReducer(cartPresistConfig, CartSlice),  //for caching items
  wishListSlice: persistReducer(wishListPresistConfig, wishListSlice),
})

const persistedReducer = persistReducer(rootPresistConfig, rootReducer)

 const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const presistor = persistStore(store)

export {store, presistor}