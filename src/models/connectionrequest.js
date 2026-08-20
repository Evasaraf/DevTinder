const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
 fromUserId: {
     type : mongoose.Schema.Types.ObjectId,
     required: true
 },
 toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required: true
 },
 status: {
    type: String,
    enum: {
        values:  ["ingore", "accepted" , "interested", "rejected"],
        message: `{VALUE} is incorrect data type`
    }
 }
},
{
timestamps:true
});

const connectionRequestModel = new mongoose.model(
    "connectionrequest", connectionRequestSchema
);
module.exports = connectionRequestModel;