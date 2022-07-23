import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// const patientSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Please enter your name'],
//     },
//     // email: {
//     //     type: String,
//     //     unique: [true, 'Email already exists'],
//     //     required: [true, 'Please enter email'],
//     // },
//     // password: {
//     //     type: String,
//     //     required: [true, 'Please enter password'],
//     // },
//     // phone: {
//     //     type: String,
//     // },
//     // address: {
//     //     type: String,
//     // },
//     sex: {
//         type: String,
//     },
//     birthdate: {
//         type: String,
//     },
//     age: {
//         type: String,
//     },
//     bloodgroup: {
//         type: String,
//     },
// });


// patientSchema.pre('save', async function (next) {
//     const salt = await bcryptjs.genSalt(10);
//     this.password = await bcryptjs.hash(this.password, salt);
//     next();
// });
// patientSchema.methods.checkPassword = async function (password) {
//     const isMatch = await bcryptjs.compare(password, this.password);
//     return isMatch;
//   };
// patientSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign(
//       { _id: this._id, role: 'patient', name: this.name },
//       process.env.JWT_KEY,
//       { expiresIn: process.env.JWT_EXPIRES_IN }
//     );
//     return token;
// };

// export default mongoose.model('Patient', patientSchema);



const patientSchema = new mongoose.Schema({
    name: String,
    image: String,
    contact: Number,
    
    
    description: String,
    sex: String
    
});

export default mongoose.model('Patient', patientSchema);