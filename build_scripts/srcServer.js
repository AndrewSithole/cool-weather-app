import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
let compiler;
compiler = (webpack(config));

app.use(express.static(path.join(__dirname, '../src/public')));

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath
}));

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
