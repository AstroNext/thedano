const mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: Schema.Types.String, required: false },
    phonenumber: { type: Schema.Types.Number, required: [true, 'Please enter your phonenumber!'] },
    password: { type: Schema.Types.String, required: [true, 'Please enter strong password!'] },
    token: Schema.Types.String,
    tokenExpiration: Schema.Types.Date,
    addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
    date: { type: Schema.Types.Date, default: Date.now },
    cart: {
        items :[{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity : { type: Schema.Types.Number, required: true }
        }]
    }
});

userSchema.statics.add = async function({ inputEmail, inputPhonenumber, inputPassword }) {
    const salt = await Bcrypt.genSalt(10);
    const encryptedPass = await Bcrypt.hash(inputPassword, salt);
    var user = await this.create({ email: inputEmail, phonenumber: inputPhonenumber, password: encryptedPass, cart: { items: [] } });
    return await user.save();
};

userSchema.statics.byToken = async function({ token }) {
    var user = await this.findOne({ token: token });
    if (user) {
        if (Date.now() + 3600000 > user.tokenExpiration) {
            return [true, user];
        } else {
            return [false, false];
        }
    } else {
        return [false, false];
    }
};

userSchema.statics.login = async function({ username, password }) {
    var user = await this.findOne({ email: username }) ? await this.findOne({ email: username }) : await this.findOne({ phonenumber: username });
    if (user) {
        return await Bcrypt.compare(password, user.password) ? [true, true, "Success", user] : [true, false, "Password is is not correct!"];
    } else {
        return [false, false, "Email/Phonenumber is invalid!"];
    }
};

userSchema.statics.generateToken = async function({ email, phonenumber }) {
    var user = await this.findOne({ email: email }) ? await this.findOne({ email: email }) : await this.findOne({ phonenumber: phonenumber });
    user.token = uuidv4();
    user.tokenExpiration = Date.now() + 3600000;
    return [user.save(), user.token];
}

userSchema.methods.changePassword = async function({ token, oldPassword, newPassword }) {
    var user = this.findOne({ token });
    if (user) {
        let compare = await Bcrypt.compare(user.password, oldPassword);
        if (compare) {
            const salt = await Bcrypt.genSalt(10);
            user.password = await Bcrypt.hash(newPassword, salt);
            user = await user.save();
            return [true, true, user];
        } else {
            return [true, false, 'Password is not correct!'];
        }
    } else {
        return [false, false, 'Email/Phonenumber is invalid!'];
    }
};

userSchema.methods.addToCart = async function({product}) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuentity = 1;
    const updateCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuentity = this.cart.items[cartProductIndex] + 1;
        updateCartItems[cartProductIndex].quantity = newQuentity;
    } else {
        updateCartItems.push({
            productId: product._id,
            quantity: newQuentity
        })
    }

    const updatedCarts = {
        items: updateCartItems
    }
    this.cart = updatedCarts;
    return this.save();
}

module.exports = mongoose.model("User", userSchema);