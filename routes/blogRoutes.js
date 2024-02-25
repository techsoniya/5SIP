const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authenticateUser = require('../middleware/authMiddleware');

router.post('/', authenticateUser, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:blogId', blogController.getBlogById);
router.put('/:blogId', authenticateUser, blogController.updateBlogById);
router.delete('/:blogId', authenticateUser, blogController.deleteBlogById);

module.exports = router;
