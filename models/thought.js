const {Schema, model, types} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId(),
    },
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280,
    },
    username:{
        type:String,
        required: true,
    },
    createdAt:{
        type: Date,
        default:Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
},
{toJson:{
    getters:true,
},
id: false,
});
ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});
const thought = model("Thought", ThoughtSchema);
module.exports = thought;