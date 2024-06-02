# MEJ BLOG API PROJECT
## TECHNOLOGIE
__Server:__ Node, Express, MongoDB, Mongoose, JWT

## AUTHORS
- [@kessa99](https://github.com/kessa99)

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
  - [Register a new api client](https://github.com/kessa99)
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

  - [Unblocke another user](https://github.com/kessa99)
  - [Admin blocking another user](https://github.com/kessa99)
  - [Admin unblocking another user](https://github.com/kessa99)
  - [Delete your account](https://github.com/kessa99)
  - [Upload profile photo](https://github.com/kessa99)

## Authentication

## USER REGISTRATION

```javascript
POST /api/v1/users/register
```

| Parameter                  | Type                      | Description                | Required                  |
| :------------------------- | :-------------------------| :------------------------- | :-------------------------|
| `authentication`           | `string`                  | Your token                 |  **no**                   |
| `firstanme`           | `string`                  | **Your firstname**. |  **yes**                       |
| `lastname`           | `string`                  | **Yoir lastname**. |  **yes**                       |
| `email`           | `string`                  | **Your email**. |  **yes**                       |
| `password`           | `string`                  | **Your password**. |  **yes**                       |

Exemple:
```javascript
{
	"firstname": "beni",
	"lastname": "Yassi",
	"email": "yassi@gmail.com",
	"password": "1234"
}
```

reponse:
```javascript
{
	"status": "succès",
	"data": {
		"firstname": "beni",
		"lastname": "Yassi",
		"email": "yassi@gmail.com",
		"profilePhoto": "default.jpg",
		"password": "$2b$10$IRSfWb85vJWkl6W/HPvAK./P11Wjv0ehDgbYCf73ClJhE/yDjC0jO",
		"isBlocked": false,
		"isAdmin": false,
		"viewers": [],
		"followers": [],
		"following": [],
		"posts": [],
		"blocked": [],
		"plan": "Free",
		"userAward": "Bronze",
		"_id": "665ad3a6678beb8fc2d104c7",
		"createdAt": "2024-06-01T07:54:14.933Z",
		"updatedAt": "2024-06-01T07:54:14.933Z",
		"__v": 0
	}
}
```