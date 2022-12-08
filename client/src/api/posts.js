const getPosts = async (token, query) => {
  try {
    const res = await fetch(
      "http://localhost:4000/api/posts?" + new URLSearchParams(query),
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPost = async (postId, token) => {
  try {
    const res = await fetch("http://localhost:4000/api/posts/" + postId, {
      headers: {
        "x-access-token": token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (post, user) => {
  try {
    const res = await fetch("http://localhost:4000/api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(post),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (postId, user, data) => {
  try {
    const res = await fetch("http://localhost:4000/api/posts/" + postId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (postId, user) => {
  try {
    const res = await fetch("http://localhost:4000/api/posts/" + postId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getComments = async (params) => {
  try {
    const { id } = params;
    const res = await fetch(
      "http://localhost:4000/api/comments/post_comments/" + id
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const createComment = async (comment, params, user) => {
  try {
    const { id } = params;
    const res = await fetch("http://localhost:4000/api/comments/" + id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(comment),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateComment = async (commentId, user, data) => {
  try {
    const res = await fetch("http://localhost:4000/api/comments/" + commentId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteComment = async (commentId, user) => {
  try {
    const res = await fetch("http://localhost:4000/api/comments/" + commentId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const likePost = async (postId, user) => {
  try {
    const res = await fetch("http://localhost:4000/api/posts/like/" + postId, {
      method: "POST",
      headers: {
        "x-access-token": user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const unlikePost = async (postId, user) => {
  try {
    const res = await fetch("http://localhost:4000/api/posts/like/" + postId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getComments,
  createComment,
  deleteComment,
  updateComment,
  likePost,
  unlikePost,
};
