const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: {type:String, required:true},
  cost: {type:Number, required:true},
  quantity:{type:Number, required:true}
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
