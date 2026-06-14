const express = require("express");
const {createNews,updateNews, deleteNews, getAllNews, getDraftNews, getInreviewNews, getScheduleNews, getPublishedNews, homePage, getNewsByCategory, singleNews} = require('../controllers/newsController');
const { route } = require("./adminRoute");
const router = express.Router();

router.route('/createnews').post(createNews);
router.route('/updatenews/:id').put(updateNews);
router.route('/deletenews/:id').delete(deleteNews);
router.route('/getallnews').get(getAllNews);
router.route('/getdraftnews').get(getDraftNews);
router.route('/getinreviewnews').get(getInreviewNews);
router.route('/getshedulenews').get(getScheduleNews);
router.route('/getpublishednews').get(getPublishedNews);
router.route('/homepage').get(homePage);
router.route('/getnewsbycategory/:category').get(getNewsByCategory);
router.route('/singlenews/:id').get(singleNews);

module.exports = router