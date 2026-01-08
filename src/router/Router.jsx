import { Navigate, Route, Routes } from "react-router-dom"
import { RootLayout } from "../layouts/RootLayout"
import { Home } from "../pages/Home"
import { CellPhones } from "../pages/CellPhones"
import { CellPhonePage } from "../pages/CellPhonePage"
import { About } from "../pages/About"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { ClientLayout } from "../layouts/ClientLayout"
import { OrdersUserPage } from "../pages/OrdersUserPage"
import { CheckoutPage } from "../pages/CheckoutPage"
import { ThankyouPage } from "../pages/ThankyouPage"
import { OrderUSerPage } from "../pages/OrderUSerPage"

export const MyRouters = () => {
  return (
    <Routes>
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Home/>} />
            <Route path="celulares" element={<CellPhones/>} />
            <Route path="celulares/:slug" element={<CellPhonePage/>} />
            <Route path="nosotros" element={<About />} />
            <Route path="login"  element={<LoginPage />}/>
            <Route path="register"  element={<RegisterPage />}/>
            <Route path="account" element={<ClientLayout />}>
              <Route index element={<Navigate to='pedidos' />}/>
              <Route path="pedidos" element={<OrdersUserPage />}/>
              <Route path="pedidos/:id" element={<OrderUSerPage />} />
            </Route>
        </Route>
        <Route path="/checkout"  element={<CheckoutPage />} />
        <Route path="/checkout/:id/thank-you" element={<ThankyouPage />} />
    </Routes>
  )
}
