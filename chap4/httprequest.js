//httprequest.js
//httprequest get csrf token
//http request for Dcard login

var https = require('https');
var cheerio = require('cheerio');
var wait = require('wait.for');
var fs = require('fs');

var accounts = {
	email: 'your email',
	password: 'your password'
};

accounts = JSON.stringify(accounts);

var optionsPost = {
	host: 'www.dcard.tw',
	port: '443',
	path: '/_api/sessions',
	method: 'POST',
	headers: {
		'accept-language': 'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4',
		'upgrade-insecure-requests': '1',
		'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
		'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'cache-control': 'max-age=0',
		'authority': 'www.dcard.tw',
		'origin': 'https://www.dcard.tw',
		'content-type': 'application/json',
		'x-csrf-token': 'x-csrf-token',
		'Cookie': 'cookies'
	}
};

var optionsGet = {
	host: 'www.dcard.tw',
	port: '443',
	path: '/login',
	method: 'GET',
	headers: {
		//'accept-encoding': 'gzip, deflate, sdch, br',
		'accept-language': 'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4',
		'upgrade-insecure-requests': '1',
		'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
		'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'cache-control': 'max-age=0',
		'authority': 'www.dcard.tw',
	}
};

function dcardAuth(csrfToken) {
	optionsPost['headers']['x-csrf-token'] = csrfToken;
	var req = https.request(optionsPost, function(res) {
		res.setEncoding("utf8");
		res.on('data', function(data) {
			console.log(data);
		});
	});
	
	req.write(accounts);
	req.end();
}

function getToken($) {
	$('script').each(function(index, value) {
		if($(this).text().toString().indexOf("window.$STATE=") !== -1) {
			var json = $(this).text().replace("window.$STATE=", "");
			json = JSON.parse(json);
			optionsPost['headers']['x-csrf-token'] = json['app']['csrfToken'];
			dcardAuth();
		}
	});
}

function dcardAuth() {
	var req = https.request(optionsPost, function(res) {
		var json = "";
		res.setEncoding("utf8");
		if(res.statusCode != 204) {
			console.log("Dcard login faailed.");
		}
		else {
			console.log("Dcard login success.");
		}
		
		res.on('data', function(data) {
			json += data;
		});

		res.on('error', function(error) {
			console.error(error);
		});
	
		res.on('end', function() {
			console.log(json);
		});
	});
	
	req.write(accounts);
	req.end();
}

var req = https.request(optionsGet, function(res) {
	var headers = res["headers"];
	var cookie = [];
	var cookies = headers['set-cookie'];
	for(var index=0;index<cookies.length;index++) {
		var temp = cookies[index].split(" ");
		cookie[index] = temp[0];
	}
	
	optionsPost["headers"]["Cookie"] = cookie.join("");
	
	res.setEncoding("utf8");
	var html = "";
	
	if(res.statusCode != 200) {
		console.log("http status code: " + res.statusCode);
		return;
	}
	
	res.on('data', function(data) {
		html += data;
	});

	res.on('error', function(error) {
		console.error(error);
	});
	
	res.on('end', function() {
		var $ = cheerio.load(html);
		getToken($);
	});
});

req.end();