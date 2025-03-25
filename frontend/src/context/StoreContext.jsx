import { createContext, useEffect, useState } from "react";
import axios from "axios"
// import { product_list } from '../assets/assets';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartProduct, setCartProduct] = useState({});
    const url = "https://luxe-backendfile.onrender.com/";
    const [token, setToken] = useState("");

    const [product_list, setProductList] = useState([]);

    // add to cart logic
    const addToCart = async (productId) => {
        if (!cartProduct[productId]) {
            setCartProduct((prev) => ({ ...prev, [productId]: 1 }))
        }
        else {
            setCartProduct((prev) => ({ ...prev, [productId]: prev[productId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { productId }, { headers: { token } });
        }
    }

    // remove to cart logic
    const removeToCart = async (productId) => {
        setCartProduct((prev) => ({ ...prev, [productId]: prev[productId] - 1 }))

        if (token) {
            await axios.post(url + "/api/cart/remove", { productId }, { headers: { token } })
        }
    }



    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartProduct) {
            if (cartProduct[item] > 0) {
                let productInfo = product_list.find((product) => product._id == item); // Use == for possible type conversion

                if (productInfo) { // Ensure productInfo exists before accessing price
                    totalAmount += productInfo.price * cartProduct[item];
                }
            }
        }

        return totalAmount;
    };



    // fetch product from database logic
    const fetchProductList = async () => {
        const response = await axios.get(url + "/api/product/list");
        setProductList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartProduct(response.data.cartData)
    }


    useEffect(() => {
        async function loadData() {
            await fetchProductList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])


    const contextValue = {
        product_list,
        cartProduct,
        setCartProduct,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider
