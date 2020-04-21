'use strict'
const http = require('http');
const bl = require('bl');

let input = process.argv.splice(2);
let responses = [];
let callbackCount = 0;

function get (index) {
    http.get(input[index], (res) =>{
        res.pipe(bl((err, data) => {
            if (err) throw err;
            responses[index] = data.toString();
            callbackCount++;
            if (callbackCount == 3) {responses.forEach(data => {
                console.log(data);
            })}
        }))
    })
}

for (let i = 0; i < input.length; i++) {
    get(i);
};