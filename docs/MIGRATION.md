# Timarsky Next 迁移素材清单

更新时间：2026-04-16

## 1. 目的

本清单用于把当前静态 HTML / CSS / JS 实现整理为可迁移素材，供后续迁入 Next.js 工程时逐项对照。

使用方式：

- 先按“共享层”迁移，再按“页面层”迁移。
- 每迁完一项，就将对应静态文件标记为“已吸收”，避免重复拷贝。
- 静态页只作为参考源，不再继续扩写。

## 2. 共享层素材

### 2.1 共享布局与导航

来源文件：

- `index.html`
- `shipin.html`
- `zuotu.html`
- `biandao.html`
- `zichan.html`
- `settings.html`
- `notice.html`
- `yinpin.html`
- `aigongju.html`

可提取内容：

- 左侧 sidebar 框架
- 一级导航项：灵感、编导、做图、音频、视频、资产
- 独立 AI 工具入口
- 底部通知按钮
- 点数入口
- 用户头像入口

Next 目标：

- `components/shell/sidebar.tsx`
- `lib/config/nav.ts`

迁移备注：

- 当前 sidebar 结构在多个 HTML 里重复出现，适合一次性抽成 React 组件。
- 当前 active 状态依赖 `href === currentPage`，迁移到 Next 后改为基于 pathname 判断。

### 2.2 共享用户菜单与 toast

来源文件：

- `js/shared.js`

可提取内容：

- `USER_KEY`
- mock 用户结构
- 登录态读写
- 退出登录
- toast 容器与 toast 消息
- 用户菜单结构
- 公告跳转、设置跳转、退出跳转逻辑

Next 目标：

- `components/shell/user-menu.tsx`
- `components/shell/toast-host.tsx`
- `lib/mock/user.ts`
- `lib/utils/storage.ts`
- `lib/utils/toast.ts`

迁移备注：

- 当前实现直接操作 DOM，Next 中改为 React state/context。
- `localStorage` 逻辑保留，但应包进 client-side hook 或 utility。

### 2.3 全局样式与视觉 token

来源文件：

- `css/custom.css`

可提取内容：

- 色板变量
- 边框、圆角、阴影、间距 token
- sidebar 样式
- auth 样式
- 首页卡片和瀑布流样式
- 工作台布局样式
- toast / 用户菜单样式

Next 目标：

- `app/globals.css`
- `styles/tokens.css`
- `styles/theme.css`

迁移备注：

- 先抽 `:root` token，再拆页面块级样式。
- 不建议把整份 `custom.css` 原样塞回 Next，应拆成共享层和页面层。

## 3. 页面层素材

### 3.1 首页 `/`

来源文件：

- `index.html`
- `js/app.js`

可提取结构：

- banner 轮播
- AI 工具横向卡片区
- 顶部 tab：灵感案例 / 教程视频
- 搜索框
- 分类筛选条
- 瀑布流卡片区
- 页脚备案信息

可提取数据：

- `js/app.js` 中 `cards` 数组
- 分类文案
- banner 图
- tool 卡片图片

Next 目标：

- `app/page.tsx`
- `components/home/hero-banner.tsx`
- `components/home/filter-bar.tsx`
- `components/home/card-grid.tsx`
- `components/home/case-card.tsx`
- `lib/mock/home.ts`

迁移备注：

- `renderCards()` 需要从字符串模板改成 React 列表渲染。
- “做同款”跳转逻辑需要复用统一 auth 检查。

### 3.2 登录页 `/login`

来源文件：

- `login.html`
- `js/auth.js`

可提取结构：

- 左图右表单版式
- tab 切换：密码登录 / 验证码登录
- 协议勾选
- 登录按钮
- 注册跳转
- 底部备案信息

可提取交互：

- tab 切换
- 校验协议
- 演示密码校验
- 验证码发送倒计时
- 登录成功后跳首页

Next 目标：

- `app/login/page.tsx`
- `components/auth/login-form.tsx`
- `components/auth/agreement-check.tsx`
- `lib/utils/auth.ts`

