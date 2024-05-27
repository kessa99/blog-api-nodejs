# BLOG API API STEP BY STEP

## Creation d'un fichier ou d'un repertoire
Rendez vous sur votre github puis creer un nouveau repertoire par la suite clonez. OU vrez le dans votre editeur, moi j'utilise visual studio code

## Les extensions

### Thunder client et Mongodb

L'extension "Thunder Client" pour Visual Studio Code est un outil léger et puissant conçu pour tester et faire des requêtes HTTP. Elle est similaire à des outils comme Postman ou Insomnia, mais intégrée directement dans l'éditeur Visual Studio Code, ce qui la rend pratique pour les développeurs qui préfèrent ne pas quitter leur environnement de développement pour tester leurs API.

Fonctionnalités Principales de Thunder Client
- Tester les API : Vous pouvez faire des requêtes GET, POST, PUT, DELETE, etc., directement depuis Visual Studio Code.
- Historique des requêtes : Thunder Client garde un historique de vos requêtes, vous permettant de les réutiliser facilement.
- Environnement de requête : Vous pouvez créer des environnements pour gérer différentes configurations (par exemple, développement, test, production).
- Collections : Organisez vos requêtes en collections pour les gérer plus facilement.
- Authentification : Supporte plusieurs méthodes d'authentification, y compris Bearer Token, Basic Auth, OAuth, etc.
- Variables : Utilisez des variables pour rendre vos requêtes plus dynamiques et réutilisables.
- Tests intégrés : Écrivez des tests pour vos requêtes et assurez-vous que vos API fonctionnent comme prévu.
- Visualisation des réponses : Affiche les réponses JSON de manière formatée et lisible.

## Initier le projet
```javascript
npm init
```
puis configurer (plus de detail apres)

## CREATION DES FICHIERS
![file nodejs](readme-file/filefornodejs.png)

## configuration pour lancer le server
```javascript
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```


Ce code JavaScript utilise Expressune application serveur. Voici une explication détaillée de chaque section du code :

```javascript
const express = require('express');
```
- **express** : Express est un framework web minimaliste pour Node.js. Il facilite la création d'applications web et d'API.

```javascript
const app = express();
```
- Cette ligne initialise une nouvelle application Express en appelant `express()`. Cette application sera utilisée pour définir des routes et des middlewares.


```javascript
const PORT = process.env.PORT || 9000;
```
- Cette ligne définit le port sur lequel le serveur va écouter les connexions entrantes. `process.env.PORT` permet de récupérer le port défini dans les variables d'environnement (ce qui est utile pour déployer l'application sur des plateformes comme Heroku). Si aucune variable d'environnement n'est définie, le serveur utilisera le port 9000 par défaut.

```javascript
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```
- `app.listen(PORT, callback)` démarre le serveur et le fait écouter les connexions sur le port spécifié. Le callback fourni est exécuté une fois que le serveur commence à écouter. Dans ce cas, il affiche un message dans la console indiquant que le serveur fonctionne et écoute sur le port spécifié.

dans le le fichier package.json
```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "server": "nodemon server.js"
  },
```
* lancer le server
```javascript
npm run server
```

## COnfiguration de la base de donne
je mettrai les photos par la suite

