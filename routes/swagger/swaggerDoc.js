const express = require('express');

const {
    userRegisterCtrl,
    userLoginCtrl,
    userProfileCtrl,
    userGetAllCtrl,
    updateUserCtrl,
    deleteUserAccountCtrl,
    userLogoutCtrl,
    profilePhototoUploadCtrl,
    whoViewMyProfileCtrl,
    followingCtrl,
    unFollowCtrl,
    blockUsersCtrl,
    unBlockUserCtrl,
    adminBlockUserCtrl,
    adminUnBlockUserCtrl,
    updatePassewordUserCtrl,
} = require('../../controllers/users/userCtrl');// Assurez-vous que le chemin vers le modèle User est correct


const {
    CreateCategoryPost,
    categoryGetOneCtrl,
    fetchCategoryCtrl,
    categoryUpdateCtrl,
    deleteCategoryCtrl,
} = require('../../controllers/category/categoryCtrl');


const {
    createpostCtrl,
    postGetOneCtrl,
    getAllPostCtrl,
    postUpdateCtrl,
    postDeleteCtrl,
    toogleLikePostCtrl,
    toogleDisLikePostCtrl,
    postDetailsCtrl,
} = require('../../controllers/posts/postCtrl');


const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Authentification
 *     description: Gestion de l'authentification des utilisateurs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *         profilePhoto:
 *           type: string
 *         password:
 *           type: string
 *         isBlocked:
 *           type: boolean
 *         isAdmin:
 *           type: boolean
 *         role:
 *           type: string
 *         viewers:
 *           type: array
 *           items:
 *             type: string
 *         followers:
 *           type: array
 *           items:
 *             type: string
 *         following:
 *           type: array
 *           items:
 *             type: string
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *         posts:
 *           type: array
 *           items:
 *             type: string
 *         blocked:
 *           type: array
 *           items:
 *             type: string
 *         userAward:
 *           type: string
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - role
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - role
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
userRouter.post('/registration/', userRegisterCtrl);



/**
 * @swagger
 * tags:
 *   - name: Authentification
 *     description: Gestion de l'authentification des utilisateurs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     isAdmin:
 *                       type: boolean
 *                     isBlocked:
 *                       type: boolean
 *                     role:
 *                       type: string
 *                     token:
 *                       type: string
 *       404:
 *         description: Invalid login credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', userLoginCtrl);



/**
 * @swagger
 * tags:
 *   - name: Utilisateurs
 *     description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Récupérer le profil de l'utilisateur
 *     tags: [Utilisateurs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profil utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé, utilisateur non authentifié
 *       500:
 *         description: Erreur interne du serveur
 */
userRouter.get('/profile/', isLogin, userProfileCtrl);



/**
 * @swagger
 * tags:
 *   - name: Utilisateurs
 *     description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/v1/users/all:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Utilisateurs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé, utilisateur non authentifié
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/all', isLogin, userGetAllCtrl);


/**
 * @swagger
 * tags:
 *   - name: Utilisateurs
 *     description: Gestion des utilisateurs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: First name of the user to update.
 *         lastname:
 *           type: string
 *           description: Last name of the user to update.
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user to update. Must be unique.
 */

/**
 * @swagger
 * /api/v1/users/update-account:
 *   put:
 *     summary: Mettre à jour les informations du compte utilisateur
 *     tags: [Utilisateurs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Informations utilisateur mises à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Erreur de validation des données
 *       401:
 *         description: Non autorisé, utilisateur non authentifié
 *       404:
 *         description: Utilisateur non trouvé ou email déjà pris
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/update-account', isLogin, updateUserCtrl);



/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PasswordUpdate:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           description: New password for the user account.
 *           minLength: 6
 *           example: LoveCode
 */

/**
 * @swagger
 * /api/v1/users/update-password:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordUpdate'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                   description: Success message indicating password change.
 *                   example: Password change successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */
userRouter.put('/update-password',isLogin , updatePassewordUserCtrl);


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfilePhotoUploadResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: string
 *           description: Success message indicating profile photo upload.
 *           example: Profile photo uploaded successfully
 *     ProfilePhotoUploadRequest:
 *       type: object
 *       required:
 *         - profile-based
 *       properties:
 *         profile-based:
 *           type: string
 *           format: binary
 *           description: Profile photo to upload (JPEG, JPG, PNG formats only).
 */

