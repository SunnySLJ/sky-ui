# Timarsky 1:1 复刻实施计划

更新时间：2026-04-16

## 0. 当前进度

- `Phase 0`：已完成
- `Phase 1`：已完成
- `Phase 2`：进行中
- `Phase 3`：进行中
- `Phase 4`：进行中
- `Phase 5`：未开始
- `Phase 6`：未开始

### 最近一次开发记录

日期：2026-04-15

已完成：

- 完成目标站公开路由与登录后核心路由调研，冻结首版范围。
- 新增共享状态模块 `js/shared.js`，统一 mock 登录态、点数、toast、退出登录。
- 首页接入共享壳层，补上用户菜单与未开发入口提示。
- 登录页、注册页接入统一 mock 流程与 toast 反馈。
- 补充全局 toast / 用户菜单 / auth 响应式基础样式。
- 工作台页面统一接入共享壳层与登录拦截逻辑。
- 新增 `notice.html`、`settings.html`，补齐辅助页首版结构。
- 将 `biandao.html` 从占位页升级为可用的文案工作台首屏。

当前停留位置：

- `Phase 1` 已完成。
- 当前正在并行推进 `Phase 2 / Phase 3 / Phase 4` 的首版落地。
- 下次优先回到 `Phase 2` 做首页、登录页、注册页的视觉细节对齐与截图校正。

下次开发建议顺序：

1. 精修首页顶部、筛选条、瀑布流卡片细节。
2. 精修登录页、注册页的版式、按钮、输入框、协议区。
3. 精修 `/video`、`/banana`、`/asset` 的视觉细节与空态。
4. 完成与目标站的第一轮截图对比。

### 技术决策补充

- 正式前端框架改为 `Next.js`。
- 当前仓库内的静态 HTML / CSS / JS 产物仅作为复刻采样和视觉过渡稿，不再视为最终架构。
- 后续统一页面架构、路由、共享布局、组件拆分、状态组织，全部以 Next 工程为准。
- 参考仓库固定为 `https://github.com/SunnySLJ/next.js`（fork 自 `vercel/next.js`，当前 GitHub 页面显示默认分支为 `canary`）。

## 1. 执行原则

- 先冻结目标版本，再开始实现。
- 先确定 Next 工程骨架与共享布局，再逐页复刻。
- 先完成高频页面和首屏，再补深层弹窗与边缘流程。
- 每个阶段都要做“截图对比 + DOM 对比 + 交互对比”。
- 静态页面可用于快速比对，但不继续扩展为长期正式架构。

## 1.1 前端架构口径

目标：

- 使用 `Next.js` 作为唯一正式前端框架。
- 将当前多页面静态文件迁移为统一的 App Router / 共享 Layout / 页面级组件结构。

建议目录方向：

- `app/`：页面路由与共享 layout。
- `components/`：sidebar、header、toast、workspace panel、card 等复用组件。
- `lib/`：mock 数据、页面配置、通用工具。
- `public/`：图片、图标、静态资源。
- `styles/`：全局 token、主题变量、基础样式。

迁移原则：

- 先迁共享壳层，再迁首页、登录、注册，再迁工作台页面。
- 旧静态页面作为视觉与文案对照源，不继续作为主实现层。
- 每迁完一页就做一次截图对比，避免迁移过程中出现样式漂移。

## 1.2 Next 目录草案

建议采用 App Router，目录草案如下：

```text
app/
  layout.tsx
  globals.css
  page.tsx
  login/page.tsx
  register/page.tsx
  video/page.tsx
  banana/page.tsx
  biandao/page.tsx
  mix/page.tsx
  asset/page.tsx
  settings/page.tsx
  notice/page.tsx

components/
  shell/
    app-shell.tsx
    auth-shell.tsx
    sidebar.tsx
    topbar.tsx
    user-menu.tsx
    toast-host.tsx
  home/
    hero-banner.tsx
    filter-bar.tsx
    card-grid.tsx
    case-card.tsx
  auth/
    login-form.tsx
    register-form.tsx
    agreement-check.tsx
  workspace/
    workspace-header.tsx
    prompt-panel.tsx
    upload-panel.tsx
    history-panel.tsx
    model-tabs.tsx
  notice/
    notice-list.tsx
    notice-detail.tsx
  settings/
    theme-settings.tsx
    language-settings.tsx
    notification-settings.tsx

lib/
  mock/
    user.ts
    home.ts
    video.ts
    banana.ts
    biandao.ts
    mix.ts
    asset.ts
    notice.ts
    settings.ts
  config/
    nav.ts
    routes.ts
  utils/
    cn.ts
    storage.ts
    auth.ts
    toast.ts

public/
  images/
  icons/

styles/
  tokens.css
  theme.css
```

目录说明：

- `app/` 只放路由入口、页面组合和全局 layout，不堆页面细节。
- `components/shell/` 承担所有共享壳层，避免 sidebar 在每页重复实现。
- `components/home/`、`components/auth/`、`components/workspace/` 按页面域拆分，而不是继续按旧 HTML 文件拆。
- `lib/mock/` 承接当前静态页里的假数据和登录态逻辑，替代 `js/shared.js` 的直接 DOM 操作。
- `styles/` 承接当前 `css/custom.css` 的 token 和主题变量，逐步拆薄。

