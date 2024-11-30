import React from 'react';
import { useParams } from 'react-router-dom';
import './CreatePost.css';
import { useState, useEffect } from 'react';
import { supabase } from '../client';

const EditPost = () => {
    const { id } = useParams(); // Get the id from the URL
    const [post, setPost] = useState({ title: "", author: "", description: "", image: "" });

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .eq('id', id) // Fetch the post with the id from the URL
                .single(); // Since we're fetching a single post

            setPost(data);
        };

        fetchPost();
    }, [id]); // Fetch the post when the id changes

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({ title: post.title, author: post.author, description: post.description, image: post.image })
            .eq('id', id); // Update the post with the id from the URL
        window.location = "/read";
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .delete() // Delete the post
            .eq('id', id);
        window.location = "/read";
    };

    return (
        <div className='post'>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />
                
                <label htmlFor="author">Author</label> <br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br />

                <label htmlFor="description">Description</label> <br />
                <input type="text" id="description" name="description" value={post.description} onChange={handleChange} /><br />
                <br />

                <label htmlFor="image">Image URL(optional)</label><br />
                <input type="text" id="image" name="image" value={post.image} onChange={handleChange} /><br />
                <br />

                <button className="submit" onClick={updatePost}>Submit</button>
                <button className="delete" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
};

export default EditPost;