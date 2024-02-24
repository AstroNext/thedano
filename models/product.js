const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: Schema.Types.String, required: [true, 'Please enter product title'] },
    description: { type: Schema.Types.String },
    price: { type: Schema.Types.Number, required: [true, 'Please enter valid price'] },
    quantity: { type: Schema.Types.Number, required: true, default: 1 },
    discount: { type: Schema.Types.Number, default: 0 },
    images: [{ data: Schema.Types.Buffer, conntentType: Schema.Types.String }],
    date: { type: Schema.Types.Date, default: Date.now }
});

productSchema.statics.Add = async function({ title, description, price, quantity=1, discount=0, images }){
    let product = await this.create({ 
        title: title, 
        description: description, 
        price: price, 
        quantity: quantity, 
        discount: discount, 
        images: images 
    });
    return await product.save();
};

productSchema.statics.Delete = async function ({id}){
    return await this.deleteOne(id);
}

productSchema.statics.Edit = async function({ id, title, description, price, quantity = 1, discount = 0, images }){
    let product = await this.findOneById(id);
    if (product) {
        product.title = title;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.discount = discount;
        product.images = images;
        return await product.save();
    } else {
        return false;
    }
};

productSchema.statics.ReduceQuantity = async function({id}){
    let product = await this.findOneById(id);
    if (product) {
        product.quantity -= 1;
        return await this.save();
    } else {
        return 0;
    }
};

productSchema.statics.IncreaseQuantity = async function({id}){
    let product = await this.findOneById(id);
    if (product) {
        product.quantity += 1;
        return await this.save();
    } else {
        return 0;
    }
};

module.exports = mongoose.model("Product", productSchema);