const router = require("express").Router();
const Actor = require("../model/Actor");
const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;
const jwt = require("jsonwebtoken");
const SHA_256 =
  "7419bdb1d6689a4bcc1d6a2ef82eba13bee46961866bf304497c2a6e85fb08b9";

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // finding email already exists
  const emailExists = await Actor.findOne({ email: email });
  if (emailExists !== null)
    return res.json({ message: "email already exists" });

  await bcrypt.genSalt(10, async function (err, salt) {
    if (err) return res.json(err);

    const hashpwd = await bcrypt.hash(password, salt);
    try {
      const new_actor = new Actor({
        id: uuid(),
        email: email,
        password: hashpwd,
      });
      await new_actor.save();

      //jwt generate
      const token = generateJWT(new_actor.id);
      res.header("auth-token", token).json({ message: token });
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const actor = await Actor.findOne({ email: email });
  if (!actor)
    return res
      .json({ message: "This is not a registered email address" })
      .status(400);

  try {
    const validPass = await bcrypt.compare(password, actor.password);
    if (!validPass)
      return res.json({ message: "Email or Password is invalid." });

    const token = generateJWT(actor.id);

    return res
      .header("auth-token", token)
      .json({ message: token, status: "logged" });
  } catch (err) {
    console.log(err);
  }
});

function generateJWT(userid) {
  return jwt.sign({ id: userid }, SHA_256, { expiresIn: "1d" });
}

module.exports = router;
