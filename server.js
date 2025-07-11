const AV = require('leanengine');

// LeanCloud 会自动注入这些环境变量，我们无需手动填写
AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
});

// 加载我们已经写好的云函数文件
require('./cloud/main.js');

// 使用 leanengine 启动一个标准的 Express Web 服务
const app = AV.express();

// 获取 LeanCloud 提供的端口号（这是关键！）
const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);

// 让我们的 Web 服务在这个端口上开始“营业”
app.listen(PORT, () => {
  console.log(`Node app is running on port: ${PORT}`);
  console.log('LeanCloud Engine is ready!');
});