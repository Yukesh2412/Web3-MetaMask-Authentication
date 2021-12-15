const router = require("express").Router();
const Actor = require("../model/Actor");
const Web3Token = require("web3-token");

router.post("/register", async (req, res) => {
  const token = req.body.token;

  //verfying the address from token
  const { address, body } = await Web3Token.verify(token);
  // finding address already exists

  const addressExists = await Actor.findOne({ blockchain_address: address });
  if (addressExists !== null)
    return res.json({ message: "account already exists" });

  try {
    const new_actor = new Actor({
      blockchain_address: address,
    });
    await new_actor.save();
  } catch (err) {
    console.log(err);
  }

  res.send("registered");
});

router.post("/login", async (req, res) => {
  const token = req.body.token;

  try {
    const { address, body } = await Web3Token.verify(token);
    //checking where address already registered
    const isAddressRegistered = await Actor.findOne({
      blockchain_address: address,
    });
    if (isAddressRegistered) {
      return res.json({ message: "logged" });
    } else {
      return res
        .json({ message: "This is not a registered address" })
        .status(400);
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: "invalid token" });
  }
});

module.exports = router;
