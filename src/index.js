const express = require("express");
const movies = require("./users/user.router");

const app = express();

app.use(express.json());
movies(app);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
