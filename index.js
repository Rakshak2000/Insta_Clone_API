const express = require('express')
const app = express()
require("./models/db")


app.use(express.json())

//middlewares to connect 
app.use(require("./routes/auth"))
app.use(require('./routes/post'))
app.use(require("./routes/user"))






const PORT = 3000
app.listen(PORT, () => console.log(`SERVER IS RUNNING AT ${PORT}`))