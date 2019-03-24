const db = require('../services/database'),
    Conversation = require('../models/conversation');

// The authentication controller.
let MessengerController = {};

MessengerController.createNewConversation = function (req, res) {
    if (!req.body.user1 || !req.body.user2) {
        res.status(406).json({message: 'Please provide 2 users'});
    } else {
        db.sync().then(() => {
            let newConversation = {
                user1: req.body.user1,
                user2: req.body.user2,
            };
            return Conversation.create(newConversation).then(() => res.status(201).json({message: 'Conversation created!'}));
        }).catch(function (error) {
            res.status(400).json({message: error});
        });
    }
};

MessengerController.getConversationList = function (req, res) {
    if (!req.body.user) {
        res.status(400).json({message: 'Error getting conversation list'});
    } else {
        Conversation.findAll({
            where: {
                $or: [{
                    User1: {
                        $eq: req.body.user
                    }
                }, {
                    User2: {
                        $eq: req.body.user
                    }
                }
                ]
            }
        }).then((conversations) => res.status(200).send(conversations)
        );
    }
};


module.exports = MessengerController;