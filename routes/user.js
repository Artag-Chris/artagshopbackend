const router = require('express').Router();
const User = require('../models/User');
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");

//update
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
            .toString();
    }

    try {
        const updatedUser = await User.findOneAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(201).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

//get one user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}
);
//get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await user.find().limit(5).sort({ _id: -1 }) : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}
);
//get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
              $project: {
                month: { $month: "$createdAt" },
              },
            },
            {
              $group: {
                _id: "$month",
                total: { $sum: 1 },
              },
            },
          ]);
          res.status(200).json(data)

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}
);
module.exports = router;