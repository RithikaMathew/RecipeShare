import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import DetailView from './pages/DetailView'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import { useState, useEffect } from 'react';
import { supabase } from './client';

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase //makes a call to the Supabase API to fetch data from the 'Posts' table. 
                .from('Posts')
                .select(); //specify that all columns from the 'Posts' table should be fetched

            setPosts(data);
        }

        fetchPosts();
    }, []) //empty dependency array ensures that the effect runs only once when the component mounts

    let routes = useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/read",
            element: <ReadPosts posts={posts} />,
        },
        {
            path: "/new",
            element: <CreatePost />,
        },
        {
            path: "/edit/:id",
            element: <EditPost />,
        },
        {
            path: "/detailview/:id",
            element: <DetailView />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);

    return (
        <div className="App">
            <div className="header">
                <Navbar />
            </div>
            {routes}
        </div>
    );
}

export default App;