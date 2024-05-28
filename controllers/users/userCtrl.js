const User = require('../../model/User/User'); 
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');


// register
const userRegisterCtrl = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password
    } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.json({
                msg: 'User already exists'
            });
        }

        // Hacher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer un nouvel utilisateur
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        console.log('User created successfully');
        return res.json({
            status: 'succès',
            data: user
        });
    } catch (err) {
        console.log('Errr occurred:', err.message);
        return res.json({
            message: err.message
        });
    }
};

// login
const userLoginCtrl = async(req, res) => {
    const { email, password } = req.body;
    try{
        // check id email exist
        const userFound = await User.findOne({ email });

        if(!userFound){
            return res.json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }

        // validate password
        const isPasswordMatch = await bcrypt.compare(password, userFound.password);

        if(!isPasswordMatch){
            return res.json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }

        res.json({
            status: 'success',
            data: {
                firstname: userFound.firstname,
                lastname: userFound.lastname,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                token: generateToken(userFound._id)
            },
        })
    } catch(err){
        res.json({
            message: err.message
        })
    }
};

// get one user(Profile)
const userGetOneCtrl = async(req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id);
        res.json({
            status: 'success',
            data: user
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
}

// get all user
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


// update user
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

// delete user
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


// logout
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

// export
module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    userGetOneCtrl,
    userGetAllCtrl,
    updateUserCtrl,
    deleteUserCtrl,
    userLogoutCtrl
}