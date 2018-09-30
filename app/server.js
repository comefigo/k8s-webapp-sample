const http = require('http');
const redis = require('redis');
let redis_host = 'redis';
let redis_port = 6379;

// k8s環境の場合は、redisの接続先とポートは環境変数から取得
if (process.env.MODE && process.env.MODE == 'k8s') {
    redis_host = process.env.SAMPLE_REDIS_SERVICE_HOST;
    redis_port = process.env.SAMPLE_REDIS_SERVICE_PORT;
}
const client = redis.createClient({
    host: redis_host,
    port: redis_port
});

// 表示用の変数をredisに保存する
client.set('sample', 'hello world');
client.set('sample2', 'hello Qiita');

// 表示用の変数
let redis_val = '';
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