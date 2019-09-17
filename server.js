const express = require("express")
const bodyParser = require ("body-parser")
const bookRouter = require("./services/books")
const commentRouter = require("./services/comments")
const server = express();
const cors = require("cors")


server.use(bodyParser.json())
server.use(cors())

server.use("/books", bookRouter)
server.use("/books", commentRouter)

server.use(cors())

server.listen(3450, () =>{
    console.log("server is Running")
})