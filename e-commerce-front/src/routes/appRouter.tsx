import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import MainLayout from '@layouts/mainLayout/mainLayout';
import ProfileLayout from '@layouts/profileLayout';
import {
    Home,
    About,
    Categories,
    Products,
    Login,
    Register,
    ErrorPage,
    Cart,
    WishList,
    Profile,
    Orders
} from '@pages/index'
import PageSuspenseFallback from '@components/feedback/pageSuspense';
import ProtectedRoute from './guard/protectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: (<PageSuspenseFallback><MainLayout/></PageSuspenseFallback>),
        errorElement: (<PageSuspenseFallback><ErrorPage/></PageSuspenseFallback>),
        children: [
            {
                index: true,
                element: (<PageSuspenseFallback><Home/></PageSuspenseFallback>)
            }, {
                path: 'about',
                element: (<PageSuspenseFallback><About/></PageSuspenseFallback>)
            }, {
                path: 'categories',
                element: (<PageSuspenseFallback><Categories/></PageSuspenseFallback>)
            }, {
                path: 'categories/products/:prefix',
                element: (<PageSuspenseFallback><Products/></PageSuspenseFallback>),
                loader: ({params}) => {
                    if (typeof params.prefix !== "string" || !/^[a-z]+$/i.test(params.prefix)) {
                        throw new Response("Bad Request", {
                            statusText: "Category not found",
                            status: 400
                        });
                    }
                    return true;
                }
            }, {
                path: 'login',
                element: (<PageSuspenseFallback><Login/></PageSuspenseFallback>),
            }, {
                path: 'profile',
                element: (<ProtectedRoute><PageSuspenseFallback><ProfileLayout/></PageSuspenseFallback></ProtectedRoute>),
                children: [{
                    index: true,
                    element: <PageSuspenseFallback><Profile /></PageSuspenseFallback>
                },{
                    path: 'orders',
                    element: <PageSuspenseFallback><Orders /></PageSuspenseFallback>
                }]
            },{
                path: 'register',
                element: (<PageSuspenseFallback><Register/></PageSuspenseFallback>),
            }, {
                path: 'shopping-cart',
                element: (<ProtectedRoute><PageSuspenseFallback><Cart/></PageSuspenseFallback></ProtectedRoute>),
            }, {
                path: 'wishlist',
                element: (<ProtectedRoute><PageSuspenseFallback><WishList/></PageSuspenseFallback></ProtectedRoute>),
            }
        ]
    }
])

const AppRoute = () => {
   
    return (<RouterProvider router={router}/>)

}

export default AppRoute