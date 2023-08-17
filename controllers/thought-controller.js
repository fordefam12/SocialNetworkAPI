const { Thought, User } = require("../models");
const { db } = require("../models/user");

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  getThoughtByID({ params }, res) {
    Thought.finOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(400).json({ message: "No thought with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbuserData) => {
        if (!dbuserData) {
          return res
            .status(400)
            .json({ message: "thought created but no user with this id" });
        }
        res.json({ message: "thought successfully created" });
      })
      .catch((err) => res.json(err));
  },
  UpdateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(400).json({ message: "no thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(400).json({ message: "no thought with this id" });
        }
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((dbuserData) => {
        if (!dbuserData) {
          return res
            .status(400)
            .json({ message: "thoughtcreated but no user with this id" });
        }
        res.json({ message: "thought succesfully deleted" });
      })
      .catch((err) => res.json(err));
  },
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then((dbThoughtData)=> {
        if(!dbThoughtData){
            res.status(400).json({message:"no thought with this id"});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
  },
  removeReaction({params}, res){
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$pull: { reactions: {reactionId: params.reactionId}}},
        {new:true},
    )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err));
  },
};
module.exports = thoughtController;
