import { createContext, useEffect, useState } from "react"
import Axios_instance from "../api/axiosConfig"

export const ProductContext = createContext()
export const ProductProvider = ({ children }) => {
    const [products,setProducts]=useState([])


      const fetchProductData = async () => {
            const response = await Axios_instance.get("/products")
            const Products = response.data
            setProducts(Products)
        }

    useEffect(() => {
        fetchProductData()
    }, [])






        return (<ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>)
    
    }