```javascript
const mongoose = require('mongoose');

//function to connect to the database
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('la base de donneé est connecté avec succés');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

dbConnect();
```
dans le fichier server.js
```javascript
const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
require('./config/dbConnect');
const app = express();

//middleware
//routes
//Error handlers middelware
//listen server
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

comme reponse
```javascript
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
Server is running on port 9000
la base de donneé est connecté avec succés
```

* Si la connextion ne passe pas essayer d'y ajouter votre adress ip

## Visualiser la base de donnée via l'extension mongodb installer

* 1- cliquer sur l'icon de l'extension
* 2- cliquer sur nouvelle connexion
* 3- un pop-up devrait s'afficher juste en haut et il sera maintenant question d'y coller le lien 
```javascript
mongodb+srv://<database_name>:<password>@mydbcluster.lopjuxe.mongodb.net/
```
dans ce pop-up puis entré et normalement vous devriez etre connecter

## Creations des models
Parlons d'abord des relations et de la logique du blog et des entites
### les entites(les schema qui seront crees)
- Users
- Post
- Categories
- Comments

### les types de relations existantes
- One-to-one
- One-to-many
- Many-to-many
- One-to-trillion

### la logique 
en prenant en compte ses differwnts apect on peut etablir une sorte de ralation entre toutes ces entites
* User aura la relation one-to-many avec Post
Un utilisateur peut faire plusieurs post mais un post ne peut qu'avoir un seul utilisateurs

* User aura une relation one-to-many
un utilisateur peut avoir plusieurs commentaire mais un commentaire ne peut qu'etre emis par un seul utilisateurs

* Comments aura une relation one-to-many avec Posts
Un Post peut avoir plusieurs commentaire mais un commentaire ne peut pas etre relier a plusieurs post

### Models Users
```javascript
const mongoose = require('mongoose');
// create a schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:[true, 'First name is required']
    },
    lastname: {
        type: String,
        required:[true, 'Last name is required']
    },
    email: {
        type: String,
        required:[true, 'Email is required']
    },
    profilePhoto: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        required:[true, 'Password is required']
    },
    postCount: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['Admin', 'Guest', 'Editor', 'user']
    },
    viewBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    active: {
        type: Boolean,
        default: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
});

const User = mongoose.model('User', userSchema);
models.exports = User;
```

### models Posts
```javascript
const mongoose = require('mongoose');

// create a schema

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required:[true, 'Description is required'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    numViews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please Author is required']
    },
    photo: {
        type: String,
        required: [true, 'Photo is required'],
        default: 'default.jpg'
    },
    },
    {
        timestamps: true
    }
);
const Post = mongoose.model('Post', userSchema);

module.exports = Post
```
### Model Category
```javascript
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
},{timestamps: true}
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category
```
### Model Comment
```javascript
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post is required']
    },
    user: {
        type: Object,
        required: [true, 'User is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
},
{ timestamps: true }
);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
```

## Constructions des premiers routes

```javascript
const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
require('./config/dbConnect');
const app = express();

// ----
//routes

// user routes
// post routes
// comment routes
// category routes
// ---

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```
* REGISTER (ENREGISTREMENT D'UN UTILISATEUR)

```javascript
// ----
//routes

// user routes

//POST/api/v1/users/register
app.post('/api/v1/users/register', async(req, res) => {
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
});
```
* LOGIN (CONNEXION D'UN UTILISATEUR)
```javascript
//POST/api/v1/users/login
app.post('/api/v1/users/login', async(req, res) => {
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
});
```
* GET (RECUPERATION D'UN UTILISATEUR)
```javascript
//GET/api/v1/users/:id
app.get('/api/v1/users/profile/:id', async(req, res) => {
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
});
```
* GET (RECUPERATION DE TOUS LES UTILISATEURS)
```javascript
//GET/api/v1/users
app.get('/api/v1/users', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'User fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
});
```
* PUT (MISE A JOUR D'UN UTILISATEUR)
```javascript
//PUT/api/v1/users/:id
app.put('/api/v1/users/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'Profile updtae successfully'
        })
    } catch(err){
        res.json({
            status: 'fail',
            message: err.message
        })
    }
});
```
* SUPPRESSION (SUPPRESSION D'UN UTILISATEUR)
```javascript
//DELETE/api/v1/users/:id
app.delete('/api/v1/users/:id', async(req, res) => {
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
});
```
* DECONNEXION (DECONNEXION D'UN UTILISATEUR)

```javascript
//GET/api/v1/users/logout
app.get('/api/v1/users/logout', async(req, res) => {
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
});
```
```javascript


// ----------------------------- POST ROUTES --------------------------------------------
// post routes

//POST/api/v1/posts
app.post('/api/v1/posts', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'post created successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in creating post',
            message: err.message
        })
    }
});


//GET/api/v1/posts/:id
app.get('/api/v1/posts/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'posts fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching post',
            message: err.message
        })
    }
});

