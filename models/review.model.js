const db = require('../db/connection.js')


exports.fetchReviews = (id) => {
    if(typeof id === "number"){
        return db.query("SELECT * FROM reviews WHERE review_id = $1 ",[id]).then(({rows}) => {
            return rows
        })
    }

}

exports.updatedReview = (id, incObj) => {
    if(typeof id === "number"){
        return db.query("SELECT votes FROM reviews WHERE review_id = $1",[id]).then((votesObject) => {
            if(!votesObject.rows.length){
                return Promise.reject({status : 404 , msg : "valid id in path but doesn't match review"})
            }else{
                const votes = votesObject.rows[0].votes
                if(typeof incObj.inc_votes === "number"){
                    let incVote = votes + incObj.inc_votes;
                    if(incVote < 0) incVote = 0;
                    return db.query(`UPDATE reviews SET votes = ${incVote} WHERE review_id = $1 RETURNING *`, [id]).then(({rows}) => {
                        return rows;
                    })
                }else if(!Object.keys(incObj).length){
                    return Promise.reject({status : 400, msg : "No object was passed to the request"})
                }
                else{
                    return Promise.reject({status : 400 , msg : "user passed something that is not a number in inc_votes" })
                }
            }
        })
    }
}
