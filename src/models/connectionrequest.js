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
        values:  ["ignore", "accepted" , "interested", "rejected"],
        message: `{VALUE} is incorrect data type`
    }
 }
},
{
timestamps:true
});

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

const connectionRequestModel = new mongoose.model(
    "connectionrequest", connectionRequestSchema
);
module.exports = connectionRequestModel;