//GET/api/v1/posts
app.get('/api/v1/posts', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'All posts fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching all posts',
            message: err.message
        })
    }
});

//PUT/api/v1/posts/:id
app.put('/api/v1/posts/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'posts updtae successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in updating post',
            message: err.message
        })
    }
});

//DELETE/api/v1/posts/:id
app.delete('/api/v1/posts/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'posts delete successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in deleting post',
            message: err.message
        })
    }
});
// ----------------------------- FIN POSTS ROUTES ---------------------------------------
```

```javascript
// ----------------------------- COMMENT ROUTES --------------------------------------------
// comment routes

//POST/api/v1/comments
app.post('/api/v1/comments', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'comment created successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in creating comment',
            message: err.message
        })
    }
});


//GET/api/v1/comments/:id
app.get('/api/v1/comments/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'comments fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching comments',
            message: err.message
        })
    }
});

//GET/api/v1/comments
app.get('/api/v1/comments', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'All comments fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching all comments',
            message: err.message
        })
    }
});

//PUT/api/v1/users/:id
app.put('/api/v1/comments/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'comments updtae successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in updating post',
            message: err.message
        })
    }
});

//DELETE/api/v1/comments/:id
app.delete('/api/v1/comments/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'comment delete successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in deleting comment',
            message: err.message
        })
    }
});
// ----------------------------- FIN COMMENT ROUTES ----------------------------------------

```
```javascript

// ----------------------------- CATEGORY ROUTES --------------------------------------------
// category routes

//POST/api/v1/category
app.post('/api/v1/category', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'category created successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in creating category',
            message: err.message
        })
    }
});


//GET/api/v1/category/:id
app.get('/api/v1/category/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'category fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching category',
            message: err.message
        })
    }
});

//GET/api/v1/category
app.get('/api/v1/category', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'All category fetched successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in fetching all category',
            message: err.message
        })
    }
});

//PUT/api/v1/category/:id
app.put('/api/v1/category/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'category updtae successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in updating post',
            message: err.message
        })
    }
});

//DELETE/api/v1/category/:id
app.delete('/api/v1/category/:id', async(req, res) => {
    try{
        res.json({
            status: 'success',
            message: 'category delete successfully'
        })
    } catch(err){
        res.json({
            status: 'Error in deleting category',
            message: err.message
        })
    }
});
// ----------------------------- FIN CATEGORY ROUTES ----------------------------------------

```

NOus allons proceder aux tests avec note thunder client. Notons que ce sont des mises en places pour justes s'assurer de la bonne fonctionnaliter des message de succes et d'echec on ne creer a propremenr rien. Une photo explicatif le montrera

![file nodejs](readme-file/thunder_second_test.png)

## EXPRESS ROUTES ENDPOINT
Dans le contexte d'une application Express, les "routes endpoints" font référence aux points de terminaison de l'API définis dans votre application. 

Dans une application Express, vous définissez des routes pour gérer différentes requêtes HTTP (comme GET, POST, PUT, DELETE) sur différentes URL. Chaque URL correspond à un point de terminaison de l'API. Par exemple, si vous avez une application qui gère des utilisateurs, vous pourriez avoir des endpoints comme `/users` pour récupérer tous les utilisateurs, `/users/:id` pour récupérer un utilisateur spécifique par son identifiant, `/users/new` pour créer un nouvel utilisateur, etc.

Voici un exemple simple de définition de routes avec Express :

```javascript
const express = require('express');
const app = express();

// Point de terminaison pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
    // Logique pour récupérer tous les utilisateurs depuis la base de données
    res.send('Liste des utilisateurs');
});

// Point de terminaison pour récupérer un utilisateur par son identifiant
app.get('/users/:id', (req, res) => {
    // Logique pour récupérer l'utilisateur avec l'identifiant spécifié depuis la base de données
    const userId = req.params.id;
    res.send(`Utilisateur avec l'identifiant ${userId}`);
});

// Point de terminaison pour créer un nouvel utilisateur
app.post('/users/new', (req, res) => {
    // Logique pour créer un nouvel utilisateur dans la base de données
    res.send('Utilisateur créé avec succès');
});

