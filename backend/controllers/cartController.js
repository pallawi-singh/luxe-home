import userModel from "../models/userModel.js"


// add product to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData exists

        if (!cartData[req.body.productId]) {
            cartData[req.body.productId] = 1;
        } else {
            cartData[req.body.productId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { $set: { cartData } });

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



// remove product from cart
const removeToCart = async (req, res) => {
    try {
        console.log("User ID:", req.body.userId);
        console.log("Product ID:", req.body.productId);

        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData exists

        if (!cartData[req.body.productId] || cartData[req.body.productId] <= 0) {
            return res.status(400).json({ success: false, message: "No such product in the cart" });
        }

        cartData[req.body.productId] -= 1;

        // If quantity reaches 0, remove the product from the cart
        if (cartData[req.body.productId] === 0) {
            delete cartData[req.body.productId];
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { cartData } },
            { new: true }
        );

        console.log("Updated User Data:", updatedUser);

        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addToCart, removeToCart, getCart }