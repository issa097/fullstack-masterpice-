// const express = require("express");
// // const bodyParser = require("body-parser");

// const UserRouter = require("./routs/UserRouter");
// const ProductRouter = require("./routs/ProductRouter");
// const PaymentRouter = require("./routs/PaymenRouter");

// const CommentRouter = require("./routs/CommentRouter");
// // const CategoryRouter = require("./routs/CategoryRouter");
// // const PaymentRouter = require("../routs/PaymenRouter");
// const cors = require("cors");
// const app = express();
// const path = require("path");
// // app.use(bodyParser.json());

// app.use(express.json());
// app.use(cors());
// app.use(UserRouter);
// app.use(ProductRouter);
// app.use(PaymentRouter);
// app.use(CommentRouter);
// // app.use(CategoryRouter);
// // app.use(PaymentRouter);
// const port = 9000;
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const express = require("express");
const UserRouter = require("./routs/UserRouter");
const ProductRouter = require("./routs/ProductRouter");
const PaymentRouter = require("./routs/PaymenRouter"); // Corrected typo here
const CommentRouter = require("./routs/CommentRouter");
const CategoryRouter = require("./routs/CategoryRouter");
const WorkShopRouter = require("./routs/WorkShopRouter");
const ContactRouter = require("./routs/ContactRouter");
const BlogRouter = require("./routs/BlogRouter");
const workshop_bookings = require("./routs/workshop_bookingsRouter");
const RatingRouter = require("./routs/RatingRouter");

const cors = require("cors");
const app = express();
const path = require("path");   
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(UserRouter);
app.use(ProductRouter);
app.use(PaymentRouter);
app.use(CommentRouter);
app.use(CategoryRouter);
app.use(WorkShopRouter);
app.use(ContactRouter);
app.use(BlogRouter);
app.use(workshop_bookings);

app.use(RatingRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