// Autres routes...

// Démarre le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
```

Dans cet exemple :
- `/users` est un endpoint pour récupérer tous les utilisateurs.
- `/users/:id` est un endpoint pour récupérer un utilisateur spécifique par son identifiant.
- `/users/new` est un endpoint pour créer un nouvel utilisateur.

Chaque endpoint est associé à une méthode HTTP (dans cet exemple, `GET` et `POST`), et lorsqu'une requête est effectuée à un endpoint spécifique, la fonction de rappel associée est exécutée pour gérer cette requête.

## LE HTTP METHOD
Les méthodes HTTP (Hypertext Transfer Protocol) sont les actions que vous pouvez effectuer sur une ressource identifiée par une URL dans le cadre d'une requête HTTP. Chaque méthode a une signification spécifique et est utilisée pour accomplir différentes actions. Voici quelques-unes des méthodes HTTP les plus couramment utilisées :

1. **GET** : La méthode GET est utilisée pour demander des données à partir d'une ressource spécifiée. Elle est utilisée pour récupérer des informations sans les modifier. Par exemple, lorsqu'un navigateur Web demande une page Web à un serveur, il utilise une méthode GET.

2. **POST** : La méthode POST est utilisée pour soumettre des données à être traitées à une ressource spécifiée. Elle est souvent utilisée pour envoyer des données de formulaire au serveur pour traitement. Par exemple, lorsqu'un utilisateur remplit un formulaire d'inscription en ligne et clique sur le bouton "Soumettre", les données du formulaire sont envoyées au serveur via une méthode POST.

3. **PUT** : La méthode PUT est utilisée pour mettre à jour des données existantes sur le serveur. Elle remplace toutes les données de la ressource spécifiée par les données fournies. Par exemple, une requête PUT peut être utilisée pour mettre à jour les détails d'un utilisateur existant.

4. **DELETE** : La méthode DELETE est utilisée pour supprimer une ressource spécifiée. Elle supprime la ressource identifiée par l'URL. Par exemple, une requête DELETE peut être utilisée pour supprimer un utilisateur existant de la base de données.

5. **PATCH** : La méthode PATCH est utilisée pour appliquer des modifications partielles à une ressource spécifiée. Elle est utilisée lorsque vous voulez appliquer une mise à jour partielle à une ressource sans la remplacer entièrement. Par exemple, vous pouvez utiliser PATCH pour mettre à jour uniquement le nom d'utilisateur d'un utilisateur sans toucher à d'autres informations.

6. **OPTIONS** : La méthode OPTIONS est utilisée pour décrire les options de communication pour la ressource cible. Elle est utilisée pour obtenir des informations sur les options de communication disponibles pour une ressource, comme les méthodes HTTP autorisées ou les en-têtes requis.

Il existe également d'autres méthodes moins couramment utilisées comme HEAD, TRACE, CONNECT, etc., mais les méthodes énumérées ci-dessus sont les plus couramment utilisées dans le développement Web. Chaque méthode a une utilisation spécifique et une sémantique définie dans le protocole HTTP.

## ROUTES/ENDPOINTS

Dans la requête HTTP "GET http://localhost:9000/api/v1/users/register", voici les composants principaux :

1. **Méthode HTTP** : GET
   - La méthode HTTP spécifie l'action à effectuer sur la ressource. Dans ce cas, c'est une requête GET, utilisée pour récupérer des données à partir de la ressource spécifiée.

2. **URL principale** : http://localhost:9000
   - L'URL principale spécifie l'emplacement du serveur auquel la requête est envoyée. Dans ce cas, c'est le serveur local sur le port 9000.

3. **Ressource** : /api/v1/users/register
   - La ressource spécifie l'emplacement précis sur le serveur où se trouve la fonctionnalité ou les données demandées. Dans ce cas, il s'agit de l'inscription des utilisateurs dans une API, car le chemin contient "/api/v1/users/register".

## METTRE LES ROUTES DANS LES FICHIERS DEDIER

Nous allons reorganiser les routes faits dans le server et les mettre dans des fichiers routes dediersvoila a quoi devrait ressembler notre server

```javascript

