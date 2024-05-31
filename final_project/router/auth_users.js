const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
  
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.query.username;

  // Check if the book with the given ISBN exists
    if (books[isbn]) {
        // Check if the user has already posted a review for this ISBN
        if (books[isbn].reviews[username]) {
            // Update the existing review
            books[isbn].reviews[username] = review;
            res.send({ message: 'Review updated successfully' });
        } else {
            // Add a new review
            books[isbn].reviews[username] = review;
            res.send({ message: 'Review added successfully' });
        }
    } else {
        // Book with the given ISBN not found
        res.status(404).send({ message: 'Book not found' });
    }
});

//Delete Book Review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username; // Get the username from the session

    // Check if the book with the given ISBN exists
    if (books[isbn]) {
        // Check if the user has posted a review for this ISBN
        console.log(username)
        if (books[isbn].reviews[username]) {
            // Delete the user's review for this ISBN
            delete books[isbn].reviews[username];
            res.send({ message: 'Review deleted successfully' });
        } else {
            res.status(404).send({ message: 'Review not found' });
        }
    } else {
        // Book with the given ISBN not found
        res.status(404).send({ message: 'Book not found' });
    }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
