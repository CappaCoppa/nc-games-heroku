
const {fetchReviews, updatedReview} = require('../models/review.model.js');

exports.getReviews = (req, res, next) => {
    const passedQuery = req.query.count;
    const id = parseInt(req.params.review_id);
    fetchReviews(id, passedQuery).then((reviews) => {
        if(!reviews.length){
            return  Promise.reject({status : 404, msg : 'Valid number but no reviews with that id'});
        }else {
            res.status(200).send({reviews});
        }
        
    }).catch((err) => {
        next(err);
    })

}



exports.updateReview = (req, res, next) => {
    const id = parseInt(req.params.review_id)
    updatedReview(id, req.body).then((updatedReview) => {
        res.status(200).send({updatedReview})
    }).catch(err => {
        next(err)
    })
}