// import express
const express = require('express');

//import mongoose
const mongoose = require('mongoose');

//import dotenv
const dotenv = require('dotenv');

//import routes
const userRouter = require('./routes/users/userRoutes');
const postRouter = require('./routes/posts/postRouter');
const commentRouter = require('./routes/comment/commentRouter');
const categoryRouter = require('./routes/category/categoryRouter');


dotenv.config();
require('./config/dbConnect');
const app = express();

// middleware

// ----------------------------- USERS ROUTES -------------------------------------------
app.use('/api/v1/users/', userRouter);
// ----------------------------- FIN USERS ROUTES ---------------------------------------


// ----------------------------- POST ROUTES --------------------------------------------
app.use('/api/v1/posts/', postRouter);
// ----------------------------- FIN POSTS ROUTES ---------------------------------------


// ----------------------------- COMMENT ROUTES -----------------------------------------
app.use('/api/v1/comments/', commentRouter);
// ----------------------------- FIN COMMENT ROUTES ----------------------------------------


// ----------------------------- CATEGORY ROUTES --------------------------------------------
// category routes
app.use('/api/v1/category/', categoryRouter);
// ----------------------------- FIN CATEGORY ROUTES ----------------------------------------


//Error handlers middelware
//listen server
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

voici d'ou seront appeler les routes
![file_route](readme-file/routes.png)
et quand on prend le cas de l'elements users voici a quoi va ressmbler le code

```javascript
const express = require('express');

const userRouter = express.Router();

//POST/api/v1/users/register
userRouter.post('/register', async(req, res) => {
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
});

//POST/api/v1/users/login
userRouter.post('/login', async(req, res) => {
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
});

//GET/api/v1/users/:id
userRouter.get('/profile/:id', async(req, res) => {
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
});

//GET/api/v1/users
userRouter.get('/', async(req, res) => {
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
});

//PUT/api/v1/users/:id
userRouter.put('/:id', async(req, res) => {
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
});

//DELETE/api/v1/users/:id
userRouter.delete('/:id', async(req, res) => {
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
});

//GET/api/v1/users/logout
userRouter.get('/logout', async(req, res) => {
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
});

module.exports = userRouter
```

## CONCEPT CONTROLLER

Dans un projet Node.js, le fichier (ou les fichiers) de contrôleur contient généralement la logique de traitement des requêtes pour des routes spécifiques.

Dans notre cas present la logique qui doit etre dans les fichier controller est celui qui est actuellement dans les routes, prenons le cas du users

```javascript
async(req, res) => {
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
}
```

et c'est lui qui sera mis dans le fichier que l'on va creer qui se nomme `userCtl.js`. 
```javascript
// Dans le fichier controllers/users/userCtl.js
// Register
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

module.exports = {
    userRegisterCtrl,
}
```

On va ensuite l'appeler dans le fichier route ou il etait avant  via ceci:
```javascript
const { userRegisterCtrl } = require("../../controllers/users/userCtrl")
```
puis voici a quoi va ressembler la nouvelle route(Remarque on l'a beaucoup simplifier n'est ce pas?!)
```javascript
//POST/api/v1/users/register
userRouter.post('/register', userRegisterCtrl);
```

Une fois cela fait il serait bon de le tester avec Thunder pour ainsi s'assurer que tout est bien connecte


voici le nouveau code **userRoutes.js**
```javascript
const express = require('express');
const userRouter = express.Router();

const {
    userRegisterCtrl,
    userLoginCtrl,
    userGetOneCtrl,
    userGetAllCtrl,
    updateUserCtrl,
    deleteUserCtrl,
    userLogoutCtrl
} = require('../../controllers/users/userCtrl');

//POST/api/v1/users/register
userRouter.post('/register', userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post('/login', userLoginCtrl);

//GET/api/v1/users/:id
userRouter.get('/profile/:id', userGetOneCtrl);

//GET/api/v1/users
userRouter.get('/', userGetAllCtrl);

//PUT/api/v1/users/:id
userRouter.put('/:id', updateUserCtrl);

//DELETE/api/v1/users/:id
userRouter.delete('/:id', deleteUserCtrl);

//GET/api/v1/users/logout
userRouter.get('/logout', userLogoutCtrl);

module.exports = userRouter
```