/**
 * @swagger
 * /api/v1/users/profile-photo-upload:
 *   post:
 *     summary: Upload profile photo for authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProfilePhotoUploadRequest'
 *     responses:
 *       200:
 *         description: Profile photo uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfilePhotoUploadResponse'
 *       400:
 *         description: Validation error or unsupported file type
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: User account is blocked, cannot perform action
 *       500:
 *         description: Internal server error
 */
userRouter.post('/profile-photo-upload', upload.single('profile-based'), isLogin, profilePhototoUploadCtrl);


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteUserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 *           description: Success message indicating user deletion.
 *           example: User deleted successfully
 */

/**
 * @swagger
 * /api/v1/users/delete/{id}:
 *   delete:
 *     summary: Delete user account
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUserResponse'
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: User account is blocked, cannot perform action
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.delete('/delete/:id', isLogin, deleteUserAccountCtrl);


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/v1/users/who-view-my-profile/{id}:
 *   get:
 *     summary: Track who viewed my profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID whose profile is being viewed.
 *     responses:
 *       200:
 *         description: Successfully tracked profile view
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: You have successfully viewed this profile
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: User not found or user already viewed the profile
 *       500:
 *         description: Internal server error
 */
userRouter.get('/who-view-my-profile/:id',isLogin , whoViewMyProfileCtrl);


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/v1/users/following/{id}:
 *   get:
 *     summary: Follow a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID of the user to follow.
 *     responses:
 *       200:
 *         description: Successfully followed the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: you have successfully followed this user
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: User not found or user already followed
 *       500:
 *         description: Internal server error
 */
userRouter.get('/following/:id',isLogin , followingCtrl);


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/v1/users/unfollow/{id}:
 *   get:
 *     summary: Unfollow a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID of the user to unfollow.
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: You have successfully unfollowed this user
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: User not found or user not followed
 *       500:
 *         description: Internal server error
 */
userRouter.get('/unfollow/:id',isLogin , unFollowCtrl);



/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/v1/users/block/{id}:
 *   get:
 *     summary: Block a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID of the user to block.
 *     responses:
 *       200:
 *         description: Successfully blocked the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: You have successfully blocked this user
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: User not found or user already blocked
 *       500:
 *         description: Internal server error
 */
userRouter.get('/block/:id',isLogin , blockUsersCtrl);


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/v1/users/unblocked/{id}:
 *   get:
 *     summary: Unblock a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID of the user to unblock.
 *     responses:
 *       200:
 *         description: Successfully unblocked the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: You have successfully unblocked this user
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: User not found or user not blocked
 *       500:
 *         description: Internal server error
 */
userRouter.get('/unblocked/:id',isLogin , unBlockUserCtrl);


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/v1/users/admin-block/{id}:
 *   get:
 *     summary: Block a user by admin
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID of the user to be blocked.
 *     responses:
 *       200:
 *         description: Successfully blocked the user by admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User has been successfully blocked by the admin
 *       401:
 *         description: Unauthorized, user not authenticated or not an admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/admin-block/:id',isLogin ,isAdmin , adminBlockUserCtrl);


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/v1/users/admin-unblock/{id}:
 *   get:
 *     summary: Unblock a user by admin
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID of the user to be unblocked.
 *     responses:
 *       200:
 *         description: Successfully unblocked the user by admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Admin has successfully unblocked this user
 *       401:
 *         description: Unauthorized, user not authenticated or not an admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/admin-unblock/:id',isLogin, isAdmin , adminUnBlockUserCtrl);



/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management
*/

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: html
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Successfully created a new category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: "6660b4471a85e6f2b8944d38"
 *                     title:
 *                       type: string
 *                       example: html
 *                     _id:
 *                       type: string
 *                       example: "6660dbaeded46a7a779ef9f2"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T21:42:06.234Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T21:42:06.234Z"
 *                 required:
 *                   - user
 *                   - title
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
*/
categoryRouter.post('/', isLogin, CreateCategoryPost);


