const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    console.log("BODY:", req.body);
console.log("HEADERS:", req.headers);
console.log("USER:", req.user);
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
      });
    }

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
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("user", "name email")
      .populate("items.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
     cart.items = cart.items.filter(item => item.product !== null);

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

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

const updateCartQuantity = async (req, res) => {
  try {
    const { action } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart.items = cart.items.filter(
          (i) => i.product.toString() !== req.params.productId
        );
      }
    }

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
};