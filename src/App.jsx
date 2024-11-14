
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
// import  Counter  from './features/counter/Counter'
// import Product from './features/product/Product.jsx'
import Home from './pages/Home/Home'
import Login from './features/autentication/components/Login'
import SignUp from './features/autentication/components/Signup'
import Cart from './features/cart/components/Cart'
import Checkout from './pages/Checkout'
import ProductDetailPage from './pages/ProductDetailPage'
import Protected from './features/autentication/components/Protected'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectLoggedInUser } from './features/autentication/authSlice'
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice'

const router=createBrowserRouter(
  [
    {
    
    path:"/",
    element:<Protected><Home/></Protected>
  
    },
    {
      path:"/login",
      element:<Login/>
    },
    {

      path:"/signup",
      element:<SignUp/>
    },
    {
      path:"/cart",
      element:<Protected><Cart/></Protected>
    },
    {
      path:"/checkout",
      element:<Protected><Checkout/></Protected>
    },
    {
      path:"/productdetail/:id",
      element:<Protected><ProductDetailPage/></Protected>
    }

  ]

)

function App() {

const dispatch=useDispatch();
const user=useSelector(selectLoggedInUser)

useEffect(()=>{
  if(user){
    dispatch(fetchItemsByUserIdAsync(user.id))
  }
},[dispatch,user])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