/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management
 */

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6660dbaeded46a7a779ef9f2"
 *                     user:
 *                       type: string
 *                       example: "6660b4471a85e6f2b8944d38"
 *                     title:
 *                       type: string
 *                       example: html
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T21:42:06.234Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T21:42:06.234Z"
 *                   required:
 *                     - _id
 *                     - user
 *                     - title
 *                     - createdAt
 *                     - updatedAt
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.get('/:id',isLogin ,categoryGetOneCtrl);


/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management
 */

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6660dd96ecb84735db6b1dcf"
 *                       user:
 *                         type: string
 *                         example: "6660b4471a85e6f2b8944d38"
 *                       title:
 *                         type: string
 *                         example: Car
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-05T21:50:14.521Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-05T21:50:14.521Z"
 *                   required:
 *                     - _id
 *                     - user
 *                     - title
 *                     - createdAt
 *                     - updatedAt
 *       500:
 *         description: Internal server error
 */
categoryRouter.get('/', fetchCategoryCtrl);


/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management
 */

/**
 * @swagger
 * /api/v1/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *       - in: body
 *         name: body
 *         required: true
 *         description: Updated category information
 *         schema:
 *           type: object
 *           required:
 *             - title
 *           properties:
 *             title:
 *               type: string
 *               example: Love
 *     responses:
 *       200:
 *         description: Successfully updated the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6660dbaeded46a7a779ef9f2"
 *                     user:
 *                       type: string
 *                       example: "6660b4471a85e6f2b8944d38"
 *                     title:
 *                       type: string
 *                       example: Love
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T21:42:06.234Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T22:23:14.190Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Invalid request body or parameters
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.put('/:id',isLogin, categoryUpdateCtrl);

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management
 */

/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.delete('/:id',isLogin, deleteCategoryCtrl);


/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Operations related to posts
 */

/**
 * @swagger
 * /api/v1/posts/:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 description: ID of the category to which the post belongs
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully created a new post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: The World Cars
 *                     description:
 *                       type: string
 *                       example: Lorem ipsum dolor sit amet, consectetur adipiscing elit...
 *                     category:
 *                       type: string
 *                       example: 6660dd96ecb84735db6b1dcf
 *                     numViews:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     likes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     dislikes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     user:
 *                       type: string
 *                       example: 665ef38b693724e3e8356aca
 *                     _id:
 *                       type: string
 *                       example: 666100a58570095bbe9af881
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:19:49.384Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:19:49.384Z
 *                     __v:
 *                       type: number
 *                       example: 0
 *                     id:
 *                       type: string
 *                       example: 666100a58570095bbe9af881
 *                     numViewsCount:
 *                       type: number
 *                       example: 0
 *                     likesCount:
 *                       type: number
 *                       example: 0
 *                     dislikesCount:
 *                       type: number
 *                       example: 0
 *                     likePercentage:
 *                       type: string
 *                       example: "NaN%"
 *                     dislikePercentage:
 *                       type: string
 *                       example: "NaN%"
 *                     DAYSaGO:
 *                       type: string
 *                       example: Today
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid authentication token)
 *       500:
 *         description: Internal server error
 */
postRouter.post('/', isLogin, upload.single('image'), createpostCtrl);


