
import express from "express" ;

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/abc", (req, res) => {
  res.send("Get ABC");
});

//thuc hien tien trinh thong qua port
app.listen(port, () => {
  console.log(`Running on port : ${port}`);
});
