const express = require ('express');
const userRouter = require('./routes/user')
const app = express();
const cors = require('cors');
const port = 6969;

app.use(cors())
//convert html to css
app.use(express.json())



//calling the routes
app.use('/users', userRouter)

app.listen(port, () => {
    console.log("Listening.....")
})