## 1.3 静态页到 Next 路由映射

- `index.html` -> `app/page.tsx`
- `login.html` -> `app/login/page.tsx`
- `register.html` -> `app/register/page.tsx`
- `shipin.html` -> `app/video/page.tsx`
- `zuotu.html` -> `app/banana/page.tsx`
- `biandao.html` -> `app/biandao/page.tsx`
- 缺失静态页中的 `/mix` -> `app/mix/page.tsx`
- `zichan.html` -> `app/asset/page.tsx`
- `settings.html` -> `app/settings/page.tsx`
- `notice.html` -> `app/notice/page.tsx`
- `yinpin.html`、`aigongju.html` 暂时归为扩展页面，不进入首批核心迁移

## 1.4 从当前静态页迁移到 Next 的分步清单

### Step 1：建立 Next 基础工程

- 初始化 Next 项目，确定使用 App Router。
- 接入全局样式入口，把 `css/custom.css` 拆为 `app/globals.css` + `styles/tokens.css`。
- 导入 `images/`、`icons/` 到 `public/`。

交付物：

- 能跑通的 Next 首页空骨架。
- 静态资源在 Next 中可访问。

### Step 2：迁移共享壳层

- 将当前 sidebar、点数区、头像菜单、toast 迁成 React 组件。
- 将 `js/shared.js` 的登录态、退出登录、toast 逻辑迁到 `lib/mock/` + React state。
- 抽出 `AppShell` 与 `AuthShell` 两套布局。

来源文件：

- `js/shared.js`
- `css/custom.css`
- `index.html`
- `shipin.html`
- `zichan.html`

交付物：

- `components/shell/*`
- 共享 layout 可供首页、工作台页、登录页复用。

### Step 3：迁移公开页面

- 先迁 `app/page.tsx`。
- 再迁 `app/login/page.tsx`、`app/register/page.tsx`。
- 将首页卡片数据从 `js/app.js` 提取到 `lib/mock/home.ts`。

来源文件：

- `index.html`
- `login.html`
- `register.html`
- `js/app.js`
- `js/auth.js`

交付物：

- 首页、登录页、注册页都运行在 Next 中。
- 登录链路在 Next 内闭环可用。

### Step 4：迁移核心工作台页面

- 迁移 `video`、`banana`、`biandao`、`mix`。
- 复用同一套 `WorkspaceHeader`、`PromptPanel`、`UploadPanel`、`HistoryPanel`。
- 将每页差异沉淀为配置，而不是重复写整页 DOM。

来源文件：

- `shipin.html`
- `zuotu.html`
- `biandao.html`
- 当前缺失的 `/mix` 页面需求按 PRD 补齐

交付物：

- 4 个核心工作台在 Next 内可切换。
- 页面骨架复用率明显高于静态版。

### Step 5：迁移辅助页面

- 迁移 `asset`、`settings`、`notice`。
- 将列表、设置项、公告详情抽成小组件。

来源文件：

- `zichan.html`
- `settings.html`
- `notice.html`

交付物：

- 辅助页面全部收口到 Next 路由体系。

### Step 6：清理旧静态实现

- 保留静态页作为迁移期对照参考。
- 新页面稳定后，将旧的 `js/app.js`、`js/auth.js`、`js/shared.js` 停止作为主实现来源。
- 补齐截图对比、响应式修正、状态校验。

交付物：

- Next 成为唯一正式实现。
- 静态页面退化为参考资产，而不是并行维护代码。

## 2. 分阶段计划

### Phase 0：冻结基线与资产采样

状态：已完成

目标：

- 固定复刻目标版本。
- 建立页面地图、截图库、文案库、资源清单。

任务：

- 采集 `/`、`/login`、`/register`、`/video`、`/asset`、`/banana`、`/biandao`、`/mix`、`/settings`、`/notice` 的桌面端截图。
- 采集移动端截图。
- 导出页面文案、主图、图标、公告、分类标签。
- 记录 header、footer、按钮、输入框、卡片、toast、tab、上传区的视觉规格。

交付物：

- 页面路由清单。
- 截图基线包。
- 资源映射表。
- 文案映射表。

### Phase 1：搭建全局框架

状态：已完成

目标：

- 完成首版公共壳层验证，并明确后续迁移到 Next 的正式架构。

任务：

- 抽离全局颜色、边框、圆角、阴影、字号、间距 token。
- 实现全局 header、footer、容器、页面过渡、toast、弹层基础能力。
- 统一登录前/登录后导航壳层。
- 明确 Next 迁移目标：共享 layout、共享导航、共享状态入口。

验收：

- 所有页面共享同一套基础骨架。
- 公共组件在视觉上与原站接近。
- 已确认静态版公共壳层可作为 Next 组件拆分输入。

### Phase 2：公开页面复刻

