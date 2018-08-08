const express = require('express');
const router = express.Router();  
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');


// @route   GET api/posts/
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
    Post.find().sort({  date: -1 }).then(posts => res.json(posts))
    .catch(err => res.status(404).json());
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found' }));
});

// @route   POST api/posts/
// @desc    Create posts
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid} = validatePostInput(req.body);

    if (!isValid) { 
        return res.status(400).json(errors) 
    }

    const { text, avatar, name } = req.body;
    const newPost = new Post({
        text,
        avatar,
        name,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findOneAndRemove({ user: req.user.id, _id: req.params.id}).then((post) => {
        res.json(post);
    }).catch(err => res.status(404).json({ deletepost: 'Unable to delete post' }));
});

// @route   PATCH api/posts/:id
// @desc    Update post by id
// @access  Private
router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid} = validatePostInput(req.body);

    if (!isValid) { 
        return res.status(400).json(errors) 
    }
    Post.findOneAndUpdate({ user: req.user.id, _id: req.params.id}, { $set: { text: req.body.text }}, {new: true}).then((post) => { 
        res.json(post) 
    }).catch(err => res.status(404).json({ updatepost: 'Unable to update post' }));
});

// @route   POST api/posts/like/:id
// @desc    Like post by post id
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Post.findById(req.params.id).then(post => {
            const updatedLikes = post.likes.filter(like => like.user != req.user.id);
            if (updatedLikes.length === post.likes.length) {
                   //was never liked, so like
                   post.likes.unshift({ user: req.user.id });
                   post.save().then(post => res.json(post))
                   .catch(err => res.status(400).json({ like: 'Unable to like post' }));
                   return;
            }
                //was liked, so unlike
            post.likes = updatedLikes;
            post.save().then(post => res.json(post))
            .catch(err => res.status(400).json({ like: 'Unable to unlike post' }));
    });
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid} = validatePostInput(req.body);

    if (!isValid) { 
        return res.status(400).json(errors) 
    }

    Post.findById(req.params.id).then(post => {
        const newcomment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        };

        post.comments.unshift(newcomment);
        post.save().then(post => res.json(post));
    }).catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Post.findById(req.params.id).then(post => {
        let comment = post.comments.filter(comment => comment.id == req.params.comment_id);

        if (comment.length < 1 ) {
            return res.status(400).json({ commentnotexists: 'Comment does not exist'});
        }

        if (comment[0].user != req.user.id) {
            return res.status(400).json();
        }
 
        let commentIndex = post.comments.indexOf(comment[0]);
        post.comments.splice(commentIndex, 1);
        post.save().then(post => res.json(post));
        
    }).catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});

module.exports = router; 