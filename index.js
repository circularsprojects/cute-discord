const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const root = args[0];
if (!root) {
    console.error('Please specify the root directory of your discord data folder (the one with the README.txt)');
    process.exit(1);
}

console.log("---------------------------------");
console.log("circular's :3 discord data parser");
console.log("---------------------------------");

// Basic info
var user = JSON.parse(fs.readFileSync(path.join(root, "account", "user.json") , 'utf8'))
console.log(`username: ${user.username}`)
console.log(`id: ${user.id}`)
console.log("---------------------------------");

// Messages
var totalmessages = 0;
var cutemessages = 0;

var yearmessages = 0
var yearcutemessages = 0

let curdate = new Date();

var dirs = fs.readdirSync(path.join(root, "messages"))
for (var dir of dirs) {
    if (dir == "index.json") break
    var files = fs.readdirSync(path.join(root, "messages", dir))
    for (var file of files) {
        if (file == "messages.csv") {
            var fileData = fs.readFileSync(path.join(root, "messages", dir, file) , 'utf8')
            var lines = fileData.split("\n")
            for (var line of lines) {
                var columns = line.split(",")
                if (columns.length < 3) continue
                var date = new Date(columns[1])
                if (columns[2].includes(":3")) {
                    cutemessages++;
                    totalmessages++;
                    if (date.getFullYear() == curdate.getFullYear()) {
                        yearmessages++;
                        yearcutemessages++;
                    }
                } else {
                    totalmessages++;
                    if (date.getFullYear() == curdate.getFullYear()) {
                        yearmessages++;
                    }
                }
            }
        }
    }
}

console.log(`total messages: ${totalmessages}`)
console.log(`cute messages: ${cutemessages}`)
console.log(`cute message ratio: ${Math.round((cutemessages/totalmessages*100)*100) / 100}%`)
console.log("---------------------------------");
console.log(`messages this year: ${yearmessages}`)
console.log(`cute messages this year: ${yearcutemessages}`)
console.log(`cute message ratio this year: ${Math.round((yearcutemessages/yearmessages*100)*100) / 100}%`)
console.log("---------------------------------");
console.log(`total processing time: ${Math.round((Date.now() - curdate.getTime()))}ms`)
console.log("---------------------------------");
