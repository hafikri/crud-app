require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes');
const sequelize = require('./models/sequelize');

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(homeRoutes.routes);

sequelize
.authenticate()
.then(()=>{
    console.log('connect');
})
.catch((error)=>{
    console.log('error');
});

app.use((err, req, res, next) => {
    console.log(err);
    const { message, code = 500, error = "internal server error" } = err;
  
    return res.status(code).json({
      message,
      code,
      error,
    });
  });

// app.get('/', (req, res)=>{
//     res.render('index',{
//         layout: 'layouts/main-layouts'
//     });
// });

app.listen(port, ()=>{
    console.log(`Applikasi sedang berjalan di port ${port}`);
});