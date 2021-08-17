const mongoose = require('mongoose')
mongoose.connect(process.env.DBURL, {
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
