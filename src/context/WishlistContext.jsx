
import { useNavigate } from "react-router-dom"
import Axios_instance from "../api/axiosConfig"
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const WishListContext = createContext()
export  const WishlistProvider=({ children }) => {
  const navigate = useNavigate();

  const [wishlistToggle,setWishListToggle]=useState(false)
     const [wishlistItems, setWishListItems] = useState([])
     const { user } = useContext(AuthContext)

   useEffect(() => {
       
        if(user.id){
            async function fetchWishListData() {
            try {
                const { data } = await Axios_instance.get(`/users?id=${user.id}`)
                const wishListData = data[0].wishlist
                setWishListItems(wishListData)
               
            } catch (e) {
                console.log(e)
            }
        }
        fetchWishListData()
        }
        
    }, [])

 const addToWishlist = async ({ productId, name, price, image }) => {
    setWishListToggle(!wishlistToggle)
 if(!user.id) {
                toast.error("Login First")
                return
            }

    try {
      
        if (user.id) {
            const userResponse = await Axios_instance.get(`users/${user.id}`)
            const userData = userResponse.data

             if (userData.wishlist.find((item) => item.productId == productId)) {
                const updatedWishlist = userData.wishlist.filter(item => item.productId !== productId);

                const wishlistRemoved =   await Axios_instance.patch(`/users/${user.id}`, { wishlist: updatedWishlist })
               
                toast.success("removed")

            }else{
                const wishlist = [...userData.wishlist, { productId: productId, productName: name, productPrice: price, productImage: image }]
                const userUpdated = { ...userData, wishlist }
                const wishlistUpdated = await Axios_instance.put(`/users/${user.id}`, userUpdated)
                setWishListItems(wishlist)
                toast.success("Wishlist Added")
            }
                
            }
        


    } catch (e) {
        console.log(e)
    }
}


const removeWishlist=async(productId)=>{
    setWishListToggle(!wishlistToggle)
    try {
      
        if (user.id) {
            const userResponse = await Axios_instance.get(`users/${user.id}`)
            const userData = userResponse.data

             if (userData.wishlist.find((item) => item.productId == productId)) {
                const updatedWishlist = userData.wishlist.filter(item => item.productId !== productId);
                setWishListItems(updatedWishlist)
                const wishlistRemoved =   await Axios_instance.patch(`/users/${user.id}`, { wishlist: updatedWishlist })
                toast.success("removed")
            }
        }
    }catch (e) {
        console.log(e)
    }
}

return (<WishListContext.Provider value={{ addToWishlist,removeWishlist,wishlistItems }}>
       {children}
     </WishListContext.Provider>)
}