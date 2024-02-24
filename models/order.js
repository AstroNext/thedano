const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    status: {},
    products: [{
        quantity: { type: Schema.Types.Number, required: true },
        price: { type: Schema.Types.Number, required: true },
        discount: {  type: Schema.Types.Number, required: false, default: 0 },
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
    }],
    user: {
        adress: { Type: Schema.Types.String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
});

module.exports = mongoose.model("Order", orderSchema);