const { Schema, model, Types,} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJson: {
      getters: true,
    },
    id: false,
  }
);
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "thought is required",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJson: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
ThoughtSchema.virtual("ReactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model("Thought", ThoughtSchema);
module.exports = Thought;
