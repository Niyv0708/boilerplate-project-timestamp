// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// 时间戳解析API
app.get('/api/:date', function (req, res) {
  const dateString = req.params.date;
  let dateObj;

  // 处理数字时间戳和自然语言日期两种格式
  if (/^\d+$/.test(dateString)) {
    const timestamp = parseInt(dateString);
    dateObj = new Date(timestamp);
  } else {
    dateObj = new Date(dateString);
  }

  // 验证日期有效性
  if (isNaN(dateObj.getTime())) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  }
});

// 启动服务器并监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
