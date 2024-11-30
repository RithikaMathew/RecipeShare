import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './DetailView.css';
import { formatDistanceToNow } from 'date-fns'; // used to display the distance between a given date and the current time in words

const DetailView = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch the post with the given id
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from('Posts')
        .select()
        .eq('id', id)
        .single();

      setPost(data);
    };

    fetchPost();
  }, [id]);

  // Fetch the upvotes for the post
  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await supabase
        .from('Posts')
        .select('upvotes')
        .eq('id', id)
        .single();

      setCount(data.upvotes);
    };

    fetchCount();
  }, [id]);

  // Update the upvotes for the post
  const updateCount = async (event) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .update({ upvotes: count + 1 })
      .eq('id', id);

    setCount((count) => count + 1);
  };

  // Delete the post
  const deletePost = async (event) => {
    event.preventDefault();
    await supabase
      .from('Posts')
      .delete()
      .eq('id', id);
    window.location = "/read";
  };

  // Fetch the comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from('Comments')
        .select()
        .eq('postId', id);
      setComments(data);

    };

    fetchComments();
  }, [id]);

  // Submit a comment
  const submitComment = async (event) => {
    event.preventDefault();
    if (!comment.trim()) return;

    // Insert comment
    const insertResponse = await supabase
      .from('Comments')
      .insert([{ postId: id, comment: comment }]);

    // Fetch comments after insertion
    const selectResponse = await supabase
      .from('Comments')
      .select()
      .eq('postId', id);
    setComments(selectResponse.data);


    setComment(""); // Clear comment field
  };

  return (
    <div className="DetailView">
      <div className="row1">
        {post.created_at && (
          <p>Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</p>
        )}
        <Link to={`/edit/${id}`}><button> 🖋️</button></Link>
        <button onClick={deletePost}> 🗑️</button>
      </div>
      <h2>{"Title: " + post.title}</h2>
      {post.image && (<img src={post.image} alt={post.title} />)}
      <p>{"Author: " + post.author}</p>
      <p>{"Description: " + post.description}</p>
      <button id='up' onClick={updateCount}>👍 {count} upvotes</button>
      <div className="comments">
        <h3>Comments</h3>
        <div>
          <ul>
            {comments.map((current_element, index) => (
              <li key={index}>{current_element.comment}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={submitComment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit">Submit Comment</button>
        </form>

      </div>
    </div>
  );
};

export default DetailView;