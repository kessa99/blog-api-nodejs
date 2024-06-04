# MEJ BLOG API PROJECT
## TECHNOLOGIE
__Server:__ Node, Express, MongoDB, Mongoose, JWT

## AUTHORS
- [@kessa99](https://github.com/kessa99)
<<<<<<< HEAD
- [@Mela-nina](htts://github.com/Mela-nina)
- [@chenebuah-david] (https://github.com/chenebuah-david)
=======
- [@Mela-nina](https://github.com/Mela-nina)
>>>>>>> e64f308800d5efe667ac28e9f28fe5e338210e71

# API FEATURES
- Authentication and autorization
- CRUD Operations
- Comment functionality
- System blocking user if inactive for 30 days
- Admin can block a user
- A user can block different users
- A user who block another user connot see his posts
- Last date a post was created
- Check if a user is active or not
- Changing user award base on number of posts created by user
- A user can follow and unfollow another user
- Get follow and unFollowing count
- Get profile viewers count
- Get posts created count
- Get Blocked counts
-Get all users who views someone's profile
- Amin can unblocked a blocked user
- Profile photo uploaded
- A user can close his account

# ENDPOINTS

- [Authentication](#authentication)
  - [Register a new api client](#register-a-new-api-client)
  - [Login](https://github.com/kessa99)

- [users](https://github.com/kessa99)
  - [Get my profile](https://github.com/kessa99)
  - [Get all users](https://github.com/kessa99)
  - [Get one user](https://github.com/kessa99)
  - [Following user](https://github.com/kessa99)
  - [Unfollowing ser](https://github.com/kessa99)
  - [update user password](https://github.com/kessa99)
  - [update a profile](https://github.com/kessa99)
  - [Blocked another user](https://github.com/kessa99)
  - [User unblocked another user](https://github.com/kessa99)
  - [Admin blocking another user](https://github.com/kessa99)
  - [Admin unblocking another user](https://github.com/kessa99)
  - [Delete your account](https://github.com/kessa99)
  - [Upload profile photo](https://github.com/kessa99)


- [Category](https://github.com/kessa99)
  - [Create a category for post](https://github.com/kessa99)
  - [Get one category](https://github.com/kessa99)
  - [Get all category](https://github.com/kessa99)
  - [Update a category](https://github.com/kessa99)
  - [Delete a category](https://github.com/kessa99)

- [Posts](https://github.com/kessa99)
  - [Create a post](https://github.com/kessa99)
  - [Get one post](https://github.com/kessa99)
  - [Get all post](https://github.com/kessa99)
  - [Update a post](https://github.com/kessa99)
  - [User can see my post](https://github.com/kessa99)

- [Comment](https://github.com/kessa99)
  - [Create a comment](https://github.com/kessa99)
  - [Get one comment](https://github.com/kessa99)
  - [Get all comment](https://github.com/kessa99)
  - [Update a comment](https://github.com/kessa99)
  - [Delete all comment](https://github.com/kessa99)



# Authentication

## Register a new api client

* **url**
```javascript
POST /api/v1/users/registration
```

| Parameter         | Type         | Description           | Required       |
| :-----------------| :------------| :---------------------| :--------------|
| `authentication`  | `string`     | Your token            |  **no**        |
| `firstanme`       | `string`     | **Your firstname**.   |  **yes**       |
| `lastname`        | `string`     | **Yoir lastname**.    |  **yes**       |
| `email`           | `string`     | **Your email**.       |  **yes**       |
| `password`        | `string`     | **Your password**.    |  **yes**       |
| `role`            | `string`     | **Your role**.        |  **yes**       |

* **Data**
```javascript
{
	"firstname": `string`,
	"lastname": `string`,
	"email": `string`,
	"password": `string`,
	"role": `string`, (['Admin', 'Guest', 'Editor'])
}
```

* Exemple:
```javascript
{
	"firstname": "Viiane",
	"lastname": "Kuki",
	"email": "kuki@gmail.com",
	"password": "1234",
	"role": "Editor"
}
```

* Reponse:
```javascript
{
	"status": "success",
	"data": {
		"firstname": "Viiane",
		"lastname": "Kuki",
		"email": "kuki@gmail.com",
		"profilePhoto": "default.jpg",
		"password": "$2b$10$nFz..loQqzSDOwinQNA.EOXTS9ltDELUm89zJpxxHE3Dcjn/.aRX.",
		"isBlocked": false,
		"isAdmin": false,
		"role": "Admin",
		"viewers": [],
		"followers": [],
		"following": [],
		"comments": [],
		"posts": [],
		"blocked": [],
		"userAward": "Bronze",
		"_id": "665deccf9fd26696cff4fe04",
		"createdAt": "2024-06-03T16:18:23.547Z",
		"updatedAt": "2024-06-03T16:18:23.547Z",
		"__v": 0,
		"fullname": "Viiane Kuki",
		"initials": 0,
		"postCounts": "VK",
		"followersCount": 0,
		"viewersCount": 0,
		"blockCount": 0,
		"id": "665deccf9fd26696cff4fe04",
		"lastPost": "Invalid Date",
		"isInActive": false,
		"lastActive": null
	}
}
```

## Login

* **url**
```javascript
POST /api/v1/users/login
```

| Parameter         | Type         | Description           | Required       |
| :-----------------| :------------| :---------------------| :--------------|
| `authentication`  | `string`     | Your token            |  **no**        |
| `firstanme`       | `string`     | **Your firstname**.   |  **no**        |
| `lastname`        | `string`     | **Yoir lastname**.    |  **no**        |
| `email`           | `string`     | **Your email**.       |  **yes**       |
| `password`        | `string`     | **Your password**.    |  **yes**       |
| `role`            | `string`     | **Your role**.        |  **no**        |

* **data**
```javascript
{
	"email": `string`,
	"password": `string`
}
```

* Exemple:
```javascript
{
	"email": "jerry@gmail.com",
	"password": "1234"
}
```

* Reponse:
```javascript
{
	"status": "success",
	"data": {
		"firstname": "Tom",
		"lastname": "Jerry",
		"email": "jerry@gmail.com",
		"isAdmin": false,
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRlZDc5MWFmOWE4NjcyZDQ5ZGM5MiIsImlhdCI6MTcxNzQzMTcwMiwiZXhwIjoxNzE4MDM2NTAyfQ.wVkaJVyrG4zRp5LNix56B40TuuoluehkbBNBC77ICik"
	}
}
```

## GET ONE USER

```javascript
GET /api/v1/users/profile/
```

| Parameter         | Type         | Description           | Required       |
| :-----------------| :------------| :---------------------| :--------------|
| `authentication`  | `string`     | **Your token**        |  **yes**        |
| `firstanme`       | `string`     | **Your firstname**.   |  **no**        |
| `lastname`        | `string`     | **Yoir lastname**.    |  **no**        |
| `email`           | `string`     | **Your email**.       |  **no**       |
| `password`        | `string`     | **Your password**.    |  **no**       |
| `role`            | `string`     | **Your role**.        |  **no**        |


* Reponse:
```javascript
{
	"status": "success",
	"data": {
		"_id": "665ded791af9a8672d49dc92",
		"firstname": "Tom",
		"lastname": "Jerry",
		"email": "jerry@gmail.com",
		"profilePhoto": "default.jpg",
		"password": "$2b$10$pXMvcXyehK/S6b8h/W5MnO3WzeXNKCREgHkqVYe9mDMac.24u2Ma2",
		"isBlocked": false,
		"isAdmin": false,
		"role": "Editor",
		"viewers": [],
		"followers": [],
		"following": [],
		"comments": [],
		"posts": [],
		"blocked": [],
		"userAward": "Bronze",
		"createdAt": "2024-06-03T16:21:13.026Z",
		"updatedAt": "2024-06-03T16:53:08.046Z",
		"__v": 0,
		"fullname": "Tom Jerry",
		"initials": 0,
		"postCounts": "TJ",
		"followersCount": 0,
		"viewersCount": 0,
		"blockCount": 0,
		"id": "665ded791af9a8672d49dc92",
		"lastPost": "Invalid Date",
		"isInActive": false,
		"lastActive": null
	}
}
```

## GET ALL USER

```javascript
GET /api/v1/users/all/
```

| Parameter         | Type         | Description           | Required       |
| :-----------------| :------------| :---------------------| :--------------|
| `authentication`  | `string`     | **Your token**        |  **yes**        |
| `firstanme`       | `string`     | **Your firstname**.   |  **no**        |
| `lastname`        | `string`     | **Yoir lastname**.    |  **no**        |
| `email`           | `string`     | **Your email**.       |  **no**       |
| `password`        | `string`     | **Your password**.    |  **no**       |
| `role`            | `string`     | **Your role**.        |  **no**        |


* Reponse:
```javascript
{
	"status": "success",
	"data": [
		{
			"_id": "665deccf9fd26696cff4fe04",
			"firstname": "Viiane",
			"lastname": "Kuki",
			"email": "kuki@gmail.com",
			"profilePhoto": "default.jpg",
			"password": "$2b$10$nFz..loQqzSDOwinQNA.EOXTS9ltDELUm89zJpxxHE3Dcjn/.aRX.",
			"isBlocked": false,
			"isAdmin": false,
			"role": "Admin",
			"viewers": [],
			"followers": [],
			"following": [],
			"comments": [],
			"posts": [],
			"blocked": [],
			"userAward": "Bronze",
			"createdAt": "2024-06-03T16:18:23.547Z",
			"updatedAt": "2024-06-03T16:18:23.547Z",
			"__v": 0,
			"fullname": "Viiane Kuki",
			"initials": 0,
			"postCounts": "VK",
			"followersCount": 0,
			"viewersCount": 0,
			"blockCount": 0,
			"id": "665deccf9fd26696cff4fe04"
		},
		{
			"_id": "665ded208842ef0c5802b878",
			"firstname": "David",
			"lastname": "Chaka",
			"email": "chaka@gmail.com",
			"profilePhoto": "default.jpg",
			"password": "$2b$10$2LaC930EO3ak7BzybImPguM4syIJVRBIbp8QhdfDPQMIYLrMXfnvW",
			"isBlocked": false,
			"isAdmin": false,
			"role": "Editor",
			"viewers": [],
			"followers": [],
			"following": [],
			"comments": [],
			"posts": [],
			"blocked": [],
			"userAward": "Bronze",
			"createdAt": "2024-06-03T16:19:44.585Z",
			"updatedAt": "2024-06-03T16:19:44.585Z",
			"__v": 0,
			"fullname": "David Chaka",
			"initials": 0,
			"postCounts": "DC",
			"followersCount": 0,
			"viewersCount": 0,
			"blockCount": 0,
			"id": "665ded208842ef0c5802b878"
		},
		{
			"_id": "665ded791af9a8672d49dc92",
			"firstname": "Tom",
			"lastname": "Jerry",
			"email": "jerry@gmail.com",
			"profilePhoto": "default.jpg",
			"password": "$2b$10$pXMvcXyehK/S6b8h/W5MnO3WzeXNKCREgHkqVYe9mDMac.24u2Ma2",
			"isBlocked": false,
			"isAdmin": false,
			"role": "Editor",
			"viewers": [],
			"followers": [],
			"following": [],
			"comments": [],
			"posts": [],
			"blocked": [],
			"userAward": "Bronze",
			"createdAt": "2024-06-03T16:21:13.026Z",
			"updatedAt": "2024-06-03T16:53:08.046Z",
			"__v": 0,
			"fullname": "Tom Jerry",
			"initials": 0,
			"postCounts": "TJ",
			"followersCount": 0,
			"viewersCount": 0,
			"blockCount": 0,
			"id": "665ded791af9a8672d49dc92"
		}
	]
}
```

## UPDATE USER

* **url**
```javascript
PUT /api/v1/users/update-account/
```

| Parameter         | Type         | Description           | Required       |
| :-----------------| :------------| :---------------------| :--------------|
| `authentication`  | `string`     | Your token            |  **yes**       |
| `firstanme`       | `string`     | **Your firstname**.   |  **no**        |
| `lastname`        | `string`     | **Yoir lastname**.    |  **no**        |


* **data**
```javascript
{
"firstname": `string`
}
```
or
```javascript
{
"lastname": `string`
}
```

* Exemple
```javascript
{
	"firstname": "AGBOPKA"
}
```

* Response
```javascript
{
	"status": "success",
	"data": {
		"_id": "665ded791af9a8672d49dc92",
		"firstname": "AGBOPKA",
		"lastname": "Jerry",
		"email": "jerry@gmail.com",
		"profilePhoto": "default.jpg",
		"password": "$2b$10$pXMvcXyehK/S6b8h/W5MnO3WzeXNKCREgHkqVYe9mDMac.24u2Ma2",
		"isBlocked": false,
		"isAdmin": false,
		"role": "Editor",
		"viewers": [],
		"followers": [],
		"following": [],
		"comments": [],
		"posts": [],
		"blocked": [],
		"userAward": "Bronze",
		"createdAt": "2024-06-03T16:21:13.026Z",
		"updatedAt": "2024-06-03T17:14:19.984Z",
		"__v": 0,
		"fullname": "AGBOPKA Jerry",
		"initials": 0,
		"postCounts": "AJ",
		"followersCount": 0,
		"viewersCount": 0,
		"blockCount": 0,
		"id": "665ded791af9a8672d49dc92"
	}
}
```

## UPDATE USER PASSWORD

* **url**
```javascript
PUT /api/v1/users/update-password/
```


| Parameter         | Type         | Description           | Required       |
| :-----------------| :------------| :---------------------| :--------------|
| `authentication`  | `string`     | **Your token**        |  **yes**        |
| `password`        | `string`     | **Your password**.    |  **yes**       |


* **data**
```javascript
{
	"password": `string`
}
```

* Exemple:
**Old Password**

```javascript
{
	"password": "1234"
}
```

**New Password**
```javascript
{
	"password": "LoveCode"
}
```

* Response

```javascript
{
	"status": "success",
	"message": "Password change successfully"
}
```

## UPDATE USER photo

* **url**
```javascript
Post /api/v1/users/update-password/
```


| Parameter         | Type         | Description           | Required       |
| :-----------------| :------------| :---------------------| :--------------|
| `authentication`  | `string`     | **Your token**        |  **yes**       |
| `profilePhoto`    | `string`     | **Your photo**.       |  **yes**       |


* **data**
```javascript
{
	"profilePhoto": `string`
}
```

* Exemple:
**Old parameter**

```javascript
{
	"status": "success",
	"data": {
		"profilePhoto": "default.jpg"
	}
}
```

**New Photo add**
```javascript
{
	"status": "success",
	"data": {
		"profilePhoto": "https://res.cloudinary.com/dmmh0fzto/image/upload/v1717498863/blog-api/pu31xjwaypiq1ryvxzod.jpg",
	}
}
```

* Response

```javascript
{
	"status": "success",
	"data": "Profile photo uploaded successfully humm"
}
```

## DELETE USER

* **url**
```javascript
Delete /api/v1/users/:id
```


| Parameter         | Type         | Description           | Required       |
| :-----------------| :------------| :---------------------| :--------------|
| `authentication`  | `string`     | **Your token**        |  **yes**       |


* Response

```javascript
{
	"status": "success",
	"message": "User deleted successfully"
}
```