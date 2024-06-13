import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [userId, setUserId] = useState('');
    const [uploadStatus, setUploadStatus] = useState(''); // New state for upload status

    const handleSubmit = (e) => {
        e.preventDefault();
        setUploadStatus('Uploading...'); // Set status to uploading
        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
        formData.append('userId', userId);

        console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts`, formData)
            .then(response => {
                console.log(response.data);
                setImageUrl(response.data.imageUrl);
                setUploadStatus('Uploaded successfully!'); // Set status to success
            })
            .catch(error => {
                console.error('There was an error uploading the post!', error);
                setUploadStatus('Upload failed! Please try again.'); // Set status to failure
            });
    };

    return (
        <div className="row">
            <form className="col s12" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor="description" className={description ? 'active' : ''}>Description</label>
                    </div>
                    <div className="file-field input-field col s12">
                        <div className="btn light-blue lighten-1">
                            <span>Upload Image</span>
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <div className="input-field col s12">
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <label htmlFor="userId" className={userId ? 'active' : ''}>User ID</label>
                    </div>
                    <button className="btn waves-effect waves-light light-blue lighten-1" type="submit" >Create Post</button>
                </div>
            </form>
            {uploadStatus && (
                <div className="row">
                    <div className="col s12">
                        <p>{uploadStatus}</p>
                    </div>
                </div>
            )}
            {imageUrl && (
                <div className="row">
                    <div className="col s12">
                        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePost;
