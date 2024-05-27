const userRegisterCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'User registered successfully'
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
};

const userLoginCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'User login successfully'
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
};

const userGetOneCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'Profile fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
}

const userGetAllCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'all User fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
};

const updateUserCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'Profile update successfully'
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
};

const deleteUserCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'Profile delete successfully'
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
};

const userLogoutCtrl = async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'User logout successfully'
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
}

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    userGetOneCtrl,
    userGetAllCtrl,
    updateUserCtrl,
    deleteUserCtrl,
    userLogoutCtrl
}