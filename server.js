const express = require ('express');
const userRouter = require('./routes/user')
const productsRouter = require ('./routes/product')
const enquiriesRouter = require ('./routes/Enquiries')
const customerRouter = require ('./routes/customer')

const app = express();
const cors = require('cors');
const port = 6969;

app.use(cors())
//convert html to css
app.use(express.json())


//calling the routes
app.use('/users', userRouter)
app.use('/products',productsRouter)
app.use('/customers', customerRouter)
app.use('/enquiries',enquiriesRouter)




app.listen(port, () => {
    console.log("Listening.....")
})



