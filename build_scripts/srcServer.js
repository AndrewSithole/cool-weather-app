import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import configs from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(configs);

app.use(express.static(path.join(__dirname, '../src/public')));
console.log("....configs.output.publicPath")
console.log(configs.output.publicPath)
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: false,
    publicPath: configs.output.publicPath
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/home.html'))
});
app.get('/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.js'))
});
app.get('/service_worker.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/service_worker.js'))
});
app.listen(port, function (err) {
    if(err){
        console.log(err);
    }else {
        open('http://localhost:' + port)
    }
});
