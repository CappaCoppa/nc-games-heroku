const db = require('../db/connection.js')


exports.fetchCategories = () => {

    return db.query('SELECT * FROM categories').then((res) => {
        if(!res.rows.length){
            return Promise.reject({status: 404 , msg : "not found"})
        }else{
            return res.rows
        }
    })
    }

exports.fetchDeletedComment = (id) => {
    return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *",[id]).then(({rowCount})=>{
        if(!rowCount){
            return Promise.reject({status: 404, msg : "comment_id in path but does not exist"})
        }
        return rowCount
    })
}