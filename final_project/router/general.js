const express = require('express');
let books = require("./booksdb.js");
const getBooks = require('./booksdb.js');
const getISBN = require('./booksdb.js');
const getAuthor = require('./booksdb.js');
const getTitle = require('./booksdb.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
    const books = await getBooks();
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  const isbn = req.params.isbn;
  const book = await getISBN(req.params.isbn)
  res.send(book)
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
    res.send(await getAuthor(req.params.author))
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    res.send(await getTitle(req.params.title))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
