const express = require("express")
const idGen = require('shortid')
const multer = require("multer")
const path = require("path");


const router = express.Router();

getComments = async () => {
    return await getItems("comments.json")
}

saveComments = async (comments) => {
    await saveItems("comments.json", comments)
}

router.get("/", async (req, res) => {
    var comments = await getComments()
    res.send(comments);
})

router.get("/:id", async (req, res) => {
    var comments = await getComments();
    res.send(comments.find(x => x.ID == req.params.id))
})


router.post("/", async (req, res) => {
    var comments = await getComments();
    var newComment = req.body
    newComment.createdAt = new Date()
    newComment.updatedAt = newComment.createdAt
    newComment.ID = idGen.generate()
    comments.push(newComment)
    await saveComments(comments)

    res.send(newComment)
})

router.put("/:id", async (req, res) => {
    var comments = await getComments();
    var oldComment = comments.find(x => x.ID == req.params.id)
    req.body.updatedAt = new Date();
    delete req.body.ID;
    delete req.body.createdAt;

    Object.assign(oldComment, req.body)

    await saveComments(comments)

    res.send(oldComment)
})

router.delete("/:id", async (req, res) => {
    var comments = await getComments(); //get all reviews
    var commentsWithoutDeletedOne = comments.filter(x => x.ID != req.params.id); //get all the reviews that has ID != params.id
    await saveComments(commentsWithoutDeletedOne)
})

module.exports = router;