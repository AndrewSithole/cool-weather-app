import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static(path.join('dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/home.html'))
});
app.get('/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.js'))
});
app.get('/service_worker.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/service_worjer.js'))
});
app.listen(port, function (err) {
    if(err){
        console.log(err);
    }else {
        open('http://localhost:' + port)
    }
});
