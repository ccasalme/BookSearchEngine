### **✨ Book Search Engine**
#### **Description**
The **Book Search Engine** is a full-stack web application that allows users to **search for books** using the **Google Books API**, save their favorite books, and manage their reading list. The application follows the **MERN stack** (**MongoDB, Express.js, React, Node.js**) and has been **refactored** to use **GraphQL with Apollo Server** instead of RESTful API routes.

---

## **✨ Features**
✔ **Book Search**: Users can search for books by title and view details such as authors, description, and a link to the book.  
✔ **User Authentication**: Secure login and signup using **JWT authentication**.  
✔ **Save Books**: Users can **save books** to their personal account.  
✔ **Remove Saved Books**: Users can **remove books** from their saved list.  
✔ **GraphQL API**: Uses **Apollo Server** for handling queries and mutations.  
✔ **MongoDB Database**: Stores user data and saved books using **MongoDB Atlas**.  
✔ **Deployed on Render**: Live deployment for seamless access.  

<img width="1436" alt="Searchforabook" src="https://github.com/user-attachments/assets/dc21049a-2221-426a-9652-b65ad7303e30" />  

<img width="1428" alt="SearchBookEng" src="https://github.com/user-attachments/assets/32b3dbef-7b12-48b2-9563-e9f1736624b3" />


---

## **☀️ Required Accounts & Dependencies**
### **📂 Accounts Needed**
To run this project, you’ll need:  
✔ **GitHub** → To clone and manage your repository.  
✔ **MongoDB Atlas** → Cloud database storage.  
✔ **Render** → For deploying your backend.  
✔ **Google Books API** → For fetching book data.  

---

### **📦 Dependencies Used**
#### **📀 Root Project (`package.json`)**
- **`concurrently`** → Runs the client and server together.  
- **`nodemon`** → Automatically restarts the server on file changes.  

#### **📀 Server (`server/package.json`)**
##### **Backend Core**:
- **`express`** → Node.js framework for handling API requests.  
- **`mongoose`** → ODM for MongoDB.  
- **`jsonwebtoken`** → For secure authentication (JWT).  
- **`bcrypt`** → Password hashing.  
- **`dotenv`** → Manages environment variables.  

##### **GraphQL & Apollo**:
- **`@apollo/server`** → Apollo Server for handling GraphQL queries.  
- **`graphql`** → GraphQL schema and data handling.  
- **`graphql-tag`** → Parses GraphQL query strings.  

##### **Dev Dependencies**:
- **`typescript`** → Static typing for Node.js.  
- **`ts-node`** → Run TypeScript files in Node.js.  
- **`nodemon`** → Auto-restart server during development.  

#### **📀 Client (`client/package.json`)**
##### **Frontend Core**:
- **`react`** → Component-based frontend library.  
- **`react-dom`** → React rendering in the browser.  
- **`react-router-dom`** → Handles frontend routing.  

##### **Styling & UI**:
- **`bootstrap`** → Pre-built UI components.  
- **`react-bootstrap`** → Bootstrap components for React.  

##### **Apollo Client**:
- **`@apollo/client`** → Connects frontend with GraphQL API.  

---

## **📚 Table of Contents**
- **⚙️ [Installation](#installation)**
- **🛠️ [Usage](#usage)**
- **🚀 [API Queries & Mutations](#api-queries--mutations)**
- **💖 [Contributing](#contributing)**
- **📜 [License](#license)**  

---

## **⚙️ Installation**
### **Prerequisites**
✔ Install **Node.js** and **npm**  
✔ Have a **MongoDB Atlas** account  

### **🚀 Steps to Install**
#### **① Clone the Repository**
```bash
git clone https://github.com/your-username/book-search-engine.git
cd book-search-engine
```
#### **② Install Dependencies**
```bash
npm install
```
#### **③ Set Up Environment Variables**
Create a **`.env`** file inside the **server/** directory with the following:

```env
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
```
#### **④ Start the Development Server**
```bash
npm run develop
```
---

## **🛠️ Usage**
1️⃣ **Start the server and client using**:  
```bash
npm run develop
```
2️⃣ **Open the application** in your browser:  
   - [http://localhost:3000](http://localhost:3000)  

3️⃣ **Use GraphQL Playground to test API queries**:  
   - [http://localhost:3001/graphql](http://localhost:3001/graphql)  

---

## **🚀 API Queries & Mutations**
### **🔹 Queries**
| Query  | Description |
|--------|-------------|
| `me` | Retrieves the logged-in user’s data. |

#### **Example: Fetch Current User**
```graphql
query {
  me {
    username
    email
    savedBooks {
      title
      authors
    }
  }
}
```

---

### **🔹 Mutations**
| Mutation | Description |
|----------|-------------|
| `login(email, password)` | Logs in a user and returns a JWT. |
| `addUser(username, email, password)` | Creates a new user. |
| `saveBook(input)` | Saves a book to the user's profile. |
| `removeBook(bookId)` | Removes a saved book. |

#### **Example: User Login**
```graphql
mutation {
  login(email: "user@example.com", password: "password123") {
    token
    user {
      username
    }
  }
}
```

---

## **💖 Contributing**
We welcome contributions! Follow these steps:  
1️⃣ **Fork the repository.**  
2️⃣ **Create a feature branch:**  
```bash
git checkout -b new-feature
```
3️⃣ **Commit your changes:**  
```bash
git commit -m "Added new feature"
```
4️⃣ **Push to GitHub:**  
```bash
git push origin new-feature
```
5️⃣ **Submit a Pull Request for review.**  

---

## **📜 License**
📚 **This project is licensed under the MIT License.**  
See the [LICENSE](LICENSE) file for more details.

