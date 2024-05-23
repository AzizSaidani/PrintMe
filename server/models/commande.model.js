const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
  status: {type: String, default: 'en cours'},
  payment: {type: String},

  items: [
    {
      productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
      amount: {type: Number, required: true, default: 1},
      imagePath: {type: String},
    }
  ]


});
const Commande = mongoose.model('Commande', commandeSchema);
module.exports = Commande
