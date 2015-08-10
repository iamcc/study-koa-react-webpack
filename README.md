# Study `Nodejs` `Koa` `React` `Webpack`
--- 打造一个简单的进销存系统
## 搭建环境
### 工具
- `Sublime Text 3` - 代码编辑器
- `eslint` - 基于 `nodejs` 的代码检测工具
- `babel` - 基于 `nodejs` 的 `es6` 处理工具
- `babel-eslint` - `eslint` 组件
- `webpack` - 前端构建工具
- `webpack-dev-server` - 前端构建工具，用于 `hot-reload`
- `react-hot-loader` - `webpack` 组件，用户处理 `react` 的热编译
- `style-loader` `css-loader` `less-loader` - `webpack` 组件，用于处理样式文件
- `autoprefixer-loader` - `webpack` 组件，为样式自动添加 `-webkit` 等前缀
- `url-loader` `file-loader` - `webpack` 组件，用于处理样式样式所引用的文件依赖
- `babel-loader` - `webpack` 组件，用于处理 `es6` 新语法

### 后端
- `iojs` - `nodejs` 分支，更多的语法支持
- `koa` - `nodejs` `web` 框架
- `koa-static` - `koa` 组件，处理静态文件，可用 `nginx` 代替
- `koa-body` - `koa` 组件，处理 `http` `post` 传过来的数据
- `koa-router` - `koa` 组件，处理路由
- `koa-jwt` - `koa` 组件，处理身份验证
- `mongoose` - `mongodb` `ODM` 框架

### 前端
- `react` - `facebook` 开源前端模板工具
- `antd` - `阿里`开源的 `react` 组件
- `jquery` - `antd` 依赖 `jquery`
- `reflux` - `flux` 框架
- `superagent` - `ajax` 工具

### 测试
- `mocha` - 测试框架
- `should` - 断言框架
- `istanbul` - 代码覆盖率框架
- `supertest` - 测试http请求
- `muk` - 模拟方法
- `pedding` - 辅助工具