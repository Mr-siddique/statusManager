const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/posts")
const userRoutes = require("./routes/users")

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", postRoutes);
app.use('/user',userRoutes);





// mongodb connection
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb+srv://allmemories:allmemories123@cluster0.fspvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))).catch(error => console.log(error));
mongoose.set('useFindAndModify', false);