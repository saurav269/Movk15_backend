const express = require("express");
const { AddModel } = require("../Model/addTaskmodel");
const addRouter = express.Router();


//---------------------------GET ROUTE-----------------//

addRouter.get("/", async (req, res) => {
  try {
    const posts = await AddModel.find();
    res.send(posts);
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error });
  }
});

//---------------------------POST ROUTE-----------------//

addRouter.post("/addtask", async (req, res) => {
  const payload = req.body;
  try {
    const post = new AddModel(payload);
    await post.save();
    res.send("Task added successfully");
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error });
  }
});
//---------------------------UPDATE ROUTE-----------------//

addRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    await AddModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

//---------------------------DELETE ROUTE-----------------//

addRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await AddModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  addRouter,
}