迁移备注：

- 当前密码规则写死为 `97541111`，迁移时保留为 mock 配置值。
- 发送验证码应改为组件内状态驱动，不再手改按钮文本。

### 3.3 注册页 `/register`

来源文件：

- `register.html`
- `js/auth.js`

可提取结构：

- 左图右表单版式
- tab 切换：兑换码注册 / 邀请码注册
- 协议勾选
- 注册按钮
- 登录跳转

可提取交互：

- 表单切换
- 基础字段校验
- 注册成功初始化 50 点数

Next 目标：

- `app/register/page.tsx`
- `components/auth/register-form.tsx`
- `components/auth/agreement-check.tsx`

### 3.4 视频页 `/video`

来源文件：

- `shipin.html`

可提取结构：

- 模型 tab 条
- 搜索框
- 历史记录按钮
- 参考图上传区
- 角色按钮
- 提示词输入区
- AI 帮写润色入口
- 灵感案例入口
- 参数设置区
- 生成按钮
- 右侧历史记录区

Next 目标：

- `app/video/page.tsx`
- `components/workspace/model-tabs.tsx`
- `components/workspace/upload-panel.tsx`
- `components/workspace/prompt-panel.tsx`
- `components/workspace/history-panel.tsx`
- `lib/mock/video.ts`

迁移备注：

- 这是工作台通用骨架的重要来源文件。
- 后续 `banana`、`mix` 很多结构可以复用这一页的框架。

### 3.5 香蕉生图页 `/banana`

来源文件：

- `zuotu.html`

可提取结构：

- 模式切换
- 参考图上传
- 素材库入口
- 香蕉作品入口
- 脚本/提示词输入区
- 灵感案例区
- 规格与点数设置
- 历史记录区

Next 目标：

- `app/banana/page.tsx`
- `lib/mock/banana.ts`

迁移备注：

- 与 `/video` 的共享率预计很高，优先抽配置，不要复制组件。

### 3.6 编导页 `/biandao`

来源文件：

- `biandao.html`

可提取结构：

- 功能模块入口
- 文案二创区
- 立项管理区
- 行业选题区
- 文案自创区
- 我的文案库入口

Next 目标：

- `app/biandao/page.tsx`
- `lib/mock/biandao.ts`

迁移备注：

- 当前页面已经从占位页升级到可用首屏，是编导信息架构的主要参考源。

### 3.7 资产页 `/asset`

来源文件：

- `zichan.html`

可提取结构：

- 二级分类
- 标签筛选
- 列表区
- 提示条
- 空态

Next 目标：

- `app/asset/page.tsx`
- `lib/mock/asset.ts`

### 3.8 设置页 `/settings`

来源文件：

- `settings.html`

可提取结构：

- 主题模式
- 主题色
- 语言设置
- 通知设置

Next 目标：

- `app/settings/page.tsx`
- `components/settings/theme-settings.tsx`
- `components/settings/language-settings.tsx`
- `components/settings/notification-settings.tsx`
- `lib/mock/settings.ts`

### 3.9 公告页 `/notice`

来源文件：

- `notice.html`

可提取结构：

- 公告列表
- 全部已读入口
- 公告详情正文
- 时间信息

Next 目标：

- `app/notice/page.tsx`
- `components/notice/notice-list.tsx`
- `components/notice/notice-detail.tsx`
- `lib/mock/notice.ts`

### 3.10 扩展页

来源文件：

- `yinpin.html`
- `aigongju.html`

处理建议：

- 暂时不纳入首批迁移。
- 保留为二期扩展功能参考页。

## 4. 脚本迁移清单

### 4.1 `js/shared.js`

要迁移的能力：

- 用户持久化
- mock 登录注册
- toast
- 菜单开合
- 公告/设置/退出跳转
- 登录拦截

迁移去向：

