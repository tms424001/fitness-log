# 🏋️ Fitness Log - 健身记录应用

一个简单易用的健身记录应用，帮助你追踪每天的运动情况。基于 React Native 和 Expo 开发，支持 iOS、Android 和 Web 平台。

## ✨ 功能特点

- 📝 记录每日健身活动
- 📊 查看历史记录
- 💾 数据云端同步（使用 Supabase）
- 🎨 简洁美观的用户界面
- 📱 跨平台支持（iOS、Android、Web）

## 🚀 快速开始

### 前置要求

在开始之前，请确保你的电脑上已经安装了：

- [Node.js](https://nodejs.org/) (推荐 18.x 或更高版本)
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 安装步骤

1. **克隆项目到本地**

```bash
git clone https://github.com/你的用户名/fitness-log.git
cd fitness-log
```

2. **安装依赖**

```bash
npm install
```

或者使用 yarn：

```bash
yarn install
```

3. **配置环境变量**

复制 `.env.example` 文件并重命名为 `.env`：

```bash
cp .env.example .env
```

然后编辑 `.env` 文件，填入你的 Supabase 配置信息：

```
EXPO_PUBLIC_SUPABASE_URL=你的Supabase项目URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
```

> 💡 **如何获取 Supabase 配置？**
> 1. 访问 [Supabase](https://supabase.com/) 并创建一个免费账户
> 2. 创建一个新项目
> 3. 在项目设置中找到 API 配置信息

4. **启动应用**

```bash
npm start
```

或者：

```bash
expo start
```

启动后，你可以：
- 按 `a` 在 Android 模拟器中打开
- 按 `i` 在 iOS 模拟器中打开
- 按 `w` 在浏览器中打开
- 扫描二维码在手机上的 Expo Go 应用中打开

## 📁 项目结构

```
fitness-log/
├── app/                    # 应用页面和路由
│   ├── (tabs)/            # 标签页导航
│   ├── _layout.tsx        # 根布局
│   └── index.tsx          # 首页
├── src/                   # 源代码
│   ├── components/        # 可复用组件
│   ├── lib/              # 工具库和配置
│   │   └── supabase.ts   # Supabase 客户端配置
│   ├── store/            # 状态管理（Zustand）
│   └── types/            # TypeScript 类型定义
├── assets/               # 静态资源（图片、字体等）
├── .env.example          # 环境变量示例文件
├── .gitignore           # Git 忽略文件配置
├── app.json             # Expo 应用配置
├── package.json         # 项目依赖和脚本
├── tsconfig.json        # TypeScript 配置
└── README.md            # 项目说明文档（本文件）
```

## 🛠️ 技术栈

- **框架**: [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- **路由**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand)
- **后端服务**: [Supabase](https://supabase.com/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)

## 📱 运行平台

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Web
```bash
npm run web
```

## 🔧 开发说明

### 主要依赖说明

- `expo`: Expo 开发框架，简化 React Native 开发
- `expo-router`: 基于文件系统的路由解决方案
- `@supabase/supabase-js`: Supabase 客户端库，用于数据存储和用户认证
- `zustand`: 轻量级状态管理库
- `react-native-safe-area-context`: 处理安全区域（刘海屏等）
- `@react-native-async-storage/async-storage`: 本地数据持久化

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 React Hooks 最佳实践
- 组件采用函数式编程风格
- 使用 ESLint 和 Prettier 保持代码风格一致

## 🐛 常见问题

### 1. 无法连接到 Supabase

**解决方法**：
- 检查 `.env` 文件是否正确配置
- 确认 Supabase 项目 URL 和 API Key 是否正确
- 检查网络连接

### 2. 应用无法启动

**解决方法**：
```bash
# 清除缓存
npm start -- --clear

# 或者删除 node_modules 重新安装
rm -rf node_modules
npm install
```

### 3. TypeScript 报错

**解决方法**：
```bash
# 检查 TypeScript 配置
npx tsc --noEmit
```

## 📝 待办事项

- [ ] 添加用户认证功能
- [ ] 支持更多运动类型
- [ ] 添加数据统计图表
- [ ] 支持离线模式
- [ ] 添加运动提醒功能
- [ ] 支持多语言

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 👨‍💻 作者

你的名字

## 🙏 致谢

- [Expo](https://expo.dev/) - 优秀的 React Native 开发框架
- [Supabase](https://supabase.com/) - 开源的 Firebase 替代方案
- [React Native](https://reactnative.dev/) - 跨平台移动应用开发框架

---

如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！
