const express = require("express");
const bodyParser = require("body-parser");

const {
  NO_CONTENT,
  CREATE_STATUS,
  BAD_REQUEST_STATUS,
} = require("./config/responseStatus");

const app = express();
const PORT = process.env.PORT || 2000;

/** ======================================
 * config ต่างๆ
 * ==================================== */
const STATUS = ["todo", "doing", "done"];
let todos = [];
let id = 1;
/** =================================== */

/** =====================================
 * helper ลดโค้ดที่ทำซ้ำซ้อน
 * =================================== */
function getTodoById({ id }) {
  const todo = todos.find((todo) => todo.id.toString() === id.toString());

  return todo;
}
/** =================================== */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ดึง Todos ทั้งหมด
app.get("/todos", (_, res) => {
  return res.json({ success: true, todos });
});

// ดึง Todo จาก id
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = getTodoById({ id });

  if (!todo) {
    return res
      .status(BAD_REQUEST_STATUS)
      .json({ error: true, message: "Not found todo" });
  }

  return res.json({ success: true, todo });
});

// สร้าง Todo
app.post("/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res
      .status(BAD_REQUEST_STATUS)
      .json({ error: true, message: "Invalid parameters" });
  }

  const taskToCreate = { id, task, status: STATUS[0] };
  todos.push(taskToCreate);

  id++;

  return res.status(CREATE_STATUS).json({ success: true, todo: taskToCreate });
});

// ลบ Todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const newTodo = todos.filter((todo) => todo.id.toString() !== id.toString());
  const haveNotTodoToDelete = newTodo.length === todos.length;

  if (haveNotTodoToDelete) {
    return res
      .status(BAD_REQUEST_STATUS)
      .json({ error: true, message: "Not found todo to delete" });
  }

  todos = newTodo;

  return res.status(NO_CONTENT).json({ success: true });
});

// แก้ไข todo (อัพเดท status ได้ด้วย)
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;
  const isInvalidParameters =
    (!task || task.trim() === "") &&
    (!status || !STATUS.includes(status.toLowerCase()));

  if (isInvalidParameters) {
    return res.status(BAD_REQUEST_STATUS).json({
      error: true,
      message: "Invalid parameters",
    });
  }

  const todo = getTodoById({ id });
  if (!todo) {
    return res
      .status(BAD_REQUEST_STATUS)
      .json({ error: true, message: "Not found todo" });
  }

  let dataToReturn;
  todos.map((todo) => {
    if (todo.id.toString() === id.toString()) {
      todo.task = task && task !== "" ? task : todo.task;
      todo.status =
        status && STATUS.includes(status.toLowerCase())
          ? status.toLowerCase()
          : todo.status;
      dataToReturn = todo;
    }
  });

  return res.json({ success: true, todo: dataToReturn });
});

// Update status todo
app.patch("/todos/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const isInvalidParameters = !status || !STATUS.includes(status.toLowerCase());

  if (isInvalidParameters) {
    return res.status(BAD_REQUEST_STATUS).json({
      error: true,
      message: "Invalid parameters",
    });
  }

  const todo = getTodoById({ id });
  if (!todo) {
    return res
      .status(BAD_REQUEST_STATUS)
      .json({ error: true, message: "Not found todo" });
  }

  let dataToReturn;
  todos.map((todo) => {
    if (todo.id.toString() === id.toString()) {
      todo.status = status.toLowerCase();
      dataToReturn = todo;
    }
  });

  return res.json({ success: true, todo: dataToReturn });
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
