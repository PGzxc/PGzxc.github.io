### <font color=red>十 Web前端项目</font>

#### 1—[tea-admin-panel  ](https://github.com/PGzxc/tea-admin-panel)

**项目归属** ：个人项目(私有)
**项目名称**：TeaOrderAPI - 茶饮订单管理系统
**项目地址**：https://github.com/PGzxc/tea-admin-panel
**软件支持**：现代浏览器(Chrome、Firefox、Safari、Edge)
**开发工具**：Visual Studio Code + Vite 8.0 
**开发语言** ：Vue 3 + JavaScript
**项目描述**：基于 Vue 3 + Element Plus 构建的茶饮店后端管理系统，与 Spring Boot 后端服务对接，实现商品管理、订单处理、座位监控、数据统计等核心功能。系统采用前后端分离架构，通过 Axios 进行 API 调用，支持商品图片上传、座位状态实时更新、订单状态流转等业务场景。
**功能模块**：

-  仪表盘 ：数据概览、业务指标展示
-  商品管理 ：商品 CRUD、图片上传、分类管理 
-  订单管理 ：订单列表、状态更新、详情查看
-  座位管理 ：座位网格视图、状态管理、添加/删除
-  系统设置 ：基础配置、数据统计

**技术要点**：

- 基于 Vue 3 组合式 API ：通过 ref、computed、watch 等 API 管理组件状态
- Element Plus 组件库 ：使用表格、表单、对话框、按钮等组件构建管理界面
- Axios HTTP 客户端 ：封装统一 API 调用，处理请求/响应拦截、错误处理
- Vue Router 路由管理 ：实现页面导航、路由懒加载，优化首屏加载性能
- Vite 构建工具 ：利用 ES Module 实现快速开发和优化生产构建
- Pinia 状态管理 ：管理跨组件共享状态，实现数据持久化
- RESTful API 设计 ：遵循 REST 规范，使用 HTTP 方法表达操作语义
- 前后端分离架构 ：Vite 代理配置解决跨域问题，实现独立开发部署

**项目预览**

| ![][tea-1] | ![][tea-2] | ![][tea-3] |
| :--------: | :--------: | :--------: |
| ![][tea-4] | ![][tea-5] |            |

<!--图片-->

[tea-1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-1-home.png
[tea-2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-2-cart.png
[tea-3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-3-order.png
[tea-4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-4-seat.png
[tea-5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/web-teaorder-panel-5-setting.png