le controller
```javascript
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
```

## AUTHENTICATION AND AUTORISATION

Il existe plusieurs types d'authentification utilisés dans les systèmes et applications modernes. Voici une liste des principaux types d'authentification :

1. **Authentification par mot de passe (Password Authentication)** :
   - L'utilisateur fournit un nom d'utilisateur et un mot de passe pour accéder à un système ou une application.

2. **Authentification à deux facteurs (Two-Factor Authentication, 2FA)** :
   - En plus du mot de passe, un deuxième facteur, comme un code envoyé par SMS, un code généré par une application d'authentification, ou une clé physique, est requis.

3. **Authentification multifactorielle (Multi-Factor Authentication, MFA)** :
   - Extension de 2FA, elle peut inclure plusieurs facteurs tels que quelque chose que l'utilisateur connaît (mot de passe), quelque chose que l'utilisateur possède (smartphone, token), et quelque chose que l'utilisateur est (empreinte digitale, reconnaissance faciale).

4. **Authentification biométrique (Biometric Authentication)** :
   - Utilise des caractéristiques physiques uniques de l'utilisateur, comme les empreintes digitales, la reconnaissance faciale, l'iris, ou la voix.

5. **Authentification basée sur les certificats (Certificate-Based Authentication)** :
   - Utilise des certificats numériques pour vérifier l'identité d'un utilisateur ou d'un appareil. Les certificats sont émis par une autorité de certification (CA).

6. **Authentification par jeton (Token-Based Authentication)** :
   - Utilise des jetons (tokens) pour vérifier l'identité. Des exemples incluent JWT (JSON Web Tokens), OAuth tokens, et SAML (Security Assertion Markup Language) tokens.

7. **Authentification unique (Single Sign-On, SSO)** :
   - Permet à un utilisateur de se connecter une seule fois pour accéder à plusieurs systèmes ou applications. Utilise souvent des protocoles comme OAuth, SAML, ou OpenID Connect.

8. **Authentification par carte à puce (Smart Card Authentication)** :
   - Utilise des cartes à puce physiques pour authentifier l'utilisateur. La carte contient un certificat ou une clé cryptographique.

9. **Authentification par connaissance (Knowledge-Based Authentication, KBA)** :
   - Utilise des questions de sécurité ou des informations que seul l'utilisateur connaît, souvent utilisées comme un mécanisme de récupération de mot de passe.

10. **Authentification contextuelle (Contextual Authentication)** :
    - Utilise des informations contextuelles, telles que l'emplacement de l'utilisateur, le type de dispositif, l'heure de la journée, et le comportement de l'utilisateur pour évaluer l'authenticité de la demande de connexion.

11. **Authentification par adresse IP (IP Address-Based Authentication)** :
    - Restreint l'accès en fonction de l'adresse IP de l'utilisateur. Couramment utilisée pour limiter l'accès aux réseaux internes.

12. **Authentification déléguée (Delegated Authentication)** :
    - Permet à une application de déléguer le processus d'authentification à un service tiers. Utilise souvent des protocoles comme OAuth et OpenID Connect pour permettre cette délégation.

Chaque type d'authentification a ses avantages et ses inconvénients en termes de sécurité, commodité et complexité de mise en œuvre. Les systèmes modernes utilisent souvent une combinaison de ces méthodes pour renforcer la sécurité et offrir une meilleure expérience utilisateur.



Les méthodes d'authentification que vous avez mentionnées ci dessous sont spécifiques et concernent souvent la manière dont les sessions sont gérées et sécurisées dans les applications web. Voici une explication détaillée de chacune :

