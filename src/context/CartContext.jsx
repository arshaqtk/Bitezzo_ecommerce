
import { useNavigate } from "react-router-dom"
import Axios_instance from "../api/axiosConfig"
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const CartContext = createContext()
export const CartProvider = ({ children }) => {

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([])
    const [cartItemCount, setCartItemsCount] = useState([{ id: "", count: 1, productPrice: 0 }])
    const [subTotal, setSubTotal] = useState(0)
  
    const { user } = useContext(AuthContext)

//_________Data____Fetching_______________
    
    useEffect(() => {
        if (user.id) {

            async function fetchData() {
                try {
                    console.log(user.id)
                    const { data } = await Axios_instance.get(`/users?id=${user.id}`)
                    const cartData = data[0].cart
                    setCartItems(cartData)
                    setCartItemsCount(
                        cartData.map((item) => ({
                            id: item.productId,
                            count: item.productQuantity,
                            productPrice: item.productPrice
                        }))
                    );
                    setSubTotal(cartData.reduce((sum, item) => sum += item.productPrice * item.productQuantity, 0))
                    console.log(cartData)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        }

    }, [cartItems])




//________Add_To_Cart__________


    const addToCart = async ({ productId, name, price, image }) => {


        try {
            
            if (user.id) {
                const userResponse = await Axios_instance.get(`users/${user.id}`)
                const userData = userResponse.data


                if (userData.cart.find((item) => item.productId == productId)) {
                 const updatedItemQuantity=userData.cart.map((item)=>{
                        return {...item,productQuantity:item.productQuantity+1}     
                    })
                     const UpdatedCart = await Axios_instance.patch(`/users/${user.id}`, { cart: updatedItemQuantity })
                     toast.success("Quantity Updated")
                     
                    } else {
                        
                        const cart = [...userData.cart, { productId: productId, productName: name, productPrice: price, productImage: image, productQuantity: 1 }]
                        setCartItems(cart)
                        const userUpdated = { ...userData, cart }

                    console.log(userUpdated)
                    const cartUpdated = await Axios_instance.put(`/users/${user.id}`, userUpdated)
                    
                    toast.success("Added to cart!");
                    
                }
            } else {
                toast.error("Login First")
                navigate('/login')
            }


        } catch (e) {
            console.log(e)
        }
    }





//________UpdateQuantity_____________


    const updateQuantity = async (id, type) => {
        const updatedCartItemsCount = cartItemCount.map((item) =>
            item.id === id
                ? { ...item, count: type === "increase" ? item.count + 1 : Math.max(1, item.count - 1) }
                : item
        );
        setCartItemsCount(updatedCartItemsCount);

        const subtotal = updatedCartItemsCount.reduce((sum, item) => sum + item.productPrice * item.count, 0);
        setSubTotal(subtotal);


        try {
            const { data } = await Axios_instance.get(`/users/${user.id}`);
            const cartData = data.cart ?? data[0]?.cart;

            if (!cartData) throw new Error("Cart data not found");


            const updatedQuantity = cartData.map((item) => {
                const cartItem = updatedCartItemsCount.find((c) => c.id === item.productId);

                return item.productId === id ? { ...item, productQuantity: cartItem ? cartItem.count : item.productQuantity }
                    : item;
            });

            const UpdatedCart = await Axios_instance.patch(`/users/${user.id}`, { cart: updatedQuantity })
            console.log(UpdatedCart)

        }
        catch (e) { }

        console.log(cartItemCount)
    }



//______Remove_Item_From_Cart___________



    const removeItem = async (id) => {
        try {
            const { data } = await Axios_instance.get(`/users/${user.id}`);
            const cartData = data.cart ?? data[0]?.cart;

            if (!cartData) {
                throw new Error("Cart data not found");
            }
            const filteredCart = cartData.filter((item) => item.productId != id)
            setCartItems(filteredCart)
            const updatedCart = await Axios_instance.patch(`/users/${user.id}`, { cart: filteredCart })
            toast.success("Item Removed ")
        }
        catch (e) { }

        console.log(cartItemCount)
    }




 return (<CartContext.Provider value={{  addToCart, removeItem, updateQuantity, cartItems, cartItemCount, subTotal }}>
    {children}
  </CartContext.Provider>)
   
}