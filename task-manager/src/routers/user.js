const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCrendentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch ({ message: error }) {
    res.status(500).send({ error });
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch ({ message: error }) {
    res.status(500).send({ error });
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch ({ message }) {
    res.status(500).send({ error: message });
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = req.user;

    updates.forEach(update => (user[update] = req.body[update]));
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
    await user.save();

    if (!user) {
      res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch ({ message }) {
    res.status(500).send({ error: message });
  }
});

module.exports = router;
