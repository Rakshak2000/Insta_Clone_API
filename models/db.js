const { MONGO_URI } = require("../keys");
const mongoose = require('mongoose');


mongoose.connect(MONGO_URI)
.then((res)=>console.log("Database Connected!!!"))
.catch((err)=>console.log(err))
