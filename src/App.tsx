import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Productdetail from "./pages/Productdetail"
import Wishlist from "./pages/Wishlist"
import Checkout from "./pages/Checkout"
import ThemecontextProvider from './component/common/Themeprovider'
import Cart from "./component/cart/cart"
import Login from "./component/login/login"
import Registration from "./component/registation/Registration"
import Userpage from "./pages/Userpage"
import Authcontextprovider from "./component/auth/authcontext"
import Protectedroute from "./component/common/protectedroute"
import Publiclayout from "./component/layout/publiclayout"
import Privatelayout from "./component/layout/Privatelayout"
import Scrolltotop from "./component/common/scrollyotop"
import Cartlayout from "./component/layout/cartlayout"



function App() {
  return (
    <div className="h-screen text-slate-900 dark:bg-slate-800 dark:text-slate-50">
      <Authcontextprovider>
        <ThemecontextProvider>


          <Scrolltotop />

          <Routes>
            <Route path="/" element={<Publiclayout />}>

              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<Productdetail />} />
              <Route path="cart" element={<Cartlayout />}>
                <Route index element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
              </Route>
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />

            </Route>

            <Route element={<Protectedroute><Privatelayout /></Protectedroute>}>
              <Route path="/userpage" element={<Userpage />} />
            </Route>
          </Routes>

        </ThemecontextProvider>
      </Authcontextprovider>
    </div>
  )
}

export default App
