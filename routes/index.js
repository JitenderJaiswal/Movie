const express=require('express');
const router=express.Router();      
const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.get('/search',homeController.search);
router.get('/movies/',homeController.movies);

module.exports = router;