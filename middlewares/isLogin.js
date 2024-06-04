const getTokenFromHeader = require('../utils/getTokenFromHeaders');
const verifyToken = require('../utils/verifyToken');
const { appErr } = require('../utils/appErr');

const isLogin = (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req);

    //verify the token
    const decodedUser = verifyToken(token);

    //save the user data in req.user
    req.userAuth = decodedUser.id;
    console.log('isLogin id is:', decodedUser.id);

    if (!decodedUser) {
        return next(appErr('Invalid/Expired token. Please login again', 500))
    } else {
        next();
    }
};

module.exports = isLogin;