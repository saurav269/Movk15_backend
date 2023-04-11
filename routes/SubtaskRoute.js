const express = require("express");
const { SubtaskModel } = require("../Model/subtaskModel");

const subtaskRouter = express.Router();

//---------------------------GET ROUTE-----------------//

subtaskRouter.get("/", async (req, res) => {
  try {
    const posts = await SubtaskModel.find();
    res.send(posts);
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error });
  }
});

//---------------------------POST ROUTE-----------------//

subtaskRouter.post("/createsubtask", async (req, res) => {
  const payload = req.body;
  try {
    const post = new SubtaskModel(payload);
    await post.save();
    res.send("Sub Task has been created");
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error });
  }
});

//---------------------------UPDATE ROUTE-----------------//

subtaskRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    await SubtaskModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

 //---------------------------DELETE ROUTE-----------------//
subtaskRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await SubtaskModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  subtaskRouter,
};