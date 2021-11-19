# 青浦阳光宝贝幼儿园

验证 React Native

## 功能列表

- [x] 引入`js-Logger`日志库
- [x] 请求二次封装
- [x] 自定义字体

1. 在根目录下新建文件夹src/assets/fonts/, 把ttf字体文件引入
2. 在react-native.config.js下添加：
```
module.exports = {
  dependencies: {
  },
  "assets": [
    "./src/assets/fonts/"
  ]
};
```
3. 执行：react-native link
4. 样式： fontFamily:'PingFang-SC-Regular'

## 调试

### [react-native-debugger](https://github.com/jhen0409/react-native-debugger)

第一步:

CLI 启动命令

```
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

第二步:

打开 React Native Debug Menu，选择 Debug in chrome
