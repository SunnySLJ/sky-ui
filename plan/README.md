# 页面抓取说明

> 生成时间: 2026-04-16
> 来源: https://www.timarsky.com (使用账号 97541111 登录后抓取)

## 已完成的页面 (无需开发)

| 页面 | 路由 | 状态 |
|------|------|------|
| 灵感 | `/` | 已完成 |
| 做图 | `/banana` | 已完成 |
| 视频 | `/video` | 已完成 |

## 页面优化记录

### 做图页面 (/banana)
- 上传卡片图标改为虚线边框，尺寸增大 (62px → 72px)
- 上传卡片添加 hover 边框高亮效果
- 上传卡片圆角增大 (10px → 12px)，内边距优化
- 生成按钮添加 hover 悬浮上移 + 阴影增强效果
- 右侧面板流程图文案字号优化 (16px → 15px)
- 参考截图: `banana-reference.png`

### 视频页面 (/video)
- 历史记录卡片添加 hover 边框高亮效果
- 历史记录卡片底部间距优化
- 操作按钮添加 hover 背景高亮效果
- 上传区域图标改为虚线边框，尺寸增大
- 上传区域添加 hover 背景高亮效果
- 生成按钮添加 hover 悬浮上移 + 阴影增强效果
- 标签行和预览区域间距优化
- 参考截图: `video-reference.png`

## 待开发的页面

### 1. 编导 (`/biandao`)
- 5个tab: 文案二创, 立项管理, 行业选题, 文案自创, 我的文案库
- 截图: `biandao-screenshot.png`, `biandao-tab2-立项管理.png`, `biandao-tab3-行业选题.png`, `biandao-tab4-文案自创.png`, `biandao-tab5-我的文案库.png`
- 完整HTML: `biandao-full.html`

### 2. 音频 (`/audio`)
- **线上返回404** - 该页面尚未上线
- 参考本地 `html/pages/audio.html` (只有"即将上线"占位)
- 需要自行设计音频创作工作台

### 3. 资产 (`/asset`)
- 5个主tab: 作品, 分身, 音频, 素材, 文案
- 作品tab下有子tab: 造梦视频, 香蕉作品, 混剪成片, 替换/迁移, 电商作品, 智能包装
- 分身tab下有子tab: 照片形象, 燃动分身, 对口型视频
- 截图: `asset-screenshot.png`, `asset-tab-分身.png`
- 已有的 `/asset` 页面已完成基本框架

### 4. AI工具 (首页点击AI工具按钮)
- 显示工具卡片: Nano Banana, 索拉, 马克, 威尔
- 顶部Banner: AI角色替换/动作迁移
- 点击AI工具后URL不变(仍是`/`)，通过SPA路由切换内容
- 截图: `tools-clicked.png`, `tools-screenshot.png`
- 完整HTML: `timarsky-full.html` (AI工具状态)

### 5. 消息公告 (`/notice`)
- 需要登录才能访问
- 已有的 `/notice` 页面已完成

### 6. 设置 (`/settings`)
- 需要登录才能访问
- 已有的 `/settings` 页面已完成

### 7. AI超级混剪 (`/mix`)
- 已有的 `/mix` 页面已完成

## 工具/模型信息 (从API获取)

### 引导视频列表 (api/index/guide)
| 名称 | 说明 |
|------|------|
| 燃动数字人 | AI数字人生成 |
| 有图必应 | 图像搜索工具 |
| 威尔视频 | 视频生成模型 |
| 索拉使用指南 | 索拉模型指南 |
| 马克使用指南 | 马克模型指南 |
| 香蕉使用指南 | 香蕉模型指南 |
| 超级分身 | 数字分身功能 |
| 索拉智能包装 | 智能包装功能 |
| 索拉常见问题 | FAQ |
| 一键拆解 | 视频拆解工具 |
| 超级混剪 | 混剪工具 |
| AI润色全球翻译 | AI润色+翻译 |
| 角色替换/动作迁移 | 角色/动作替换 |

### 模型工具
- **Nano Banana**: 专业级图片生成
- **索拉 (Sora)**: 文生视频模型
- **马克 (Mark)**: 视频生成模型
- **威尔 (Will)**: 视频生成模型
- **方舟**: 视频生成模型

## 侧边栏导航结构

```
logo
├── 灵感 (/)
├── 编导 (/biandao)
├── 做图 (/banana)
├── 音频 (/audio) - 404
├── 视频 (/video)
├── 资产 (/asset)
└── AI工具 (首页SPA切换)

底部:
├── API
├── 通知
├── 获取点数 (50)
└── 用户头像
```

## 文件清单

- `banana-reference.png` - 线上做图页面参考 (2026-04-16)
- `video-reference.png` - 线上视频页面参考 (2026-04-16)
- `biandao-screenshot.png` - 编导-文案二创tab
- `biandao-tab2-立项管理.png` - 编导-立项管理tab
- `biandao-tab3-行业选题.png` - 编导-行业选题tab
- `biandao-tab4-文案自创.png` - 编导-文案自创tab
- `biandao-tab5-我的文案库.png` - 编导-我的文案库tab
- `biandao-full.html` - 编导页面完整HTML
- `asset-screenshot.png` - 资产-作品tab
- `asset-tab-分身.png` - 资产-分身tab
- `audio-screenshot.png` - 音频页面(404)
- `tools-clicked.png` - AI工具页面(点击后)
- `tools-screenshot.png` - AI工具页面
- `timarsky-full.html` - 首页完整HTML(AI工具状态)
- `timarsky-tools.html` - AI工具页面HTML
