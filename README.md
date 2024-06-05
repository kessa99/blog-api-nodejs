# MEJ BLOG API PROJECT
## TECHNOLOGIE
__Server:__ Node, Express, MongoDB, Mongoose, JWT

## AUTHORS
- [@kessa99](https://github.com/kessa99)
- [@Mela-nina](htts://github.com/Mela-nina)
- [@chenebuah-david] (https://github.com/chenebuah-david)


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
| `:id`             | `string`     | **The ID of the user to delete** | **yes**      |


* Response

```javascript
{
	"status": "success",
	"message": "User deleted successfully"
}
```

Sure! Here's a simplified and explanatory version of your documentation for the "View My Profile" feature:

## VIEW MY PROFILE

* **URL**
```
GET /api/v1/users/who-view-my-profile/:id
```

**Explanation**

To access this feature, you need to provide your authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Your authentication token**           |  **yes**       |
| `:id`             | `string`     | **The ID of the user whose profile you want to view** | **yes**      |

* **Response**
```javascript
{
	"status": "success",
	"data": "You have successfully viewed this profile"
}
```

* **Response**
```javascript
{
	"status": "success",
	"data": {
		"_id": "665ef38b693724e3e8356aca",
		"firstname": "David",
		"lastname": "Chaka",
		"email": "chaka@gmail.com",
		"profilePhoto": "default.jpg",
		"isBlocked": false,
		"isAdmin": false,
		"role": "Editor",
		"viewers": [
			"6660b4471a85e6f2b8944d38"
		],
		"followers": [],
		"following": [],
		"comments": [],
		"posts": [],
		"blocked": [],
		"userAward": "Bronze",
		"createdAt": "2024-06-04T10:59:23.521Z",
		"updatedAt": "2024-06-05T19:06:15.346Z",
		"__v": 1,
		"fullname": "David Chaka",
		"initials": 0,
		"postCounts": "DC",
		"followersCount": 0,
		"viewersCount": 1,
		"blockCount": 0,
		"id": "665ef38b693724e3e8356aca",
		"lastPost": "Invalid Date",
		"lastActive": null
	}
}
```
When you access this URL with the ID of the user you want to view the profile of, you'll receive a confirmation indicating that you have successfully viewed the profile.

The `viewersCount` field indicates the number of times this profile has been viewed by other users. In this example, the `viewersCount` is `1`, indicating that this profile has been viewed once.

and you can see in the views the ID of the person who viewed the profile


## USER FOLLOW USER

This feature allows an authenticated user to follow another user by providing the ID of that user in the URL.

* **URL**
```
GET /api/v1/users/following/:id
```

**Explanation**

To access this feature, you need to provide your authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Your authentication token**           |  **yes**       |
| `:id`             | `string`     | **The ID of the user you want to follow** | **yes**      |

* **Response**
```javascript
{
	"status": "success",
	"message": "You have successfully followed this user"
}
```

* **Response with Updated User Object**
```javascript
{
	"status": "success",
	"data": {
		"_id": "665ef38b693724e3e8356aca",
		"firstname": "David",
		"lastname": "Chaka",
		"email": "chaka@gmail.com",
		"profilePhoto": "default.jpg",
		"isBlocked": false,
		"isAdmin": false,
		"role": "Editor",
		"viewers": [
			"6660b4471a85e6f2b8944d38"
		],
		"followers": [
			"6660b4471a85e6f2b8944d38"
		],
		"following": [],
		"comments": [],
		"posts": [],
		"blocked": [],
		"userAward": "Bronze",
		"createdAt": "2024-06-04T10:59:23.521Z",
		"updatedAt": "2024-06-05T19:17:10.641Z",
		"__v": 2,
		"fullname": "David Chaka",
		"initials": 0,
		"postCounts": "DC",
		"followersCount": 0,
		"viewersCount": 1,
		"blockCount": 0,
		"id": "665ef38b693724e3e8356aca",
		"lastPost": "Invalid Date",
		"lastActive": null
	}
}
```

The response confirms that you have successfully followed the user. Additionally, it provides the updated user object with the `followers` array containing the ID of the user who followed, indicating that this user is now being followed by someone else.


## USER UNFOLLOW USER

This feature allows an authenticated user to unfollow another user by providing the ID of that user in the URL.

* **URL**
```
GET /api/v1/users/unfollow/:id
```

**Explanation**

To access this feature, you need to provide your authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Your authentication token**           |  **yes**       |
| `:id`             | `string`     | **The ID of the user you want to unfollow** | **yes**      |

* **Response**
```javascript
{
	"status": "success",
	"message": "You have successfully unfollowed this user"
}
```

* **Response with Updated User Object**
```javascript
{
	"status": "success",
	"data": {
		"_id": "665ef38b693724e3e8356aca",
		"firstname": "David",
		"lastname": "Chaka",
		"email": "chaka@gmail.com",
		"profilePhoto": "default.jpg",
		"password": "$2b$10$0q2sBRleZhl.cVo1IjXN1OYmd2b5nj57LlQ8bQwrO84ibDIzY7kNq",
		"isBlocked": false,
		"isAdmin": false,
		"role": "Editor",
		"viewers": [
			"6660b4471a85e6f2b8944d38"
		],
		"followers": [],
		"following": [],
		"comments": [],
		"posts": [],
		"blocked": [],
		"userAward": "Bronze",
		"createdAt": "2024-06-04T10:59:23.521Z",
		"updatedAt": "2024-06-05T19:22:46.092Z",
		"__v": 3,
		"fullname": "David Chaka",
		"initials": 0,
		"postCounts": "DC",
		"followersCount": 0,
		"viewersCount": 1,
		"blockCount": 0,
		"id": "665ef38b693724e3e8356aca",
		"lastPost": "Invalid Date",
		"lastActive": null
	}
}
```

The response confirms that you have successfully unfollowed the user. Additionally, it provides the updated user object with the `followers` array now empty, indicating that no one is following this user anymore.


Certainly! Here's the documentation for the "User Block User" feature:

## USER BLOCK USER

* **URL**
```
GET /api/v1/users/block/:id
```

**Explanation**

To access this feature, you need to provide your authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Your authentication token**           |  **yes**       |
| `:id`             | `string`     | **The ID of the user you want to block** | **yes**      |

* **Response**
```javascript
{
	"status": "success",
	"message": "You have successfully blocked this user"
}
```

* **Response with Updated User Object**
```javascript
{
	"status": "success",
	"data": {
		"_id": "6660b4471a85e6f2b8944d38",
		"firstname": "Viiane",
		"lastname": "Kuki",
		"email": "kuki@gmail.com",
		"profilePhoto": "default.jpg",
		"password": "$2b$10$q1cKLP1lDIbX.v4Wib38NelOWCahzWTG8yeJ6MS.PMxDmdWHZzDfC",
		"isBlocked": false,
		"isAdmin": false,
		"role": "Editor",
		"viewers": [],
		"followers": [],
		"following": [],
		"comments": [],
		"posts": [],
		"blocked": [
			"6660b4471a85e6f2b8944d38"
		],
		"userAward": "Bronze",
		"createdAt": "2024-06-05T18:53:59.100Z",
		"updatedAt": "2024-06-05T19:33:59.375Z",
		"__v": 3,
		"fullname": "Viiane Kuki",
		"initials": 0,
		"postCounts": "VK",
		"followersCount": 0,
		"viewersCount": 0,
		"blockCount": 1,
		"id": "6660b4471a85e6f2b8944d38",
		"lastPost": "Invalid Date",
		"lastActive": null
	}
}
```

The response confirms that you have successfully blocked the user. Additionally, it provides the updated user object with the `blocked` array containing the ID of the user who was blocked, indicating that this user is now blocked  and increments the `blockCount` field by `1`.


Sure! Here's the documentation for the "User Unblock User" feature:

## USER UNBLOCK USER

This feature allows an authenticated user to unblock another user by providing the ID of that user in the URL.

* **URL**
```
GET /api/v1/users/unblock/:id
```

**Explanation**

To access this feature, you need to provide your authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Your authentication token**           |  **yes**       |
| `:id`             | `string`     | **The ID of the user you want to unblock** | **yes**      |

* **Response**
```javascript
{
	"status": "success",
	"message": "You have successfully unblocked this user"
}
```

* **Response with Updated User Object**
```javascript
{
	"status": "success",
	"data": {
		"_id": "6660b4471a85e6f2b8944d38",
		"firstname": "Viiane",
		"lastname": "Kuki",
		"email": "kuki@gmail.com",
		"profilePhoto": "default.jpg",
		"password": "$2b$10$q1cKLP1lDIbX.v4Wib38NelOWCahzWTG8yeJ6MS.PMxDmdWHZzDfC",
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
		"createdAt": "2024-06-05T18:53:59.100Z",
		"updatedAt": "2024-06-05T19:40:39.737Z",
		"__v": 4,
		"fullname": "Viiane Kuki",
		"initials": 0,
		"postCounts": "VK",
		"followersCount": 0,
		"viewersCount": 0,
		"blockCount": 0,
		"id": "6660b4471a85e6f2b8944d38",
		"lastPost": "Invalid Date",
		"lastActive": null
	}
}
```

The response confirms that you have successfully unblocked the user. Additionally, it provides the updated user object with the `blocked` array now empty, indicating that this user is no longer blocked.

Certainly! Here's the documentation for the "Admin Block User" feature:

## ADMIN BLOCK USER

This feature allows an admin user to block a regular user by providing the ID of that user in the URL.

* **URL**
```
GET /api/v1/users/admin-block/:id
```

**Explanation**

To access this feature, the authenticated user must have admin privileges and provide their authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Admin's authentication token**       |  **yes**       |
| `:id`             | `string`     | **The ID of the user to be blocked**   | **yes**       |

* **Response**
```javascript
{
	"status": "success",
	"message": "User has been successfully blocked by the admin"
}
```

* **Response with Updated User Object**
```javascript
{
	"status": "success",
	"data": {
		"_id": "665ef38b693724e3e8356aca",
		"firstname": "David",
		"lastname": "Chaka",
		"email": "chaka@gmail.com",
		"profilePhoto": "default.jpg",
		"password": "$2b$10$0q2sBRleZhl.cVo1IjXN1OYmd2b5nj57LlQ8bQwrO84ibDIzY7kNq",
		"isBlocked": true,
		"isAdmin": false,
		"role": "Editor",
		"viewers": [
			"6660b4471a85e6f2b8944d38"
		],
		"followers": [],
		"following": [],
		"comments": [],
		"posts": [],
		"blocked": [],
		"userAward": "Bronze",
		"createdAt": "2024-06-04T10:59:23.521Z",
		"updatedAt": "2024-06-05T19:46:58.185Z",
		"__v": 3,
		"fullname": "David Chaka",
		"initials": 0,
		"postCounts": "DC",
		"followersCount": 0,
		"viewersCount": 1,
		"blockCount": 0,
		"id": "665ef38b693724e3e8356aca",
		"lastPost": "Invalid Date",
		"lastActive": null
	}
}
```

The response confirms that the admin user has successfully blocked the regular user. Additionally, it provides the updated user object with the `isBlocked` field set to `true`.

Sure! Here's the documentation for the "Admin Unblock User" feature:

## ADMIN UNBLOCK USER

This feature allows an admin user to unblock a blocked user by providing the ID of that user in the URL.

* **URL**
```javascript
GET /api/v1/users/admin-unblock/:id
```

**Explanation**

To access this feature, the authenticated user must have admin privileges and provide their authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Admin's authentication token**       |  **yes**       |
| `:id`             | `string`     | **The ID of the user to be unblocked** | **yes**       |

* **Response**
```javascript
{
	"status": "success",
	"message": "User has been successfully unblocked by the admin"
}
```

* **Response with Updated User Object**
```javascript
{
	"status": "success",
	"data": {
		"_id": "665ef38b693724e3e8356aca",
		"firstname": "David",
		"lastname": "Chaka",
		"email": "chaka@gmail.com",
		"profilePhoto": "default.jpg",
		"password": "$2b$10$0q2sBRleZhl.cVo1IjXN1OYmd2b5nj57LlQ8bQwrO84ibDIzY7kNq",
		"isBlocked": false,
		"isAdmin": false,
		"role": "Editor",
		"viewers": [
			"6660b4471a85e6f2b8944d38"
		],
		"followers": [],
		"following": [],
		"comments": [],
		"posts": [],
		"blocked": [],
		"userAward": "Bronze",
		"createdAt": "2024-06-04T10:59:23.521Z",
		"updatedAt": "2024-06-05T19:55:17.258Z",
		"__v": 3,
		"fullname": "David Chaka",
		"initials": 0,
		"postCounts": "DC",
		"followersCount": 0,
		"viewersCount": 1,
		"blockCount": 0,
		"id": "665ef38b693724e3e8356aca",
		"lastPost": "Invalid Date",
		"lastActive": null
	}
}
```

The response confirms that the admin user has successfully unblocked the previously blocked user. Additionally, it provides the updated user object with the `isBlocked` field set to `false` and `blockCount` field reset to `0`.


## Create Category

* **URL**
```
POST /api/v1/category/
```

**Explanation**

To create a new category for articles, the admin must provide their authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Token of the admin creating the category** |  **yes**       |

* **Response**
```javascript
{
	"status": "success",
	"data": {
		"user": "6660b4471a85e6f2b8944d38",
		"title": "html",
		"_id": "6660dbaeded46a7a779ef9f2",
		"createdAt": "2024-06-05T21:42:06.234Z",
		"updatedAt": "2024-06-05T21:42:06.234Z",
		"__v": 0
	}
}
```

This endpoint allows an admin to create a new category for articles. Upon successful creation, the server returns the details of the newly created category, including the user who created it, the title of the category, and its unique ID, along with timestamps for creation and update.


Here's the documentation for fetching a category by its ID:

## Get Category by ID

* **URL**
```
GET /api/v1/category/:id
```

**Explanation**

To retrieve a category by its ID, the user must provide their authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **User's authentication token**        |  **yes**       |
| `:id`             | `string`     | **ID of the category to retrieve**      | **yes**       |

* **Response**
```javascript
{
	"status": "success",
	"data": {
		"_id": "6660dbaeded46a7a779ef9f2",
		"user": "6660b4471a85e6f2b8944d38",
		"title": "html",
		"createdAt": "2024-06-05T21:42:06.234Z",
		"updatedAt": "2024-06-05T21:42:06.234Z",
		"__v": 0
	}
}
```

This endpoint allows a user to retrieve a category by its ID. Upon successful retrieval, the server returns the details of the category, including the user who created it, the title of the category, its unique ID, and timestamps for creation and update.


Here's the documentation for fetching all categories:

## Get All Categories

* **URL**
```
GET /api/v1/category/
```

**Explanation**

To retrieve all categories, the user must provide their authentication token in the request header.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **User's authentication token**        |  **yes**       |

* **Response**
```javascript
{
	"status": "success",
	"data": [
		{
			"_id": "6660dbaeded46a7a779ef9f2",
			"user": "6660b4471a85e6f2b8944d38",
			"title": "html",
			"createdAt": "2024-06-05T21:42:06.234Z",
			"updatedAt": "2024-06-05T21:42:06.234Z",
			"__v": 0
		},
		{
			"_id": "6660dd96ecb84735db6b1dcf",
			"user": "6660b4471a85e6f2b8944d38",
			"title": "Car",
			"createdAt": "2024-06-05T21:50:14.521Z",
			"updatedAt": "2024-06-05T21:50:14.521Z",
			"__v": 0
		}
	]
}
```

This endpoint allows a user to retrieve all categories. Upon successful retrieval, the server returns a list of categories, each containing details such as the user who created it, the title of the category, its unique ID, and timestamps for creation and update.



## Update Category

* **URL**
```
PUT /api/v1/category/:id
```

**Explanation**

To update a category, the admin must provide their authentication token in the request header and the ID of the category to be updated in the URL. The new category data should be included in the request body.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Admin's authentication token**        |  **yes**       |
| `:id`             | `string`     | **ID of the category to update**        | **yes**        |
| `title`           | `string`     | **New title of the category**           | **no**         |

* **Request Body Example**
```javascript
{
	"title": "Love"
}
```

* **Response**
```javascript
{
	"status": "success",
	"data": {
		"_id": "6660dbaeded46a7a779ef9f2",
		"user": "6660b4471a85e6f2b8944d38",
		"title": "Love",
		"createdAt": "2024-06-05T21:42:06.234Z",
		"updatedAt": "2024-06-05T22:23:14.190Z",
		"__v": 0
	}
}
```

This endpoint allows an admin to update the details of an existing category. Upon successful update, the server returns the updated details of the category, including the user who created it, the new title of the category, its unique ID, and updated timestamps.


## Delete Category

* **URL**
```
DELETE /api/v1/category/:id
```

**Explanation**

To delete a category, the admin must provide their authentication token in the request header and the ID of the category to be deleted in the URL.

| Parameter         | Type         | Description                             | Required       |
| :-----------------| :------------| :---------------------------------------| :--------------|
| `authentication`  | `string`     | **Admin's authentication token**        |  **yes**       |
| `:id`             | `string`     | **ID of the category to delete**        | **yes**        |

* **Response**
```javascript
{
	"status": "success",
	"message": "Category successfully deleted"
}
```

This endpoint allows an admin to delete an existing category. Upon successful deletion, the server returns a confirmation message indicating that the category has been successfully deleted.