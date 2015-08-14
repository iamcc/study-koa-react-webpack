# Section-2

## 实现功能
- 环境配置文件 `server/config.js`，根据环境(`dev` `prod` `test`)自动返回相应的配置
- 初始化管理员账户
- 登录功能
- 首页Layout
- 用户功能
- 测试功能，测试覆盖

## 目录结构
```
├── README.html
├── README.md
├── assets
│   └── index.html
├── client
│   ├── actions
│   │   ├── AuthAction.js
│   │   └── UserAction.js
│   ├── app.less
│   ├── components
│   │   ├── Admin.jsx
│   │   ├── Auth.jsx
│   │   └── Sidebar.jsx
│   ├── constants
│   ├── index.js
│   ├── pages
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── admin
│   │   │   ├── CreateUser.jsx
│   │   │   ├── Manage.jsx
│   │   │   ├── StockManagement.jsx
│   │   │   └── UserManagement.jsx
│   │   ├── order
│   │   │   └── Index.jsx
│   │   ├── stock
│   │   │   └── Index.jsx
│   │   ├── supplier
│   │   │   └── Index.jsx
│   │   └── user
│   │       └── ModifyPassword.jsx
│   ├── routes.jsx
│   ├── services
│   │   ├── AuthService.js
│   │   ├── UserService.js
│   │   ├── token.js
│   │   └── util.js
│   └── stores
│       └── AuthStore.js
├── index.js
├── package.json
├── server
│   ├── apis
│   │   ├── auth.js
│   │   ├── index.js
│   │   └── user.js
│   ├── config.js
│   ├── index.js
│   └── models
│       ├── init.js
│       ├── user.js
│       └── util.js
├── test
│   ├── client
│   └── server
│       ├── apis
│       │   ├── auth.test.js
│       │   └── user.test.js
│       ├── bootstrap.js
│       ├── index.test.js
│       └── models
│           └── init.test.js
└── webpack.config.js
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

服务端代码测试
```
npm run test-server
```

服务端代码测试覆盖率
```
npm run cov-server
```

```
浏览器打开http://localhost:8001 既可查看效果
```