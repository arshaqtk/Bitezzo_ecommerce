import React from 'react'
import Nav from '../../components/NavBar/Nav'
import Banner from '../../components/Banner/Banner'
import Products from '../../components/Products/Products'
import { Navigate } from 'react-router-dom'

function HomePage() {
    // let navigate=Navigate()

  return (
    <> 
    <Nav/>
    <Banner/>
    <Products/>
    </>
   
  )
}

export default HomePage