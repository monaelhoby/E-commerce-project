
import { lazy } from 'react'


const Home = lazy(() => import('./home'))
const About = lazy(() => import('./aboutus'))
const Categories = lazy(() => import('./categories'))
const Products = lazy(() => import('./products'))
const WishList = lazy(() => import('./wishList'))
const Cart = lazy(() => import('./cart'))
const Profile = lazy(() => import('./profile'))
const Login = lazy(() => import('./login'))
const Register = lazy(() => import('./register'))
const ErrorPage = lazy(() => import('./error'))
const Orders = lazy(() => import('./order'))



export {Home, About, Categories, Products, Login, Register, ErrorPage, Cart, WishList, Profile, Orders}