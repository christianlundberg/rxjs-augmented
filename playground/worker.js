const isPrimeNumber = require('prime-number');
const primeNumberList = require('prime-number/list');

addEventListener('message', ({ data }) => {
    console.log(data);
    const response = primeNumberList.map(value => isPrimeNumber(value));
    postMessage(response);
});
