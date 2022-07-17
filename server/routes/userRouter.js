const Router = require("express");
const userRouter = Router();
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const Image = require("../models/Image");

userRouter.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  try {
    if (password.length < 6)
      throw new Error("비밀번호를 6자 이상으로 해주세요");
    if (username.length < 3)
      throw new Error("username은 3자 이상으로 해주세요");
    const hashedPassword = await hash(password, 10);
    const user = await new User({
      name,
      username,
      hashedPassword,
      sessions: [{ createdAt: new Date() }],
    }).save();
    const session = user.sessions[0];
    res.json({
      message: "user registered",
      sessionId: session._id,
      name: user.name,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.patch("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("입력하신 정보가 올바르지 않습니다.");
    const isValid = await compare(password, user.hashedPassword);
    if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다");
    user.sessions.push({ createdAt: new Date() });
    const session = user.sessions[user.sessions.length - 1];
    await user.save();
    res.json({
      message: "user validated",
      sessionId: session._id,
      name: user.name,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.patch("/logout", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { sessions: { _id: req.headers.sessionid } } }
    );
    res.json({ message: "user logout" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/me", async (req, res) => {
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    res.json({
      message: "success",
      sessionId: req.headers.sessionid,
      name: req.user.name,
      userId: req.user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/me/images", async (req, res) => {
  // 본인의 사진들만 리턴(public === false)
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    const images = await Image.find({ "user._id": req.user.id });
    console.log(images);
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = { userRouter };
