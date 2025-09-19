# How to Run Locally

#### Backend:

Navigate to backend/

```
Run npm install
```

Create a .env file

```
MONGO_URI=mongodb://localhost:27017/mern-todo.
```

```
npm start (ensure MongoDB is running locally).
```

#### Frontend:

Navigate to frontend/.


```
Run npm install
```

```
npm start (proxies requests to http://localhost:5000).
```


#### Docker:

Build and run backend: 

```
docker build -t mern-todo-backend . && docker run -p 5000:5000 --env-file .env mern-todo-backend.
```

Build and run frontend: 

```
docker build -t mern-todo-frontend . && docker run -p 80:80 mern-todo-frontend.
```

```
Ensure MongoDB is running (e.g., docker run -d -p 27017:27017 mongo).
```