状态：进行中

目标：

- 完成首页、登录页、注册页的 1:1 复刻。

任务：

- 复刻首页导航、案例区、教程区、筛选区、页脚。
- 复刻登录页的账号密码登录、验证码登录切换、协议勾选、提示态。
- 复刻注册页结构与视觉。

验收：

- 首页和登录链路可单独对比通过。

### Phase 3：核心工作台复刻

状态：进行中

目标：

- 完成视频、香蕉生图、编导、混剪 4 个核心工作台。

任务：

- `/video`：模型切换、上传区、提示词、参数区、历史记录。
- `/banana`：模式切换、参考图、脚本输入、案例区、生成参数。
- `/biandao`：模块入口、立项管理区、文案工作流。
- `/mix`：素材上传、提示词、生成入口、历史记录。

验收：

- 4 个页面首屏及主要工作区高保真。
- tab、输入、按钮、上传反馈、历史记录样式一致。

### Phase 4：补齐辅助页面

状态：进行中

目标：

- 完成资产、设置、公告等产品配套页面。

任务：

- `/asset`：二级分类、资源列表、提示条、空态。
- `/settings`：主题、语言、通知设置。
- `/notice`：公告列表和详情样式。

验收：

- 配套页面视觉与信息层级对齐原站。

### Phase 5：深层交互与弹窗补齐

状态：未开始

目标：

- 补全从首屏无法直接看全的二级流程。

任务：

- 继续采样素材库、香蕉作品、引用弹窗、协议弹层、历史记录详情、更多筛选。
- 还原 hover、focus、disabled、loading、error、success 态。
- 检查登录后跨页面状态一致性。

验收：

- 二级流程不再出现明显断层。

### Phase 6：响应式与质量校验

状态：未开始

目标：

- 确保移动端、平板端、宽屏端表现稳定。

任务：

- 调整断点布局。
- 确保表单、卡片、筛选、上传区在小屏可用。
- 做一轮完整 UI QA。

验收：

- 无明显溢出、错位、层级错误、交互失效。

## 3. 优先级

### P0

- `/`
- `/login`
- `/register`
- `/video`
- `/banana`
- `/biandao`
- `/mix`
- 全局 header / footer / toast / 弹层基础样式

### P1

- `/asset`
- `/settings`
- `/notice`
- 首页更多筛选和案例细节

### P2

- 深层弹窗、素材库、更多工作流分支
- 更细粒度的动效与边缘状态

## 4. 推荐实施方式

### 方案 A：Next 高保真复刻优先

适合：

- 先把页面统一到 Next 架构里，再逐页做高保真复刻。
- 后续继续保留 mock 数据，再视需要接真实接口。

优点：

- 架构统一，不再继续堆叠分散的静态 HTML。
- 共享 layout、共享组件、共享状态更容易维护。
- 后续接接口、做响应式、补交互成本更低。

实施要点：

- 基于 `https://github.com/SunnySLJ/next.js` 作为 Next 参考仓库。
- 先建立最小可运行的 Next 工程骨架。
- 先迁全局 sidebar / header / toast / auth shell，再迁页面内容。
- 保留当前静态页面作为截图比对和结构参考。

### 方案 B：Next 复刻与接口模拟并行

适合：

- 需要尽快演示完整工作流。

优点：

- 可直接演示登录后操作链路。
- 页面和 mock 数据可在同一工程内统一管理。

风险：

- 早期会被接口模拟牵扯节奏。

当前建议先走方案 A，在 Next 架构稳定后再逐步补方案 B。

## 5. 任务拆解建议

### Sprint 1

状态：已完成

- 完成基线截图与资源清单。
- 完成全局样式系统。
- 完成首页、登录页、注册页。

### Sprint 2

状态：进行中

- 完成 `/video`、`/banana`。

### Sprint 3

状态：进行中

- 完成 `/biandao`、`/mix`、`/asset`。

### Sprint 4

状态：进行中

- 完成 `/settings`、`/notice`。
- 补充深层交互和 QA 修正。

## 6. 验收方法

- 同尺寸截图并排比对。
- DOM 结构和视觉层级对照。
- 核心路径手测：首页进入、登录、切换工作台、输入内容、上传素材、查看历史、查看公告、切换设置。
- 响应式手测：桌面、平板、手机。

## 7. 主要风险

- 目标站是动态迭代产品，若不冻结版本会导致复刻目标持续漂移。
- 若追求“业务也 1:1”，工作量会从前端复刻升级到全链路重建。
- 登录后深层功能很多，若不先分优先级，项目会拖成无边界复刻。

## 8. 需要你确认的两件事

1. 首版是否只要求前端高保真 1:1，接口先用 mock / 假数据。
2. 首版范围是否按 `P0 + P1` 执行，还是要一开始就把所有登录后深层流程全部纳入。

## 9. 已确认执行口径

- 采用“前端高保真 1:1 + mock 接口”方案。
- 首版范围固定为 `P0 + P1`。
- `P2` 深层弹窗、素材库深流程、更多边缘状态不进入首版交付。
