const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@goodhead.s69uz.mongodb.net/GoodHeadApp?retryWrites=true&w=majority`, ()=> {
  console.log('connected to mongodb')
})

