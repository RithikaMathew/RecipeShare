import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ReadPosts.css';
import { supabase } from '../client';

const ReadPosts = ({ posts }) => {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
console.log(filteredPosts);
    // for searchbar 
    useEffect(() => {
        const filtered = posts.filter(eachPost => // Filter posts by title and create a new array of filtered posts
            eachPost.title.toLowerCase().includes(searchQuery.toLowerCase()) // Check if the title of each post is included in the substring of the search query
        );
        setFilteredPosts(filtered);
    }, [searchQuery]); //this is a dependency array that tells React to run the effect whenever the posts or searchQuery state changes 

    //need this useEffect to sort by recent when the component mounts=default sorting
    useEffect(() => {
        sortByRecent(); //population of filteredPosts occur in this useEffect hook in response to changes in certain dependencies (posts array)
    }, [posts]);

    // Sort posts in descending order of upvotes
    const sortByRecent = () => {
        //...posts creates a new array (sorted) with the same elements as the posts array
        const sorted = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setFilteredPosts(sorted);
    };

    const sortByUpvotes = async () => {

        const postsWithUpdatedUpvotes =
            // Use Promise.all to wait for all the promises to resolve before updating the state
            // Use map to iterate over each post from the filteredPosts array
            //await is used to wait for the promise to resolve before moving to the next iteration
            await Promise.all(filteredPosts.map(async (eachpost) => {
                const { data } = await supabase
                    .from('Posts')
                    .select('upvotes')
                    .eq('id', eachpost.id)
                    .single(); //single() method is used to fetch a single record from the database

                // Return a new object with the updated upvotes value
                //...eachpost is used to copy all the properties of the eachpost object
                return { ...eachpost, upvotes: data.upvotes };
            }));

        const sorted = postsWithUpdatedUpvotes.sort((a, b) => {
            const upvotesA = Number(a.upvotes) || 0; // Convert the upvotes to a number or default to 0 if null
            const upvotesB = Number(b.upvotes) || 0;
            return upvotesB - upvotesA; //descending order
        });

        setFilteredPosts(sorted);
    };

    return (
        <div className="ReadPosts">
            <div className="filter">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={sortByUpvotes}>Most Popular</button>
                <button onClick={sortByRecent}>Most Recent</button>
            </div>
            {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                    <Card
                        key={index}
                        id={post.id}
                        title={post.title}
                        author={post.author}
                        createdAt={post.created_at}
                    />
                ))
            ) : (
                <h2 style={{ color: 'black' }}>{'No matching posts 😞'}</h2>
            )}
        </div>
    );
};

export default ReadPosts;