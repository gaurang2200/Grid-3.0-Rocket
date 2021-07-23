import httpProxy from 'http-proxy'
import Express from 'express'

var proxyget = httpProxy.createProxyServer({target:'https://hackingguy:123%40Abcdef@search-axis-analytics-ftswqsb2ivqukg3g4lo7wypaxy.us-east-2.es.amazonaws.com',secure:false,autoRewrite:true});
var proxypost = httpProxy.createProxyServer({target:'https://hackingguy:123%40Abcdef@search-axis-analytics-ftswqsb2ivqukg3g4lo7wypaxy.us-east-2.es.amazonaws.com',secure:false,autoRewrite:true});

const KibanaRouter = new Express.Router();

export default KibanaRouter

KibanaRouter.get('/*', function(req, res) {
  console.log(req.method + ' : ' + req.url);
  req.url = req.url.replace('/kibana','');
  console.log(req.headers)
  req.headers["Authorization"] = 'Basic aGFja2luZ2d1eToxMjNAQWJjZGVm'
  proxyget.web(req, res, { target: 'https://search-axis-analytics-ftswqsb2ivqukg3g4lo7wypaxy.us-east-2.es.amazonaws.com'});
});

KibanaRouter.post('/*', function(req, res) {
  console.log(req.method + ' : ' + req.url);
  req.url = req.url.replace('/kibana','');
  req.headers["Authorization"] = 'Basic aGFja2luZ2d1eToxMjNAQWJjZGVm'
  proxypost.web(req, res, { target: 'https://search-axis-analytics-ftswqsb2ivqukg3g4lo7wypaxy.us-east-2.es.amazonaws.com'});
});