
# CRUD API

A simple CRUD API where users data can be retrieved, added, updated and deleted.
API also has horizontal scaling implemented with Load balancing. For the implementation of the same,  Cluster module of Node.js is used.

For storing the user data, here we have use in-memory database. When deployed on multiple instance this in-memory database is made consistent using Inter process communication.




## Documentation

[Documentation of API](https://documenter.getpostman.com/view/26216494/2s93kxak1q)


## Run Locally

Clone the project

```bash
  git clone https://github.com/dharmikjethva30/CRUDAPI.git
```

Go to the project directory

```bash
  cd CRUDAPI
```

Install dependencies

```bash
  npm install
```

Start the server in development mode

```bash
  npm run start:dev
```
Start the server in Production mode

```bash
  npm run start:prod
```

Start the server in Multiple instance mode (with horizontal scaling and load balancing)

```bash
  npm run start:multi
```


## Tech Stack

**Server:** Node.js, Express.js

**Modules:** cluster, os, uuid, validator

**Devloper Modules:** nodemon


## 🚀 About Me
I'm a Backend Node.js Developer...


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/dharmikjethva30)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dharmik-jethva-a16900229/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/djethva3123)

