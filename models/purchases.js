const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  time:{ type:Date, default:Date.now, required:true},
  status: { type:Boolean, required:true},
})

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
