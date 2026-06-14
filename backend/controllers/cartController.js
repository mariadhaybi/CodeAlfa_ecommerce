const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }

    cart.items.push({
      product: productId,
      quantity,
    });

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    })
      .populate("user", "name email")
      .populate("items.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};