# 冰封协议

一个可部署到 Cloudflare Pages 的首版互动测试骨架。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

产物输出到 `dist/`。

## Cloudflare Pages

推荐配置：

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20`

如果要用自定义域名：

1. 在 Spaceship 购买域名。
2. 把域名 nameservers 改成 Cloudflare 提供的 nameservers。
3. 在 Cloudflare Pages 项目里绑定你的主域或子域。

这个仓库已经包含 `public/_redirects`，所以部署到 Cloudflare Pages 后可直接作为 SPA 使用。

## 当前目录结构

```txt
src/
  data/
    identities.ts
    questions.ts
    types.ts
  lib/
    scoring.ts
    storage.ts
  App.tsx
  main.tsx
  styles.css
```
