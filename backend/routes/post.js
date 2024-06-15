const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Post = require('../models/Post');
require('dotenv').config();

const router = express.Router();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',  // Ensure objects are publicly readable
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new post
router.post('/', upload.single('image'), async (req, res) => {
    const { description, userId } = req.body;
    const imageUrl = req.file.location;

    const newPost = new Post({ description, imageUrl, userId });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Update a post
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { description, liked } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { description, liked }, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Post.findByIdAndRemove(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

module.exports = router;
