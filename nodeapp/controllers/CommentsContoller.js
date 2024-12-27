const Comments = require('../models/Comments');

const createComment = async (req, res) => {
  try {
    const { userId, pickDropId, comment } = req.body;
    const newComment = await Comments.create({
      userId,
      pickDropId,
      comment
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comments.findAll();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comments.findByPk(id);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error fetching comment:', error);
    res.status(500).json({ message: 'Error fetching comment', error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const [updatedRows] = await Comments.update(
      { comment },
      { where: { id } }
    );
    if (updatedRows > 0) {
      const updatedComment = await Comments.findByPk(id);
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Comments.destroy({
      where: { id }
    });
    if (deletedRows > 0) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment
};