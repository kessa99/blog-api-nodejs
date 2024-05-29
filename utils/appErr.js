// app error
const appErr = (message, statusCode) => {
    let err = new Error(message);
    err.statusCode = statusCode ? statusCode : 500;
    err.stack = err.stack;
    return err;
}

// Err class
class AppErr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode ? statusCode : 500;
        this.status = 'failed'
        this.stack = this.stack;
    }
}

module.exports = { appErr, AppErr };