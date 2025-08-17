
import { useNavigate } from "react-router-dom"
import Axios_instance from "../api/axiosConfig"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const useCartActions = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([])
    const [cartItemCount, setCartItemsCount] = useState([{ id: "", count: 1, productPrice: 0 }])
    const [subTotal, setSubTotal] = useState(0)
    const { user } = useContext(AuthContext)





    const addToCart = async ({ productId, name, price, image }) => {


        try {
            const user = JSON.parse(localStorage.getItem("user")) || ""
            const user_id = user.id
            if (user_id) {
                const userResponse = await Axios_instance.get(`users/${user_id}`)
                const userData = userResponse.data



                if (userData.cart.find((item) => item.productId == productId)) {
                    alert("Item Already In Cart")
                } else {

                    const cart = [...userData.cart, { productId: productId, productName: name, productPrice: price, productImage: image, productQuantity: 1 }]
                    const userUpdated = { ...userData, cart }

                    console.log(userUpdated)
                    const cartUpdated = await Axios_instance.put(`/users/${user_id}`, userUpdated)
                }
            } else {
                alert("Login First")
                navigate('/login')
            }


        } catch (e) {
            console.log(e)
        }
    }






    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")) || ""
        const user_id = user.id
        if (user_id) {

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

    }, [])


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
            const cartData = data.cart ?? data[0]?.cart; // ✅ fix undefined

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


    const removeItem = async (id) => {
        try {
            const { data } = await Axios_instance.get(`/users/${user.id}`);
            const cartData = data.cart ?? data[0]?.cart;

            if (!cartData) throw new Error("Cart data not found");

            const filteredCart = cartData.filter((item) => item.productId != id)

            const updatedCart = await Axios_instance.patch(`/users/${user.id}`, { cart: filteredCart })
            console.log(updatedCart)
            setCartItems(filteredCart)
        }
        catch (e) { }

        console.log(cartItemCount)
    }


    return { addToCart, removeItem, updateQuantity, cartItems, cartItemCount, subTotal }
}