const http = require('http');
const redis = require('redis');
let redis_host = 'redis'
if (process.env.MODE && process.env.MODE == 'k8s') {
    redis_host = process.env.SAMPLE_REDIS_SERVICE_HOST;
}
const client = redis.createClient({
    host: redis_host,
    port: 6379
});
let redis_val = '';

client.set('sample', 'hello world');
client.set('sample2', 'hello Qiita');

client.get('sample', function (err, data) {
    redis_val += '<li>' + data + '</li>';
});
client.get('sample2', function (err, data) {
    redis_val += '<li>' + data + '</li>';
});

const handleRequest = function (request, response) {
    console.log('Received request for URL: ' + request.url);
    response.writeHead(200);
    response.end('<h1>redis value:</h1><ul>' + redis_val + '</ul>');
};

// echo env
const envs = process.env;
console.log(envs);

const www = http.createServer(handleRequest);
www.listen(3000);