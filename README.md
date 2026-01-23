# Github个人博客

本博客使用hexo+github搭建

## 一 下面是搭建的过程

### 1.1 准备工作
 - 申请一个github账号
 - 安装了node.js、npm，并了解相关基础知识
 - 安装了git for windows（或者其它git客户端）

### 1.2 创建Github仓库

新建一个名为你的用户名.github.io的仓库

### 1.3 配置SSH key并添加到Github

	ssh-keygen -t rsa -C "邮件地址"

### 1.4 配置全局变量

	$ git config --global user.name "username"// 你的github用户名，非昵称
	$ git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱

### 1.4 安装hexo

	$ npm install -g hexo

### 1.6 新建本地仓库，并初始化

	$ cd /d/Code/hexo/
	$ hexo init

### 1.7 安装并修改主题

	$ cd /d/Code/hexo/
	$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia

### 1.8 测试没问题上传Github

	$ hexo g # 生成
	$ hexo s # 启动服务
	$ hexo d #提交
### 1.9 博客的备份及还原请见个人博客

## 二 github图床加速

### 2.1 githubusercontent(raw默认-不加速)

```
格式
https://raw.githubusercontent.com/{user}/{repo}/master/{folderpath}/{filename}
示例
https://raw.githubusercontent.com/PGzxc/CDN/master/blog-Interview/flutter-01-widget-life.webp
```

### 2.2 jsdelivr

```
格式
https://cdn.jsdelivr.net/gh/{user}/{repo}/{folderpath}/{filename}
示例
https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson1-xmind.png
```

### 2.3 onmicrosoft

```
示例
https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson1-xmind.png
```

## 三 离线访问

### 3.1 安装插件

```
npm install hexo-offline --save
```

### 3.2 在项目根目录添加hexo-offline.config.cjs

```
// hexo-offline v2 配置示例
module.exports = {
  // 是否启用插件
  enable: true,

  // 缓存的文件匹配规则（支持 glob）
  caches: [
    '**/*.css',
    '**/*.js',
    '**/*.woff2',
    '**/*.woff',
    '**/*.ttf',
    '**/*.svg',
    '**/*.png',
    '**/*.jpg',
    '**/*.gif',
    '**/*.webp',
    '**/*.ico'
  ],

  // 忽略缓存的文件
  ignores: [
    '**/drafts/**'
  ],

  // Workbox 配置（生成的 Service Worker 逻辑）
  workbox: {
    globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,woff2}'],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5MB
  },

  // 额外要缓存的外部资源（可选）
  external: [
    '/lib/fontawesome/css/all.min.css',
    '/lib/animate/animate.min.css',
    '/lib/gitalk/gitalk.css',
    '/lib/gitalk/gitalk.min.js'
  ]
}
```

## 四 多语言支持

### 4.1 实现方案

```
1.目录结构
- 中文： source/ → 生成到 public/
- 英文： source-en/ → 生成到 public/en/
- 日文： source-ja/ → 生成到 public/ja/

2.配置文件
- _config.yml ：默认配置（中文）
- _config.en.yml ：英文配置覆盖
- _config.ja.yml ：日文配置覆盖

3.语言切换 ：
- 在页面底部添加语言切换按钮
- 实现路径保存功能，切换语言时保持当前页面路径
```

### 4.2 使用方法

```
1. 创建文章 ：
- 中文： hexo n 文章标题 → 生成到 source/_posts
- 英文： hexo n --config _config.yml,_config.en.yml 文章标题 → 生成到 source-en/_posts
- 日文： hexo n --config _config.yml,_config.ja.yml 文章标题 → 生成到 source-ja/_posts

2.本地预览 ：
- 启动服务器： npm start （默认使用中文配置）
- 访问地址：
  - 中文： http://localhost:7700/
  - 英文： http://localhost:7700/en/
  - 日文： http://localhost:7700/ja/

3.构建部署 ：
- 构建所有语言： npm run generate:all
- 构建单个语言：
  - 中文： npm run generate:zh
  - 英文： npm run generate:en
  - 日文： npm run generate:ja
- 部署：推送代码到 GitHub，触发 GitHub Actions 自动部署
```

### 4.3 核心指令

```
1、npm 脚本
# 构建所有语言版本
npm run generate:all

# 构建单个语言版本
npm run generate:zh    # 中文
npm run generate:en    # 英文
npm run generate:ja    # 日文

# 本地预览
npm start

2、Hexo 命令 ：
# 清理缓存
hexo clean

# 生成中文版本
hexo generate

# 生成英文版本
hexo generate --config _config.yml,_config.en.yml

# 生成日文版本
hexo generate --config _config.yml,_config.ja.yml

# 本地服务器
hexo server

3、GitHub Actions ：
- 自动构建所有语言版本并部署到 GitHub Pages
- 访问地址：
  --中文： https://pgzxc.github.io/
  --英文： https://pgzxc.github.io/en/
  --日文： https://pgzxc.github.io/ja/
```

## 五 翻译(未做)

### 5.1 翻译服务支持

```
- 支持 OpenAI（GPT-4o / GPT-4.1 / gpt-4o-mini）作为主翻译服务
- 支持 DeepL API 用于日文翻译优化
- 支持百度翻译 API
- 根据要求，不使用 Google Translate API
```

### 5.2 翻译内容

```
- 暂时不翻译文章文件，因为文章太多渲染时间过长
```

### 5.3 功能实现

```
- 已翻译的文件不会重复翻译，只翻译新的或更新的文件
- 自动创建目标语言目录结构
- 支持通过 npm run translate 命令执行翻译操作
- 日文翻译自动使用 DeepL 进行优化
```

### 5.4 验证结果

```
- 脚本成功运行，生成了英文和日语版本的导航、友链和简历文件
- 由于没有设置 API 密钥，当前翻译内容为原文，但脚本逻辑正确
- 当您设置了正确的 API 密钥后，脚本会进行实际的翻译
```

### 5.5 使用步骤

```
1. 在 scripts/translate.js 文件中设置您的 API 密钥
2. 运行 npm run translate 命令执行翻译操作
3. 运行 hexo generate 命令生成静态文件
4. 运行 hexo server 命令启动服务器，测试多语言切换功能
```

