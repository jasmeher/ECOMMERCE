const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.route("/").get(getAllProducts).post(createProduct).patch(updateProduct);
router.route("/:id").delete(deleteProduct).get(getSingleProduct);
