const User = require('../model/User/User');
const getTokenFromHeader = require('../utils/getTokenFromHeaders');
const verifyToken = require('../utils/verifyToken');
const { appErr } = require('../utils/appErr');

const isAdmin = async (req, res, next) => {
    try {
        // Get token from header
        const token = getTokenFromHeader(req);

        if (!token) {
            return next(appErr('Token not provided', 401));
        }

        // Verify the token
        const decodedUser = verifyToken(token);

        if (!decodedUser) {
            return next(appErr('Invalid token', 401));
        }

        // Save the user data in req.user
        req.userAuth = decodedUser.id;
        console.log('isAdmin id is:', decodedUser.id);

        // Find user in DB
        const user = await User.findById(decodedUser.id);

        if (!user) {
            return next(appErr('User not found', 404));
        }

        // Check if user is admin
        if (user.isAdmin) {
            return next();
        } else {
            return next(appErr('Access Denied, admin only', 403));
        }
    } catch (error) {
        return next(appErr(error.message, 500));
    }
};

module.exports = isAdmin;