- `lib/mock/user.ts`
- `lib/utils/storage.ts`
- `lib/utils/auth.ts`
- `components/shell/user-menu.tsx`
- `components/shell/toast-host.tsx`

### 4.2 `js/app.js`

要迁移的能力：

- 首页卡片 mock 数据
- 首页筛选
- 搜索
- banner 自动轮播
- 工具横向自动滚动
- “做同款”跳转

迁移去向：

- `lib/mock/home.ts`
- `components/home/*`
- 首页 page 组件内交互逻辑

### 4.3 `js/auth.js`

要迁移的能力：

- 登录/注册 tab 切换
- 表单校验
- 验证码倒计时
- 登录后重定向
- 注册后点数初始化

迁移去向：

- `components/auth/login-form.tsx`
- `components/auth/register-form.tsx`
- `lib/utils/auth.ts`

## 5. 静态资源清单

### 5.1 必迁资源

- `images/avatar.png`
- `images/favicon.png`
- `images/login-bg.png`
- `images/banner-1.png`
- `images/banner-2.png`
- `images/banner-3.png`
- `images/menu-banana.png`
- `images/menu-sora.png`
- `images/menu-grok.png`
- `images/menu-veo.png`
- `images/menu-rando.png`
- `images/menu-mix.png`
- `images/menu-human.png`
- `images/menu-analyse.png`
- `images/icon-credits.svg`
- `images/icon-灵感-active.svg`
- `images/icon-灵感-inactive.svg`
- `images/icon-编导-active.svg`
- `images/icon-编导-inactive.svg`
- `images/icon-做图-active.svg`
- `images/icon-做图-inactive.svg`
- `images/icon-音频-active.svg`
- `images/icon-音频-inactive.svg`
- `images/icon-视频-active.svg`
- `images/icon-视频-inactive.svg`
- `images/icon-资产-active.svg`
- `images/icon-资产-inactive.svg`

### 5.2 首页卡片资源

- `images/cdn-2.png`
- `images/cdn-3.jpg`
- `images/cdn-4.png`
- `images/cdn-5.jpg`
- `images/ba91e81c1a7b02544c6b61d852aacc.png`
- `images/36ba636d5351f39326d46f4fec61fc.jpg`
- `images/7a0f19e1775f75480dd733a559468c.png`
- `images/9382bd4e92b293bc2d5427cdd78043.png`
- `images/a2d9f19d153b6e041fe2f93798c3c0.png`
- `images/463b02e9efcdcc6cb279d4c1d4fce9.png`
- `images/3f868745d4e9a111964eacaae88fe1.png`
- `images/408b446da79c124f710d46c22abc1c.png`
- `images/b142937953a0f77a733b5748471d98.png`
- `images/2945627b48726f6a06babd4e3fc3ac.jpg`
- `images/0f921026b1a5cdb8224937ab8ce612.jpg`
- `images/72fabc6325ec83c23065743cd2f10e.jpg`
- `images/a44778616c13e342f99a8a1ef81cb6.png`
- `images/b8cef581229e97f51bcd35e98b2188.jpg`
- `images/cc38f21f3e13463d7249140ed80282.jpg`
- `images/f6d4f33b30bd2bb0a7916d44c17e2a.png`

## 6. 已识别缺口

- `PRD` 中有 `/mix`，但当前目录里没有对应静态页，需要补建。
- 现有静态结构存在大量 sidebar 重复，说明组件边界尚未沉淀。
- `css/custom.css` 是单文件堆叠，迁移时需要切分，否则会继续放大耦合。
- `yinpin.html`、`aigongju.html` 已存在，但暂未进入主计划优先级。

## 7. 首批迁移优先顺序

1. `css/custom.css` 的 token 与共享壳层样式
2. `js/shared.js` 的 mock auth / toast / 用户菜单
3. `index.html` + `js/app.js`
4. `login.html` + `register.html` + `js/auth.js`
5. `shipin.html`
6. `zuotu.html`
7. `biandao.html`
8. `zichan.html`
9. `settings.html`
10. `notice.html`
