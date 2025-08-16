import React, { useEffect, useState } from 'react'
import { useContext } from "react"
import Axios_instance from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../services/AddCart'
import { AuthContext } from '../../context/AuthContext'


function Products() {
    const [product,setProduct]=useState([])
    const navigate=useNavigate()
    const {user}=useContext(AuthContext)

    useEffect(()=>{
        async function fetchData(){
            try{
                const response=await Axios_instance.get('/products')
        const responseData=response.data
        const filteredData=responseData.map(({id,name,price,image})=>({id,name,price,image}))
        setProduct(filteredData)
        console.log(filteredData)
            }catch(e){
                console.log(e)
            }
        
    }
    fetchData()
    
    },[])
  return (
    
     <>
<div className="flex justify-center items-center bg-white/50">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 w-[90vw]">
    {product.map((item, index) => (
      <div
        key={index}
        className=" rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
        
        >
        {/* Image */}
        <div className="relative overflow-hidden cursor-pointer" onClick={()=>navigate(`/productview/${item.id}`)}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Hover message */}
          <div className="absolute inset-0 bg-black/30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm font-medium">
              Click to view details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-lg font-semibold text-black truncate">
            {item.name}
          </h3>

          {/* Price */}
          <p className="text-[#FFD369] font-medium mt-2">₹{item.price}</p>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <button className="w-full px-4 py-2 bg-[#FFD369] text-[#222831] rounded-lg text-sm font-medium hover:bg-[#e6be5c] transition cursor-pointer"
            onClick={()=>addToCart({user_id:user.id,product_id:item.id})}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
     
     
    </>
  )
}

export default Products