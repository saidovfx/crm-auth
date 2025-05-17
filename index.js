const express = require("express");
const mongoose = require("mongoose");
const cors =require("cors")
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());



app.use("/api/auth", require("./routes/auth"));
app.use('/api/register/student', require('./routes/resgisterStudent'));
app.use('/api/get/students',require("./Get/Students"))
app.use('/api/register/teacher',require("./routes/registerTeacher"))
app.use('/api/teacher/login',require("./routes/loginTeachers"))
app.use('/api/register/parent',require('./routes/registerParent'))
app.use('/api/parent/login',require('./routes/loginParent'))
app.use('/api/get/parent',require('./Get/Parents'))
app.use('/api/get/teacher',require('./Get/Teachers'))


app.use('/api/login', require('./routes/login'));



mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})
  .then(() => console.log("MongoDB ulandi"))
  .catch((err) => console.error("Mongo xatolik:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlayapti`));
