import express from "express";
import cors from "cors";
import { mySchema, mySchemaId } from "./types.js";
import DataBaseSchema from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/todos", async function (req, res) {
  const allTodos = await DataBaseSchema.find({}).sort({ createdAt: "desc" });
  res.json({ allTodos });
});

//return all the todos from db
app.post("/todos", function (req, res) {
  const userInput = req.body;
  const parsedUserInput = mySchema.safeParse(userInput);

  if (!parsedUserInput.success) {
    res.json({
      msg: "Incorret title or Description",
    });
    return;
  }

  const Todo = new DataBaseSchema({
    title: userInput.title,
    description: userInput.description,
    completed: false,
  });

  Todo.save();

  res.status(201).json({
    msg: "Task Added Successfully",
  });
});

app.put("/completedTodo", async function (req, res) {
  const userId = req.body;
  const ParsedId = mySchemaId.safeParse(userId);
  if (!ParsedId.success) {
    return res.json({
      msg: "Incorrect Id",
    });
  }
  const validatedUserId = req.body.id;
  try {
    const CompletedTodo = await DataBaseSchema.findByIdAndUpdate(
      validatedUserId,
      {
        completed: true,
      }
    );
    CompletedTodo.save();
    return res.json({
      msg: "Todo Status Has Changeg To completed",
    });
  } catch (err) {
    if (err) {
      res.status(404).json({ msg: "Provided Id does not exists in Database" });
      return;
    }
  }
});

app.listen(3001, function () {
  console.log("Server is Listening on port 3001");
});
