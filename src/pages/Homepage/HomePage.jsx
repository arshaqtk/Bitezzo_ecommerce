import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../components/NavBar/Nav'
import Banner from '../../components/Banner/Banner'
import { useNavigate } from 'react-router-dom'
import Axios_instance from '../../api/axiosConfig'
import Footer from '../../components/Footer/Footer'
import { CartContext} from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'

function HomePage() {
    const navigate=useNavigate()
    const [product,setProduct]=useState([])
     const {user}=useContext(AuthContext)
 const { addToCart } = useContext(CartContext);

     useEffect(()=>{
        async function fetchData(){
            try{
                const response=await Axios_instance.get('/products?_limit=4')
        const responseData=response.data
        const Products=responseData.map(({id,name,price,image})=>({id,name,price,image}))
        setProduct(Products)
            }catch(e){
                console.log(e)
            }    
    }
    fetchData()
    
    },[])

  return (
    <> 
    <Nav/>
    <Banner/>
    <div className=" bg-[#FAF1E6]">
    <h2 className="text-3xl font-bold text-center text-black p-5 underline ">Top Selling Dishes</h2>
    <div className='flex justify-center items-center'>
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
        <div className="p-3 bg-white/50">
          <h3 className="text-lg font-semibold text-black truncate">
            {item.name}
          </h3>

          {/* Price */}
          <p className="text-black font-medium mt-2">₹{item.price}</p>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <button className="w-full px-4 py-2 bg-[#FFD369] text-[#222831] rounded-lg text-sm font-medium hover:bg-[#e6be5c] transition cursor-pointer" 
            onClick={()=>addToCart({user_id:user.id,productId:item.id,name:item.name,price:item.price,image:item.image})}
                       
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
    </div>
  
</div>
     <Footer/>
    </>
   
  )
}

export default HomePage