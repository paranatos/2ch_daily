const axios = require("axios");


exports.get_new_dates = get_new_dates;

function get_new_dates(n) {
    return get_new_threads(n)
        .then(res => {
            let new_dates = res.map(thread => {
                return [
                    thread.date,
                    thread.num
                ]
            });
            return new_dates;
        })
        .catch(error => {
            return (error);
        });

}


function get_new_threads(num) {
    return axios({
            method: "GET",
            url: "https://2ch.hk/b/catalog_num.json"
        })
        .then(res => {
            res = res.data.threads.filter(thread => {
                return thread.posts_count > 30;
            })
            return res.splice(0, num);
        })
        .catch(error => {
            return error;
        });
}