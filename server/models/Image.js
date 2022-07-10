const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    user: {
      name: { type: String, require: true },
      username: { type: String, require: true },
      _id: { type: mongoose.Types.ObjectId, require: true, index: true },
    },
    likes: [{ type: mongoose.Types.ObjectId }],
    public: { type: Boolean, require: true, default: false },
    key: { type: String, require: true },
    originalFileName: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("image", ImageSchema);
