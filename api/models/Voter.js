const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
    required: true,
  },
  poll: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true },

  option: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },
});

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
