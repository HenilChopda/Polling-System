const mongoose = require("mongoose");

const PollOptionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },

  votes: {
    type: Number,
    default: 0,
  },
  percentage: {
    type: Number,
    default: 0,
  },
});

const PollSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
  question: {
    type: String,
    required: [true, "A Poll must have a Question"],
    unique: true,
    trim: true,
  },
  options: {
    type: [PollOptionSchema],
    validate: {
      validator: function (options) {
        // Ensure there are at least 1 option
        return options.length >= 2;
      },
      message: "A Question must have at least one Option",
    },
    required: [true, "A Question must have Options"],
  },
});

PollOptionSchema.pre("save", function (next) {
  const totalVotes = this.parent().options.reduce(
    (sum, option) => sum + option.votes,
    0
  );
  this.percentage = totalVotes === 0 ? 0 : (this.votes / totalVotes) * 100;
  next();
});

const Polls = mongoose.model("Poll", PollSchema);
module.exports = Polls;
