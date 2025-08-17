
import { useNavigate } from "react-router-dom"
import Axios_instance from "../api/axiosConfig"
import { useState } from "react";

export const useWishListActions = () => {
  const navigate = useNavigate();
  const [wishlistToggle,setWishListToggle]=useState(false)

 const addToWishlist = async ({ productId, name, price, image }) => {
    setWishListToggle(!wishlistToggle)

    try {
        const user = JSON.parse(localStorage.getItem("user"))||""
        const user_id = user.id
        if (user_id) {
            const userResponse = await Axios_instance.get(`users/${user_id}`)
            const userData = userResponse.data

             if (userData.wishlist.find((item) => item.productId == productId)) {
                const updatedWishlist = userData.wishlist.filter(item => item.productId !== productId);

                const wishlistRemoved =   await Axios_instance.patch(`/users/${user_id}`, { wishlist: updatedWishlist })
                console.log("removed",updatedWishlist)

            }else{
                const wishlist = [...userData.wishlist, { productId: productId, productName: name, productPrice: price, productImage: image }]
                const userUpdated = { ...userData, wishlist }
                console.log(userUpdated)
                const wishlistUpdated = await Axios_instance.put(`/users/${user_id}`, userUpdated)
                alert("Wishlist Added")
            }
                
            }
        else {
            alert("Login First")
            navigate('/login')
        }


    } catch (e) {
        console.log(e)
    }
}
return {addToWishlist}
}