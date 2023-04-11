const express = require("express");

const boardRouter = express.Router();

const { BoardModel } = require("../Model/Boardmodel");


//---------------------------GET ROUTE-----------------//

boardRouter.get("/", async (req, res) => {
  try {
    const posts = await BoardModel.find();
    res.send(posts);
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error });
  }
});

//---------------------------POST ROUTE-----------------//

boardRouter.post("/createboard", async (req, res) => {
  const payload = req.body;
  try {
    const post = new BoardModel(payload);
    await post.save();
    res.send("Board has been created");
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error });
  }
});

//---------------------------UPDATE ROUTE-----------------//

boardRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    await BoardModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

//---------------------------DELETE ROUTE-----------------//

boardRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await BoardModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  boardRouter,
};