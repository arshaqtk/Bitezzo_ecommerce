
import Axios_instance from "../api/axiosConfig"

export const addToCart=async ({user_id,product_id})=>{
    
    try{
        const userResponse=await Axios_instance.get(`users/${user_id}`)
        const userData=userResponse.data

       const productResponse=await Axios_instance.get(`/products?id=${product_id}`)
        const productData=productResponse.data

        const filteredData=productData.map(({id,name,price,image})=>({id,name,price,image}))

        const cart = [...userData.cart, { product:filteredData, quantity: 1 }]
        const userUpdated={...userData,cart}

        console.log(userUpdated)
        const cartUpdated=await Axios_instance.put(`/users/${user_id}`,userUpdated)
    }catch(e){
       console.log(e)
    }
}