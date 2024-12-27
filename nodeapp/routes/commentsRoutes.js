const express = require('express');
const {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../controllers/CommentsContoller");

const router = express.Router();

router.post('/',createComment)
router.get('/',getAllComments)
router.get('/:id',getCommentById)
router.patch('/:id',updateComment)
router.delete('/:id',deleteComment)

module.exports = router;
