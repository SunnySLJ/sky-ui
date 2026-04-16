# sky-ui

`sky-ui` 是一个基于 `Next.js` 的 Timarsky 高保真前端复刻项目。

当前仓库只保留项目本体：

- Next.js 应用源码
- 复刻用静态原稿归档
- PRD / 计划 / 迁移文档

## 快速开始

安装依赖：

```bash
pnpm install
```

启动开发环境：

```bash
pnpm dev
```

生产构建与启动：

```bash
pnpm build
pnpm start
```

默认端口：

- 开发环境：`http://localhost:8888`
- 生产启动：`http://localhost:8888`

## 目录说明

- `app/`
  Next App Router 路由入口与页面组合。
- `components/`
  React 组件，按 `shell`、`home`、`auth`、`workspace` 等域拆分。
- `lib/`
  mock 数据、配置、工具函数。
- `public/`
  Next 正式使用的静态资源目录。
- `styles/`
  主题 token 与补充样式。
- `html/`
  旧静态原稿归档目录，仅用于视觉和结构对照。
- `docs/`
  PRD、实施计划、迁移清单等文档。

## 当前口径

- `Next.js` 是唯一正式前端框架。
- `html/` 中的内容不是正式实现，只是迁移参考资产。
- 新页面开发、组件抽取、状态组织均在 Next 工程内完成。

## 文档入口

- 文档导航：[docs/INDEX.md](/Users/h/Desktop/sky-ui/docs/INDEX.md)
- 文档目录说明：[docs/README.md](/Users/h/Desktop/sky-ui/docs/README.md)
- 静态原稿说明：[html/README.md](/Users/h/Desktop/sky-ui/html/README.md)
# sky-ui
