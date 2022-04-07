const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
})
const User = mongoose.model('User', {
    name: { type: String, required: true },
    age: {
        type: Number, validate(val) {
            if (val < 0)
                throw new Error("Number must be positive")
        }
    },
    email:{
        type: String,
        required: true,
        trim:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Email is invalid")
            }
        }
    }
})
const me = new User({name:"abc",age:22, email:"aa"})
// const me = new User({ name: 'andrew', age: 27 })
me.save().then((me) => {
    console.log("me", me)
}).catch((error) => {
    console.log("err", error);
})

// create model for task
// 1. create model with desc and completed field
// 2. create instance
// 3. save
// 4. test


const Task = mongoose.model('Task', {
    description: { type: String },
    completed: { type: Boolean }
})
const myTask = new Task({
    description: 'Leaning the mongoose library',
    completed: true
})
myTask.save().then((myTask) => {
    console.log("me", myTask)
}).catch((error) => {
    console.log("err", error);
} )