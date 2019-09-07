let get_new_dates = require("./new_threads").get_new_dates;
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const config = dotenv.config({
    path: ".env"
})
const token = config.parsed.bot_key;
const bot = new TelegramBot(token);

let dates = [];
let links = [];
let n = 15;

function post_new() {
    get_new_dates(n)
        .then(new_dates => {
            let diff = new_dates.filter(x => !dates.find(el => {
                return el[0] == x[0];
            }));
            if (diff.length > 0 && diff.length < n) {
                diff.forEach(thread => {
                    let text = `https://2ch.hk/b/res/${thread[1]}.html`;
                    if (links.indexOf(text) === -1) {
                        links.push(text);
                        bot.sendMessage("@bot_test_2ch", text).then(res => {
                            console.log(res);
                        });
                        console.log(text);
                    }
                })
            } else {
                console.log("Pooof");
            }
            dates = new_dates;
        })
        .catch(error => {
            console.log(error);
        })
}

function clear_links() {
    links = [];
}
bot.sendMessage("@bot_test_2ch", "starting").then(res => {
    console.log(res);
});

setInterval(post_new, 1000 * 60 * 2);
setInterval(clear_links, 1000 * 60 * 60 * 2);