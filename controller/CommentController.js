import Comment from "../models/commentModel.js";
import Products from "../models/productModel.js";

// Get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a comment
// Create a comment
export const createComment = async (req, res) => {
  try {
    const { productId, text } = req.body;

    const user = req.user._id;

    console.log("user", user)
    const comment = await Comment.create({ user, productId, text });

    // Update the product's comments array
    await Products.findByIdAndUpdate(
      productId,
      { $push: { comments: comment._id } },
      { new: true }
    );

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { user, productId, text } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { user, productId, text },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
