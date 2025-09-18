import { createContext, useEffect, useState } from "react"
import Axios_instance from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    // const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    const fetchProductData = async () => {
        setLoading(true);
        try {
            const response = await Axios_instance.get("/products")
            const Products = response.data
            setProducts(Products)
            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchProductData()
    }, [])



    //Admin_______

    const addProduct = async (productData) => {
        try {
            const response = await Axios_instance.post("/products", productData);
            setProducts((prev) => [...prev, response.data]);
            toast.success("Product added successfully!");
            navigate("/admin/products");
            // setRefresh(prev => !prev);
            fetchProductData()
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product.");
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = confirm("Are you sure want to delete?");
            if (response) {
                await Axios_instance.delete(`products/${productId}`);
                setProducts((prev) => prev.filter((product) => product.id !== productId));
                toast.success("Product Deleted");
                // setRefresh(prev => !prev);
                fetchProductData()
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Error Occurred");
        }
    };

    const editProduct = async (id, formData) => {
        try {
            const res = await Axios_instance.put(`/products/${id}`, formData);
            toast.success("Product Edited:", res.data.name);
            navigate('/admin/products')
            fetchProductData()

        } catch (error) {
            console.error("Error editing product:", error);
        }
    }

    return (<ProductContext.Provider value={{ products,loading, addProduct, deleteProduct, editProduct }}>
        {children}
    </ProductContext.Provider>)

}