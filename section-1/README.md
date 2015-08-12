# Section-1

## 实现功能
- 环境配置文件 `server/config.js`，根据环境(`dev` `prod` `test`)自动返回相应的配置
- 初始化管理员账户
- 登录功能
- 测试功能，测试覆盖

## 目录结构
```
├── .eslintrc - eslint 配置文件
├── README.html
├── README.md - 说明文档
├── assets - 静态文件
│   └── index.html
├── client - 前端源码
│   ├── actions - reflux action
│   │   └── index.js
│   ├── app.less - 主样式文件
│   ├── components - 组件
│   ├── constants - 常量
│   ├── index.js - 主文件
│   ├── pages - 页面
│   │   ├── App.jsx
│   │   └── Login.jsx
│   ├── routes.jsx - 路由
│   ├── services - 服务
│   │   ├── AuthService.js
│   │   ├── token.js
│   │   └── util.js
│   └── stores - 数据
│       └── AuthStore.js
├── index.js
├── package.json
├── server - 服务端源码
│   ├── apis - api
│   │   ├── auth.js
│   │   └── index.js
│   ├── config.js - 配置文件
│   ├── index.js - 主文件
│   └── models - model
│       ├── init.js
│       └── user.js
├── test - 测试代码
│   ├── client - 客户端测试
│   └── server - 服务端测试
│       ├── apis - api 测试
│       │   └── auth.test.js
│       ├── bootstrap.js - 启动文件
│       ├── index.test.js
│       └── models - model 测试
│           └── init.test.js
└── webpack.config.js - webpack 配置文件
```

## 使用
安装依赖
```
npm i
```

启动服务端web服务
```
npm start
```

启动前端构建工具
```
npm run dev
```

```
浏览器打开http://localhost:8001 既可查看效果
```