const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    state: { type: Schema.Types.String, required: true },
    city: { type: Schema.Types.String, required: true },
    address: { type: Schema.Types.String, required: true },
    plaque: { type: Schema.Types.Number, required: true, },
    postcode: { type: Schema.Types.Number, required: true, },
    unit: { type: Schema.Types.Number, required: true, },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
    date: { type: Schema.Types.Date, default: Date.now }
});

addressSchema.statics.Add = async function(userToken, inputState, inputCity, inputAddress, inputPlaqe, inputPostcode, inputUnit){
    var user = await User.findOne({ token: userToken });
    if (user) {
        var address = await this.create({ 
            state: inputState,
            city: inputCity,
            address: inputAddress,
            plaque: inputPlaqe,
            postcode: inputPostcode,
            unit: inputUnit,
            userId: user
        })
        var saved = await address.save()
        if (saved) {
            user.addresses.push(address);
            user.save();
            return saved;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

addressSchema.statics.Delete = async function(addressId){
    var address = await this.findById(addressId).populate('userId');
    if (address) {
        var addressIndex = address.userId.addresses.indexOf(addressId);
        if (addressIndex > -1) {
            address.userId.addresses.splice(addressIndex, 1);
            let res = await address.userId.save();
            if (res) {
                return await this.deleteOne({_id: address._id});
            } else {
                return 0;
            }
        }
    } else {
        return 0;
    }
};

addressSchema.statics.Edit = async function(addressId, inputState, inputCity, inputAddress, inputPlaqe, inputPostcode, inputUnit){
    var address = await this.findById(addressId);
    if (address) {
        address.state = inputState;
        address.city = inputCity;
        address.address = inputAddress;
        address.plaque = inputPlaqe;
        address.postcode = inputPostcode;
        address.unit = inputUnit;
        return [true, await address.save()];
    } else {
        return [ false, 'Address not found' ];
    }
};

module.exports = mongoose.model("Address", addressSchema);