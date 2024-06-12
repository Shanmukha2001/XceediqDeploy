import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {
    const { id } = useParams();
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`)
            .then(response => {
                setDescription(response.data.description);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`, { description })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label htmlFor="description" className="active">Description</label>
                    </div>
                    <button className="btn waves-effect waves-light blue" type="submit">Update Post</button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePost;
