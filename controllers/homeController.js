const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users.model');

const { APP_SECRET } = process.env;

const createToken = (id)=>{
    return jwt.sign({id}, APP_SECRET, {expiresIn: '7 days'});
};

const registerView = (req, res, next)=>{
    res.render('register', {
        layout: 'layouts/reg-log-layouts',
        title: 'Register Page'
    });
}

const loginView = (req, res, next)=>{
    res.render('login', {
        layout: 'layouts/reg-log-layouts',
        title: 'Login Page'
    });
}

const registerCreate = async(req, res, next)=>{
    try{
        const { email, password } = req.body;
        console.log(req.body);
        if (!email){
            throw{
                message: `email must be valid`,
                code: 400,
                error: `bad request`,
            };
        }
        
        if(!password || password.length < 8){
            throw{
                message: `password min length 8 character`,
                code: 400,
                error: `bad request`,
            };
        }

        const isExist = await User.findOne({
            where: {
                email,
            },
        });

        if(isExist){
            throw{
                message: `user already exists`,
                code: 400,
                error: `bad request`,
            };
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await User.create({
            email,
            password: passwordHash,
        });

        const token = await createToken(user.id);

        return res.status(301).redirect('/login');
    }catch(error){
        next(error);
    }
};

const loginCreate = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      if (!email) {
        throw {
          message: `email must be valid`,
          code: 400,
          error: `bad request`,
        };
      }
  
      if (!password || password.length < 8) {
        throw {
          message: `password min length 8 character`,
          code: 400,
          error: `bad request`,
        };
      }
  
      const isExist = await User.findOne({
        where: {
          email,
        },
      });
  
      if (!isExist) {
        throw {
          message: `User Not Found`,
          code: 404,
          error: `bad request`,
        };
      }
  
      const isMatch = await bcrypt.compare(password, isExist.password);
  
      if (!isMatch) {
        throw {
          message: `Wrong Password`,
          code: 404,
          error: `bad request`,
        };
      }
  
      const token = await createToken(isExist.id);
  
      return res.status(301).redirect('/dashboard');
    } catch (error) {
      next(error);
    }
  };

const indexView = (req, res, next)=>{
    res.render('home', {
        layout: 'layouts/main-layouts',
        title: 'Dashboard'
    });
}

const aboutView = (req, res, next)=>{
    res.render('about', {
        layout: 'layouts/main-layouts',
        title: 'About Page'
    });
}

const userView = (req, res, next)=>{
    res.render('user', {
        layout: 'layouts/main-layouts',
        title: 'User Page'
    });
}


module.exports = {
    registerView, loginView, registerCreate, loginCreate, indexView, aboutView, userView
}