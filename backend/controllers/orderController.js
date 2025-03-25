import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "https://luxe-home-frontend.onrender.com/";

    try {
        const { userId, products, amount, address } = req.body;

        // Create a new order in the database
        const newOrder = new orderModel({
            userId,
            products,
            amount,
            address
        });

        await newOrder.save();

        // Clear the user's cart (assuming it's stored in `cart`)
        await userModel.findByIdAndUpdate(userId, { cart: [] });

        // Convert product prices to cents for Stripe
        const line_products = products.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100) // Convert to cents
            },
            quantity: item.quantity
        }));

        // Add fixed delivery charge (e.g., $20.00 -> 2000 cents)
        line_products.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2000 // 20 USD in cents
            },
            quantity: 1
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_products,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Order Placement Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { placeOrder };