### 1. Low-Level Authentication
- **Description** : Implémentation directe des mécanismes de base pour vérifier l'identité de l'utilisateur, comme le contrôle direct des mots de passe dans le code sans utiliser de bibliothèques ou de services externes.
- **Usage typique** : Utilisé dans des scénarios très simples ou dans des environnements contrôlés. Généralement déconseillé pour des applications complexes en raison de sa vulnérabilité aux erreurs et aux failles de sécurité.

### 2. Low-Level Authentication Encrypted
- **Description** : Similaire à l'authentification de bas niveau, mais avec une couche de chiffrement ajoutée pour sécuriser les mots de passe et autres données sensibles.
- **Usage typique** : Implémenté pour ajouter une sécurité de base aux mécanismes d'authentification de bas niveau. Toujours déconseillé pour des systèmes complexes en raison des risques de mauvaise implémentation.

### 3. Cookie-Based Authentication
- **Description** : Utilise des cookies pour stocker les informations de session côté client. Lorsqu'un utilisateur se connecte, le serveur génère un identifiant de session stocké dans un cookie, et le navigateur renvoie ce cookie avec chaque requête suivante.
- **Usage typique** : Très courant dans les applications web classiques. Les cookies peuvent être sécurisés (avec les attributs `HttpOnly` et `Secure`) pour réduire les risques de XSS et de vols de cookies.
- **Sécurité** : Les cookies doivent être correctement protégés pour éviter les attaques CSRF (Cross-Site Request Forgery) et les vols de session.

### 4. Session-Based Authentication
- **Description** : Le serveur stocke des informations de session dans la mémoire ou sur disque (souvent dans des fichiers ou des bases de données). L'identifiant de session est envoyé au client, généralement via un cookie.
- **Usage typique** : Très courant pour les applications web où la gestion de l'état de session côté serveur est nécessaire.
- **Sécurité** : Protège les sessions en utilisant des cookies sécurisés et des mécanismes de rotation des sessions.

### 5. Session-Based Authentication with Database
- **Description** : Extension de l'authentification basée sur les sessions où les informations de session sont stockées dans une base de données.
- **Usage typique** : Utile pour les applications distribuées ou nécessitant une persistance de session robuste, permettant de gérer les sessions à travers plusieurs instances de serveur.
- **Sécurité** : Assure une meilleure persistance et gestion des sessions, mais nécessite une gestion sécurisée des accès à la base de données.

### 6. Token (JWT) Based Authentication
- **Description** : Utilise des JSON Web Tokens (JWT) pour gérer les sessions sans stocker l'état côté serveur. Lorsqu'un utilisateur se connecte, le serveur génère un JWT signé et le renvoie au client. Le client inclut ce token dans les en-têtes des requêtes suivantes.
- **Usage typique** : Très populaire pour les applications SPA (Single Page Applications), les API RESTful, et les applications mobiles.
- **Sécurité** : Les tokens doivent être sécurisés avec des signatures cryptographiques (HMAC ou RSA) pour éviter les falsifications. Doivent être protégés contre les attaques XSS et CSRF.

### Comparaison avec les méthodes générales :

1. **Password Authentication** :
   - Utilisé dans toutes les méthodes ci-dessus comme première étape pour vérifier l'identité avant de créer une session ou un token.

2. **Two-Factor Authentication (2FA) / Multi-Factor Authentication (MFA)** :
   - Peut être intégré dans toutes les méthodes ci-dessus pour ajouter une couche supplémentaire de sécurité après la vérification initiale du mot de passe.

3. **Token-Based Authentication** :
   - JWT est une forme spécifique de cette méthode, avec une mise en œuvre plus sécurisée et une gestion décentralisée des sessions.

4. **Session Management** :
   - Les méthodes basées sur les cookies, les sessions, et les sessions avec base de données relèvent toutes de la gestion des sessions, avec différentes approches pour stocker et sécuriser les informations de session.

En résumé, les méthodes que vous avez mentionnées sont des variantes et des implémentations spécifiques des concepts généraux d'authentification, adaptées à des besoins particuliers en termes de gestion des sessions et de sécurité dans les applications web.

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```


```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```


```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```


```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```


```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```


```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```


```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```


```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```


```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```

```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```
```javascript
```

```javascript
```