/**
 * @swagger
 * /api/v1/posts/{id}:
 *   get:
 *     summary: Get a specific post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 666100a58570095bbe9af881
 *                     title:
 *                       type: string
 *                       example: The World Cars
 *                     description:
 *                       type: string
 *                       example: Lorem ipsum dolor sit amet...
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 6660dd96ecb84735db6b1dcf
 *                         title:
 *                           type: string
 *                           example: Car
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 665ef38b693724e3e8356aca
 *                         firstname:
 *                           type: string
 *                           example: David
 *                         lastname:
 *                           type: string
 *                           example: Chaka
 *                         email:
 *                           type: string
 *                           example: chaka@gmail.com
 *                         profilePhoto:
 *                           type: string
 *                           example: default.jpg
 *                     numViews:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     likes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     dislikes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:19:49.384Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:19:49.384Z
 *                     __v:
 *                       type: number
 *                       example: 0
 *                     numViewsCount:
 *                       type: number
 *                       example: 0
 *                     likesCount:
 *                       type: number
 *                       example: 0
 *                     dislikesCount:
 *                       type: number
 *                       example: 0
 *                     likePercentage:
 *                       type: string
 *                       example: "NaN%"
 *                     dislikePercentage:
 *                       type: string
 *                       example: "NaN%"
 *                     DAYSaGO:
 *                       type: string
 *                       example: Today
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
*/
postRouter.get('/:id', isLogin, postGetOneCtrl);

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 666100a58570095bbe9af881
 *                       title:
 *                         type: string
 *                         example: The World Cars
 *                       description:
 *                         type: string
 *                         example: Lorem ipsum dolor sit amet...
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 6660dd96ecb84735db6b1dcf
 *                           title:
 *                             type: string
 *                             example: Car
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 665ef38b693724e3e8356aca
 *                           firstname:
 *                             type: string
 *                             example: David
 *                           lastname:
 *                             type: string
 *                             example: Chaka
 *                           email:
 *                             type: string
 *                             example: chaka@gmail.com
 *                           profilePhoto:
 *                             type: string
 *                             example: default.jpg
 *                       numViews:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *                       comments:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *                       likes:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *                       dislikes:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-06T00:19:49.384Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-06T00:19:49.384Z
 *                       __v:
 *                         type: number
 *                         example: 0
 *                       numViewsCount:
 *                         type: number
 *                         example: 0
 *                       likesCount:
 *                         type: number
 *                         example: 0
 *                       dislikesCount:
 *                         type: number
 *                         example: 0
 *                       likePercentage:
 *                         type: string
 *                         example: "NaN%"
 *                       dislikePercentage:
 *                         type: string
 *                         example: "NaN%"
 *                       DAYSaGO:
 *                         type: string
 *                         example: Today
 *       500:
 *         description: Internal server error
 */
postRouter.get('/',isLogin ,getAllPostCtrl);

