import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./Layouts/Layout"
// import { IndexPage } from "./views/IndexPage"
//import { FavoritesPage } from "./views/FavoritesPage"
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))
const IndexPage = lazy(() => import('./views/IndexPage'))

export const AppRouter = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <Suspense>
              <IndexPage />
            </Suspense>
          } index />
          <Route path="/favoritos" element={
            <Suspense>
              <FavoritesPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
