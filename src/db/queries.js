var fs = require("fs");
module.exports = {

    getUser: async function(id) {
        fs.readFile("db.txt", "utf-8", (err, data) => {
            const users = JSON.parse(data);
            return users[id];
        });
    },

    getUsers: async function() {
        return new Promise((resolve, reject) => {
            fs.readFile('./db.txt', 'utf8', function(err, data) {
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(data));
            });
        });
    },

    updateDB: async function(data) {
        fs.writeFile("./db.txt", JSON.stringify(data), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    }

}