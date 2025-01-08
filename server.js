const express = require ('express');
const userRouter = require('./routes/user')
const productsRouter = require ('./routes/product')
const enquiriesRouter = require ('./routes/Enquiries')
const customerRouter = require ('./routes/customer')
const contactRouter = require ('./routes/contact')
const employeeRouter = require ('./routes/employee')
const taskRouter = require ('./routes/Task')
const salesRouter = require ('./routes/Sales')
// const analyticsRouter = require ('./routes/Analytics')
const customer_detailsRouter = require ('./routes/Customer_Details')

const app = express();
const cors = require('cors');
const port = 6969;

app.use(cors())
//convert html to json
app.use(express.json())



//calling the routes
app.use('/users', userRouter)
app.use('/products',productsRouter)
app.use('/customers', customerRouter)
app.use('/enquiries',enquiriesRouter)
app.use('/contact', contactRouter)
app.use('/employee',employeeRouter)
app.use('/task', taskRouter)
app.use('/sales',salesRouter)
// app.use('/analytics', analyticsRouter )
app.use('/customer_details', customer_detailsRouter)



app.listen(port, () => {
    console.log("Listening.....")
})



