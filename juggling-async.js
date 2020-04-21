'use strict'
const http = require('http');
const bl = require('bl');

let input = process.argv;
let responses = [];
let callbackCount = 0;

for (let i = 2; i < input.length; i++) {
    http.get(input[i], (res) =>{
        res.pipe(bl((err, data) => {
            if (err) throw err;
            responses[callbackCount] = data.toString();
            callbackCount++;
            if (callbackCount == 3) {responses.forEach(data => {
                console.log(data);
            })}
        }))
    })
}