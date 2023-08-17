const {Thought, User} = require("../models");

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select:"-__v",
        })
        .select("-__v")
        .sort({_id: -1})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getThoughtByID({params}, res) {
        Thought.finOne({_id: params.id})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => {
            if (!dbThoughtData){
                return res.status(400).json({ message: "No thought with this id!"});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    
}