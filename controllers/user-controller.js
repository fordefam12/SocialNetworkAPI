const { User, Thought } = require("../models");
const userController = {
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: "friends",
            select:"-__v",
        })
        .select("-__v")
        .sort({_id: -1})
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getUserById({ params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .populate({
            path: "friends",
            select: "-__v"
        })
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) {
                return res
                .status(400)
                .json({message: "no user found with this id "});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createUser({body}, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {
            new:true,
            runvalidators:true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(400).json({message: "no user found with this id"});
                return;
            }
            res.json(dbUserData);

        })
        .catch((err) => res.json(err));
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(400).json({message: "no user with this id"});
            }
            return Thought.deleteMany({_id: {$in: dbUserData.thoughts}});
        })
        .then(() => {
            res.json({message: "User and associated thoughts deleted"});
        })
        .catch((err) => res.json(err));
    },
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$addToSet: {friends:params.friendsId}},
            {new:true, runValidators:true}
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(400).json({message:"nouser with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
        },
        removeFriend({params}, res) {
            User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {friends:params.friendsId}},
                {new: true}
            )
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(400).json({message: "No user with this id"});
                }
                res.json(dbUserData)
            })
            .catch((err) => res.json(err));
        }
    };
module.exports = userController;
