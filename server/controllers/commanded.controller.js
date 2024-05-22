const Commande = require('../models/Commande.model');
const Product = require('../models/product.model');


exports.addToCart = async (req, res) => {
  const {productId, userId = null, amount,} = req.body;

  try {
    let commande = await Commande.findOne({userId});

    if (!commande) {
      if (!userId) {
        return res.status(400).json({message: 'userId is required'});
      }
      commande = new Cart({userId, items: []});
    }

    const existingItem = commande.items.find(item => item.productId.toString() === productId);


    if (flag === 'del') {
      commande.items = commande.items.filter(item => item.productId.toString() !== productId);
    } else if (flag === 'dec') {
      if (existingItem) {
        existingItem.amount = Math.max(existingItem.amount - 1, 1);
      }
    } else if (flag === 'inc') {
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        commande.items.push({productId, amount: 1});
      }
    }

    await commande.save();
    res.status(200).json(commande);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal server error', error: err.message});
  }
};
