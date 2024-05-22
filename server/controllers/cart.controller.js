const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.addToCart = async (req, res) => {
  const {productId, flag, userId = null} = req.body;

  try {
    let cart = await Cart.findOne({userId});

    if (!cart) {
      if (!userId) {
        return res.status(400).json({message: 'userId is required'});
      }
      cart = new Cart({userId, items: []});
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (flag === 'del') {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    } else if (flag === 'dec') {
      if (existingItem) {
        existingItem.amount = Math.max(existingItem.amount - 1, 1);
      }
    } else if (flag === 'inc') {
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        cart.items.push({productId, amount: 1});
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal server error', error: err.message});
  }
};
exports.getCartItems = async (req, res) => {
  const {userId} = req.params;

  try {
    const cart = await Cart.findOne({userId}).populate('items.productId');

    if (!cart) {
      return res.status(404).json({message: 'Cart not found'});
    }

    const cartItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {product, amount: item.amount};
      })
    );

    res.status(200).json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal server error', error: err.message});
  }
};
