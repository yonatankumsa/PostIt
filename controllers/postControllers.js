const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const paginate = require("../util/paginate");

const pageSize = 10;

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!(title && content)) {
      return res.status(400).send("No post id provided");
    }

    const post = await Post.create({
      title,
      content,
      poster: userId,
    });

    res.json(post);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = req.query.page;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send("User provided does not exist");
    }

    const posts = await paginate(
      Post.find({ poster: userId }).sort("-createdAt"),
      page,
      pageSize
    );

    return res.json(posts);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).send("No post id provided");
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("Post with provided id not found");
    }

    return res.json(post);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, userId } = req.body;

    if (!(postId && title && content)) {
      return res.status(400).send("No post id provided");
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("No post found");
    }

    if (post.poster != userId) {
      return res.status(400).send("Not authorized to do this");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    return res.json(updatedPost);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    if (!postId) {
      return res.status(400).send("No post id provided");
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("No post found");
    }

    if (post.poster != userId) {
      return res.status(400).send("Not authorized to do this");
    }

    await post.delete();

    await Comment.deleteMany({ post: post._id });

    return res.json(post);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const getPosts = async (req, res) => {
  try {
    const page = req.query.page;

    const posts = await paginate(
      Post.find().sort("-createdAt").populate("poster likes", "email"),
      page,
      pageSize
    );

    return res.json(posts);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("Post not found");
    }

    if (post.likes.includes(userId)) {
      return res.status(400).send("Post is already liked");
    }

    const likedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: userId },
        $inc: { likeCount: 1 },
      },
      { new: true }
    );

    console.log(likedPost);

    return res.json(likedPost);
  } catch (err) {
    return res.json(err.message);
  }
};

const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("Post not found");
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).send("Post is not liked");
    }

    const unlikedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: userId },
        $inc: { likeCount: -1 },
      },
      { new: true }
    );

    return res.json(unlikedPost);
  } catch (err) {
    return res.json(err.message);
  }
};

const getUserLikedPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.body.userId != userId) {
      return res.status(400).send("Not authorized to do this");
    }

    const userPosts = await Post.find({
      likes: { $in: [userId] },
    });

    return res.json(userPosts);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports = {
  getPost,
  getPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
