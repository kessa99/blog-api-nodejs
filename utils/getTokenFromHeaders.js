const getTokenFromHeader = (req) => {
    const headerObj = req.headers;
    const authorizationHeader = headerObj['authorization'];
    
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        return token ? token : false;
    } else {
        return false;
    }
};

module.exports = getTokenFromHeader;