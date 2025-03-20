import productModel from "../models/productModel.js";
import fs from 'fs'

// add product

const addProduct = async (req, res) => {

    let image_filemane = `${req.file.filename}`;

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filemane

    })

    try {
        await product.save();
        res.json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "something Wrong" })
    }

}

// all products list
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "something Wrong" })
    }
}

// remove products

const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, () => { });

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: " Remove Product" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "something Wrong" })
    }
}


export { addProduct, listProduct, removeProduct }