import React from 'react'
import './App.css';
import Navbar from "./components/MainNavigation/mainNavigation"
import {Route,Routes} from 'react-router-dom'
import AllProducts from './components/pages/AllProducts';
import NewProduct from './components/pages/NewProduct';
import ShowProduct from './components/pages/ShowProduct';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<AllProducts/>}></Route>
        <Route path='/new' element={<NewProduct/>}></Route>
        <Route path='/products/:id' element={<ShowProduct/>}></Route>
      </Routes>
    </>
  )
}

export default App