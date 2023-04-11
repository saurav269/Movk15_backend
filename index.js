  

  const express = require("express");

  const { connection } = require("./db");


  const cors = require("cors");
const { userRouter } = require("./routes/userRoute");
const { Auth } = require("./middlewares/authMiddlewares");
const { boardRouter } = require("./routes/boardRoute");
const { taskRouter } = require("./routes/taskRoute");
const { subtaskRouter } = require("./routes/SubtaskRoute");
const { addRouter } = require("./routes/addTaskRoute");
  
  const app = express();
  app.use(express.json());
  app.use(cors());
  
  app.get("/", (req, res) => {
    res.send("Welcome Board");
  });
  
  app.use("/user", userRouter);
  app.use(Auth);

  app.use("/board", boardRouter);

  app.use("/task", taskRouter);

  app.use("/subtask", subtaskRouter);

  app.use("/add",addRouter)
  
  
  
  app.listen(7700, async() =>{

    try{   
        await connection
        console.log("Server is running on port 7700")
    }catch(err){
        console.log(err)
    }

 })