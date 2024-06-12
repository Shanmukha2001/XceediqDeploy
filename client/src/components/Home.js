import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleLike = (id, liked) => {
        // Optimistically update the UI
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === id
                    ? {
                          ...post,
                          liked: !liked,
                          likes: liked ? post.likes - 1 : post.likes + 1,
                      }
                    : post
            )
        );

        // Send request to server
        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`, { liked: !liked })
            .then(response => {
                // Update the UI with the response data
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post._id === id ? { ...post, liked: response.data.liked, likes: response.data.likes } : post
                    )
                );
            })
            .catch(error => {
                console.log(error);
                // If there's an error, revert the UI to its previous state
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post._id === id
                            ? {
                                  ...post,
                                  liked: liked,
                                  likes: liked ? post.likes + 1 : post.likes - 1,
                              }
                            : post
                    )
                );
                // Show error toast message
                toast.error("Something went wrong. Please try again later.");
            });
    };

    return (
        <div className="row">
            {posts.map(post => (
                <div className="col s12 m6 l4" key={post._id}>
                    <div className="card">
                        <div className="card-image">
                            <img src={post.imageUrl} alt={post.description} />
                            <button className="btn-floating halfway-fab waves-effect waves-light red"
                                    onClick={() => handleLike(post._id, post.liked)}>
                                <i className="material-icons">{post.liked ? 'favorite' : 'favorite_border'}</i>
                            </button>
                        </div>
                        <div className="card-content">
                            <p>{post.description}</p>
                            <p>{post.likes} likes</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
