const Product = require("../models/Product");
const Brand = require("../models/Brand");

const createProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      desc,
      price,
      discount,
      color,
      category,
      size,
      gender,
      qty,
      brand,
    } = req.body;

    if (
      !image ||
      !title ||
      !desc ||
      !price ||
      !discount ||
      !color ||
      !category ||
      !size ||
      !gender ||
      !qty ||
      !brand
    ) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }

    const duplicate = await Product.findOne({ title });

    if (duplicate) {
      return res.status(400).json({ message: "Product Already Exists" });
    }

    const brandObj = await Brand.findOne({ _id: brand });

    const productObj = {
      image,
      title,
      desc,
      price,
      discount,
      color,
      category,
      size,
      gender,
      qty,
      brand,
    };

    const product = new Product(productObj);

    await product.save();

    if (product) {
      brand.products.push(product._id);

      await brand.save();

      res.status(200).json({ message: "PRODUCT ADDED" });
    }
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find({});

    if (!data?.length) {
      return res.status(400).json({ message: "NO PRODUCTS FOUND" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      id,
      image,
      title,
      desc,
      price,
      discount,
      color,
      category,
      size,
      gender,
      qty,
      brand,
    } = req.body;

    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(400).json({ message: "PRODUCT NOT FOUND" });
    }

    const duplicate = await Product.findOne({ title });

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "PRODUCT WITH THE SAME NAME ALREADY EXISTS" });
    }

    product.image = image;
    product.title = title;
    product.desc = desc;
    product.price = price;
    product.discount = discount;
    product.color = color;
    product.category = category;
    product.size = size;
    product.gender = gender;
    product.qty = qty;
    product.brand = brand;

    await product.save();

    res.status(200).json({ message: "PRODUCT UPDATED!" });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const del = await Product.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "PRODUCT DELETED SUCCESSFULY" });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
