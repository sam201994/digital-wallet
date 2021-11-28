import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	username: { type: String, required: true },
	password: { type: String,  required: true},
	wallet: {
		value: {type: Number, default: 500000}
	},
	bitcoin: {
		amount: {type: Number, default: 0},
		value: {type: Number, default: 0}
	}

})

export default mongoose.model('User', userSchema)