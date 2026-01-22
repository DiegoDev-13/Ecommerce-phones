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
import { DashboardLayout } from "../layouts/DashboardLayout"
import { DashboardProductsPage } from "../pages/dashboard/DashboardProductsPage"
import { DashboardNewProductPage } from "../pages/dashboard/DashboardNewProductPage"
import { DashboardProductSlugPage } from "../pages/dashboard/DashboardProductSlugPage"
import { DashboardOrdersPage } from "../pages/dashboard/DashboardOrdersPage"
import { DashboardOrderPage } from "../pages/dashboard/DashboardOrderPage"


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
            <Route path="/account" element={<ClientLayout />}>
              <Route index element={<Navigate to='pedidos' />}/>
              <Route path="pedidos" element={<OrdersUserPage />}/>
              <Route path="pedidos/:id" element={<OrderUSerPage />} />
            </Route>
        </Route>
        <Route path="/checkout"  element={<CheckoutPage />} />
        <Route path="/checkout/:id/thank-you" element={<ThankyouPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} > 
          <Route index element={<Navigate to='products' />} />
          <Route path="products" element={<DashboardProductsPage />} />
          <Route path="products/new" element={<DashboardNewProductPage />} />
          <Route path="products/edit/:slug" element={<DashboardProductSlugPage />} />
          <Route path="orders" element={<DashboardOrdersPage />} />
          <Route path="orders/:id" element={<DashboardOrderPage />} />
        </Route>
    </Routes>
  )
}
