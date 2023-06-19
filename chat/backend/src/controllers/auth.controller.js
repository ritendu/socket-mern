const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service")
const tokenService = require("../services/token.service");

const register = catchAsync(async (req, res)=>{

        const user = await authService.register(req.body);
      
        if (user) {
          const tokens = await tokenService.generateAuthTokens(user);
          return res.status(201).send({
            serverResponse: {
              code: 201,
              message: 'User Sucessfully registered.',
            },
            result: {
              data: user,
              tokens: {
                accessToken: tokens.access.token,
                refreshToken: tokens.refresh.token,
              },
            },
          });
        }

})

module.exports = {register}