'use strict'
const http = require('http');
const bl = require('bl');

let input = process.argv.splice(2);
let responses = [];
let callbackCount = 0;
let index = 0;

for (let i = 0; i < input.length; i++) {
    http.get(input[i], (res) =>{
        res.pipe(bl((err, data) => {
            if (err) throw err;
            responses[callbackCount] = data.toString();
            callbackCount++;
            if (callbackCount < input.length) {responses.forEach(data => {
                console.log(data);
            })}
        }))
        index++;
    })

}