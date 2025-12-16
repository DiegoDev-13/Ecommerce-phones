import { Route, Routes } from "react-router-dom"
import { RootLayout } from "../layouts/RootLayout"
import { Home } from "../pages/Home"
import { CellPhones } from "../pages/CellPhones"
import { About } from "../pages/About"

export const MyRouters = () => {
  return (
    <Routes>
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Home/>} />
            <Route path="celulares" element={<CellPhones/>} />
            <Route path="nosotros" element={<About />} />
        </Route>
    </Routes>
  )
}