/**
 * @swagger
 * /api/v1/posts/likes/{id}:
 *   get:
 *     summary: Toggle like for a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Like toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 666100a58570095bbe9af881
 *                     title:
 *                       type: string
 *                       example: The World Cars
 *                     description:
 *                       type: string
 *                       example: Lorem ipsum dolor sit amet...
 *                     category:
 *                       type: string
 *                       example: 6660dd96ecb84735db6b1dcf
 *                     numViews:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     likes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "665ef38b693724e3e8356aca" ]
 *                     dislikes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     user:
 *                       type: string
 *                       example: 665ef38b693724e3e8356aca
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:19:49.384Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:45:29.575Z
 *                     __v:
 *                       type: number
 *                       example: 1
 *                     numViewsCount:
 *                       type: number
 *                       example: 0
 *                     likesCount:
 *                       type: number
 *                       example: 1
 *                     dislikesCount:
 *                       type: number
 *                       example: 0
 *                     likePercentage:
 *                       type: string
 *                       example: "100%"
 *                     dislikePercentage:
 *                       type: string
 *                       example: "NaN%"
 *                     DAYSaGO:
 *                       type: string
 *                       example: Today
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

postRouter.get('/likes/:id', isLogin ,toogleLikePostCtrl);

/**
 * @swagger
 * /api/v1/posts/dislike/{id}:
 *   get:
 *     summary: Toggle dislike for a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Dislike toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 666100a58570095bbe9af881
 *                     title:
 *                       type: string
 *                       example: The World Cars
 *                     description:
 *                       type: string
 *                       example: Lorem ipsum dolor sit amet...
 *                     category:
 *                       type: string
 *                       example: 6660dd96ecb84735db6b1dcf
 *                     numViews:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     likes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "665ef38b693724e3e8356aca" ]
 *                     dislikes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "665ef38b693724e3e8356aca" ]
 *                     user:
 *                       type: string
 *                       example: 665ef38b693724e3e8356aca
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:19:49.384Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:51:59.377Z
 *                     __v:
 *                       type: number
 *                       example: 2
 *                     numViewsCount:
 *                       type: number
 *                       example: 0
 *                     likesCount:
 *                       type: number
 *                       example: 1
 *                     dislikesCount:
 *                       type: number
 *                       example: 1
 *                     likePercentage:
 *                       type: string
 *                       example: "50%"
 *                     dislikePercentage:
 *                       type: string
 *                       example: "50%"
 *                     DAYSaGO:
 *                       type: string
 *                       example: Today
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
postRouter.get('/dislike/:id', isLogin ,toogleDisLikePostCtrl);

/**
 * @swagger
 * /api/v1/posts/detail/{id}:
 *   get:
 *     summary: Get post details
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 666100a58570095bbe9af881
 *                     title:
 *                       type: string
 *                       example: The World Cars
 *                     description:
 *                       type: string
 *                       example: Lorem ipsum dolor sit amet...
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 6660dd96ecb84735db6b1dcf
 *                         title:
 *                           type: string
 *                           example: Car
 *                     numViews:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "665ef38b693724e3e8356aca" ]
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     likes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "665ef38b693724e3e8356aca" ]
 *                     dislikes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "665ef38b693724e3e8356aca" ]
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 665ef38b693724e3e8356aca
 *                         firstname:
 *                           type: string
 *                           example: David
 *                         lastname:
 *                           type: string
 *                           example: Chaka
 *                         email:
 *                           type: string
 *                           example: chaka@gmail.com
 *                         profilePhoto:
 *                           type: string
 *                           example: default.jpg
 *                         role:
 *                           type: string
 *                           example: Editor
 *                         isBlocked:
 *                           type: boolean
 *                           example: false
 *                         isAdmin:
 *                           type: boolean
 *                           example: false
 *                         userAward:
 *                           type: string
 *                           example: Bronze
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: 2024-06-04T10:59:23.521Z
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: 2024-06-06T00:30:34.091Z
 *                         postCounts:
 *                           type: string
 *                           example: DC
 *                         followersCount:
 *                           type: number
 *                           example: 0
 *                         viewersCount:
 *                           type: number
 *                           example: 1
 *                         blockCount:
 *                           type: number
 *                           example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:19:49.384Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:55:23.938Z
 *                     __v:
 *                       type: number
 *                       example: 3
 *                     numViewsCount:
 *                       type: number
 *                       example: 1
 *                     likesCount:
 *                       type: number
 *                       example: 1
 *                     dislikesCount:
 *                       type: number
 *                       example: 1
 *                     likePercentage:
 *                       type: string
 *                       example: "50%"
 *                     dislikePercentage:
 *                       type: string
 *                       example: "50%"
 *                     DAYSaGO:
 *                       type: string
 *                       example: Today
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
postRouter.get('/detail/:id',isLogin ,postDetailsCtrl);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *             example:
 *               description: Lorem ipsum dolor .
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 666100a58570095bbe9af881
 *                     title:
 *                       type: string
 *                       example: The World Cars
 *                     description:
 *                       type: string
 *                       example: Lorem ipsum dolor .
 *                     category:
 *                       type: string
 *                       example: 6660dd96ecb84735db6b1dcf
 *                     numViews:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "665ef38b693724e3e8356aca" ]
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     likes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "665ef38b693724e3e8356aca" ]
 *                     dislikes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "665ef38b693724e3e8356aca" ]
 *                     user:
 *                       type: string
 *                       example: 665ef38b693724e3e8356aca
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:19:49.384Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-06T00:58:46.738Z
 *                     __v:
 *                       type: number
 *                       example: 3
 *                     numViewsCount:
 *                       type: number
 *                       example: 1
 *                     likesCount:
 *                       type: number
 *                       example: 1
 *                     dislikesCount:
 *                       type: number
 *                       example: 1
 *                     likePercentage:
 *                       type: string
 *                       example: "50%"
 *                     dislikePercentage:
 *                       type: string
 *                       example: "50%"
 *                     DAYSaGO:
 *                       type: string
 *                       example: Today
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
postRouter.put('/:id',isLogin, postUpdateCtrl);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
postRouter.delete('/:id', isLogin, upload.single('image'), postDeleteCtrl);












module.exports = router;
