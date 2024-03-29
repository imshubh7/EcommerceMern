import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { Configuration, OpenAIApi } from "openai";

//@desc Fetch all products
//@route GET /api/products
//@acces Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: "solve the equation x^2 + 2x + 17=0",
    temperature: 0.1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 1,
  });
  console.log(response.data);
  res.json(response.data.choices[0].text);
});

//@desc Fetch single products
//@route GET /api/products/:id
//@acces Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Delete a product
//@route DELETE /api/products/:id
//@acces Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Create a product
//@route POST /api/products
//@acces Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/pic.jpj",
    brand: "Sample brand",
    category: "Sample library",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Update a product
//@route PUT /api/products
//@acces Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();

    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
