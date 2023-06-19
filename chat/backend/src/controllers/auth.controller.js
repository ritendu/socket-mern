const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req, res)=>{
console.log('Hello World..')
})

module.exports = {register}