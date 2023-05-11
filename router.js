const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

//books array to use it as database 
const books = []

//serve a static html page as default route
router.get("/",express.static(__dirname+"/public"))

//get all the books or collection of the books with get method
router.get("/books", (req, res)=> {
    res.send(books)
})

//creating books with post method with express-validator
router.post(
//URI
"/books",
//express validaton schyme
[
    body('title').isString().notEmpty(),
    body('author').isString().notEmpty(),
    body('publishedDate').optional({ nullable: true }).isISO8601(),
],
//handler
(req, res) => {
    //validation
    const errors = validationResult(req);
    //if validation failed
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: "fill all the fields", format : {title : "required", author : "required", publishedDate : "optional format-ISO8601" }});
      }
    //if validation passed
    const id = uuidv4()
    const {title, author, publishedDate } = req.body
        const book = {id, title, author, publishedDate}
        books.push(book)
        res.status(201).json({message : "created", data : book})
})

//delteing books with unique id
router.delete("/books/:id", (req, res) => {
    const idToDelete = req.params.id
    const bookIndex = books.findIndex(book => book.id === idToDelete);
    if (bookIndex === -1) {
        // If book not found
        return res.status(404).json({ message: 'Book not found' });
      } else {
        // Remove the book
        const removedBook = books.splice(bookIndex, 1)[0];
        res.status(200).json({ message: 'Book deleted', book: removedBook });
      }
})







module.exports = router