<div align="center">

# StudyLynx

**根据课程、目标和学习风格，找到最合适的学习伙伴。**

一个面向多伦多大学社区的移动优先、高保真前端可交互原型，
用于大学学习伙伴匹配应用。

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[English](./README.md) | 中文简体

</div>

---

## 目录

- [项目简介](#项目简介)
- [核心功能](#核心功能)
- [技术栈](#技术栈)
- [安装指南](#安装指南)
- [使用说明](#使用说明)
- [项目结构](#项目结构)
- [路由与接口](#路由与接口)
- [环境变量](#环境变量)
- [部署（GitHub Pages）](#部署github-pages)
- [演示账号](#演示账号)
- [架构概览](#架构概览)
- [贡献指南](#贡献指南)
- [支持与联系](#支持与联系)

---

## 项目简介

StudyLynx 是一个可交互原型，展示大学生如何找到并联系合适的学习伙伴。与通用社交应用不同，StudyLynx 基于**学术标准**进行匹配 — 共同课程、学习目标、偏好的学习方式和校园位置。

该原型保留了纸质原型的结构和流程，同时融入了基于评估的可用性改进。它完全运行在浏览器中，使用模拟数据和 `localStorage` 持久化 — 无需后端服务器或数据库。

### 为什么选择 StudyLynx？

- **以学术为核心的匹配** — 不是社交或约会应用
- **通过认证建立信任** — 已认证学生徽章、专业信息、共同课程
- **隐私优先** — 可选的实时位置分享，附带明确的知情同意
- **智能排期** — 每周可用时间编辑器，集成 Google 日历
- **引导式沟通** — 预设的对话开场白，用户可在发送前自由编辑

---

## 核心功能

### 学习会话管理
- **创建学习会话** — 可指定日期、时间段、地点、课程和学习目标
- **多会话追踪** — 完整的状态生命周期：`待匹配` → `已匹配` → `已确认` → `已完成` / `已取消`
- **统一管理面板** — 按状态分组展示，每张卡片提供上下文相关的操作按钮
- **取消确认弹窗** — 内联确认对话框，防止误触取消

### 智能匹配
- **基于课程匹配** — 优先推荐选修相同课程的同学
- **多维度评分** — 综合学习方式、位置距离、学习目标和时间可用性
- **Top-3 候选人** — 在做出决定前浏览多个潜在匹配
- **推荐原因标签** — 可见的标签说明匹配推荐的理由

### 每周可用时间
- **7 天时间编辑器** — 逐天开关，设置每天的开始和结束时间
- **创建会话时自动填充** — 选择日期后自动从你的日程中填入对应时间段
- **个人资料级别的排期** — 设置一次，跨会话复用

### 校园地图
- **交互式 OpenStreetMap** — 通过 Leaflet.js 加载多大校园标记点
- **快捷位置选择器** — 支持最近使用和收藏地点
- **会话标记** — 在首页地图上显示会话位置

### 沟通交流
- **应用内聊天** — 对话标签分类：开场白、目标对齐、时间协商、后续跟进、婉拒
- **可编辑的提示词** — 建议消息填充到输入框中，可自定义后发送
- **按伙伴的聊天记录** — 跨会话持久保存

### Google 集成
- **Google 登录** — 通过 OAuth 2.0（可选 — 未配置时自动降级为演示模式）
- **Google 日历同步** — 一键导出已确认的会话，包含准确的日期和时间

### 个人资料与伙伴
- **自定义头像上传** — 客户端图片压缩（128x128 JPEG）
- **保存学习伙伴** — 收藏伙伴以便未来再次组队
- **查看伙伴资料** — 包含课程、学习习惯和可用时间

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | [Next.js 14](https://nextjs.org/)（App Router） |
| 语言 | [TypeScript 5](https://www.typescriptlang.org/) |
| 样式 | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| 图标 | [Lucide React](https://lucide.dev/) |
| 地图 | [Leaflet.js](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) |
| 认证（可选） | [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) |
| 状态管理 | React Context API + `localStorage` |
| 数据 | 基于 CSV 的模拟用户，内存中的模拟会话 |

---

## 安装指南

### 前置要求

- **Node.js** 18+ 和 **npm** 9+
- 现代浏览器（Chrome、Firefox、Edge、Safari）

### 一键启动（Windows）

双击 `run.bat`，或在终端中运行：

```bash
.\run.bat
```

首次运行自动安装依赖，自动关闭端口 3000 上的旧进程，并打开浏览器。

### VS Code / Cursor

`Ctrl+Shift+P` → **Tasks: Run Task** → **Start Study Buddy**

### 手动安装

```bash
# 克隆仓库
git clone https://github.com/JoeZhu-CS/StudyLink.git
cd StudyLink

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) — 会自动重定向到登录页面。

### 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产环境构建 |
| `npm run start` | 启动生产环境服务 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run clean` | 清除 `.next` 缓存目录 |

---

## 使用说明

### 演示流程

**1. 登录 → 首页 → 匹配 → 聊天**

使用演示账号登录 → 进入首页 → 点击推荐的会话卡片 → 查看匹配详情 → 接受 → 开始与学习伙伴聊天。

**2. 创建新会话**

首页 → 点击底部中间凸起的「New Session」按钮 → 选择日期（自动从你的可用时间中填充）→ 选择地点、课程和学习方式 → 确认 → 自动开始匹配 → 查看匹配结果 → 接受或跳过。

**3. 管理会话**

底部导航「Sessions」标签 → 查看按状态分组的所有会话 → 待匹配点「Find match」、已匹配点「View match」、已确认点「Chat」→ 点击「Sync to Calendar」导出到日历 → 取消时弹出确认对话框。

**4. 设置每周可用时间**

个人资料 → 滚动到 Weekly Availability → 开关每天的可用状态 → 设置每天的开始和结束时间 → 保存。创建新会话时会自动使用这个时间表。

**5. 浏览与保存伙伴**

首页 → 浏览推荐会话 → 点击展开 → 查看学生资料 → 点击「Save Partner」 → 随时在 Partners 标签页访问已保存的伙伴。

---

## 项目结构

```
StudyLink/
├── public/
│   └── users.csv                  # 演示账号（邮箱、密码、姓名）
├── src/
│   ├── app/                       # Next.js App Router 页面
│   │   ├── layout.tsx             # 根布局，包含全局 Provider（OAuth、Store、RouteGuard）
│   │   ├── globals.css            # Tailwind 层、CSS 变量、自定义样式
│   │   ├── page.tsx               # 根路径重定向 → /login
│   │   ├── login/page.tsx         # 认证页面（邮箱密码、Google、演示模式）
│   │   ├── home/page.tsx          # 首页仪表盘（地图、会话摘要、推荐列表）
│   │   ├── new-session/page.tsx   # 创建会话表单（含日期选择器）
│   │   ├── matching/page.tsx      # 匹配动画 + 算法执行
│   │   ├── match-found/page.tsx   # 匹配结果查看（接受 / 跳过 / 保存）
│   │   ├── sessions/page.tsx      # 会话管理面板（按状态分组）
│   │   ├── chat/page.tsx          # 应用内聊天（含提示标签页）
│   │   ├── profile/page.tsx       # 个人资料编辑（可用时间 & 头像）
│   │   ├── profile/[userId]/      # 查看其他用户资料
│   │   ├── saved-partners/page.tsx# 已保存的学习伙伴列表
│   │   ├── locations/page.tsx     # 地点搜索与选择
│   │   ├── browse/page.tsx        # 浏览所有可用会话
│   │   └── error/page.tsx         # 错误状态页面
│   ├── components/                # 可复用 UI 组件
│   │   ├── MobileFrame.tsx        # 手机框视口包装器
│   │   ├── TopBar.tsx             # 顶部导航栏（返回箭头 + 标题/位置）
│   │   ├── BottomNav.tsx          # 5 标签底部导航栏（条件显示文字）
│   │   ├── Avatar.tsx             # 统一头像组件（首字母 / 图片 / URL）
│   │   ├── RouteGuard.tsx         # 认证 + 资料完成度守卫
│   │   ├── GoogleOAuthWrapper.tsx # SSR 安全的 Google OAuth Provider
│   │   ├── WeeklyAvailabilityEditor.tsx  # 7 天日程编辑器
│   │   ├── MapPreviewCard.tsx     # 动态 Leaflet 地图加载器
│   │   ├── CampusMap.tsx          # 交互式校园地图（含标记点）
│   │   ├── SessionCardCollapsed.tsx / SessionCardExpanded.tsx
│   │   ├── ProfileInfoCard.tsx    # 头像 + 姓名 + 认证徽章
│   │   ├── SavedPartnerCard.tsx   # 伙伴卡片（聊天 / 查看资料）
│   │   ├── ChatComposer.tsx       # 消息输入框（含提示词）
│   │   ├── BottomSheet.tsx        # 上滑选择面板
│   │   └── InputField.tsx / DropdownField.tsx / SearchableDropdown.tsx / ...
│   ├── context/
│   │   └── AppStoreContext.tsx     # 全局状态（React Context + localStorage）
│   └── lib/
│       ├── store-types.ts         # 类型定义、Store 读写、版本控制
│       ├── mock-data.ts           # 11 名学生、11 个会话、匹配算法
│       ├── auth.ts                # 基于 CSV 的认证
│       ├── calendar.ts            # Google 日历 URL 构建器
│       ├── image-utils.ts         # 客户端图片压缩
│       └── utils.ts               # Tailwind 类名合并工具（cn）
├── tailwind.config.ts             # 主题令牌、HSL 颜色系统
├── tsconfig.json                  # TypeScript 严格模式、路径别名
├── next.config.js                 # Next.js 配置
├── package.json                   # 依赖和脚本
└── run.bat                        # Windows 一键启动器
```

---

## 路由与接口

### 页面路由

| 路由 | 说明 | 关键参数 |
|------|------|----------|
| `/login` | 认证页面 | — |
| `/home` | 首页仪表盘（地图 + 推荐） | `?no-match=1`（提示无匹配） |
| `/new-session` | 创建新学习会话 | — |
| `/matching` | 匹配查找动画 | `?sessionId=<id>` 或 `?from=recommended` |
| `/match-found` | 查看匹配到的伙伴 | `?sessionId=<id>` |
| `/sessions` | 会话管理面板 | — |
| `/chat` | 应用内聊天 | `?partner=<studentId>&tab=<tabId>` |
| `/profile` | 编辑个人资料 | `?new=1`（首次注册引导） |
| `/profile/[userId]` | 查看其他用户资料 | — |
| `/saved-partners` | 已保存的学习伙伴 | — |
| `/locations` | 地点搜索与选择 | — |
| `/browse` | 浏览所有可用会话 | — |
| `/error` | 错误状态 | — |

### 状态管理 API

`useAppStore()` Hook 暴露以下方法：

| 方法 | 说明 |
|------|------|
| `login(profile)` | 认证并设置用户数据 |
| `logout()` | 清除会话，重置为默认状态 |
| `updateProfile(partial)` | 更新用户资料字段 |
| `addSession(session)` | 创建新的 `UserSession`，返回 ID |
| `updateSessionStatus(id, status, matchedWith?)` | 转换会话生命周期状态 |
| `removeSession(id)` | 删除一个会话 |
| `getSessionById(id)` | 查找会话 |
| `setMatchedPartner(partner)` | 存储当前匹配结果 |
| `setMatchedPartners(partners)` | 存储 Top-N 匹配候选人 |
| `addSavedPartner(partner)` | 保存一个学习伙伴 |
| `removeSavedPartner(id)` | 移除已保存的伙伴 |
| `getChatMessages(partnerId)` | 获取聊天记录 |
| `addChatMessage(partnerId, msg)` | 追加一条聊天消息 |
| `resetStore()` | 恢复出厂设置，清除所有数据 |

### 数据模型

<details>
<summary><strong>UserSession（用户会话）</strong></summary>

```typescript
interface UserSession {
  id: string
  date: string          // "YYYY-MM-DD"
  startTime: string     // "HH:MM"（24 小时制）
  endTime: string       // "HH:MM"（24 小时制）
  location: string
  subject: string
  studyStyle: string
  goals: string
  status: "upcoming" | "matched" | "confirmed" | "completed" | "cancelled"
  matchedWith?: {
    studentId: string
    sessionId: string
  } | null
}
```

</details>

<details>
<summary><strong>UserProfile（用户资料）</strong></summary>

```typescript
interface UserProfile {
  name: string
  avatar: string
  email: string
  subject: string
  programType: string
  level: string
  year: number
  courses: string
  preferredTime: string
  weeklyAvailability?: WeeklyAvailability
  habits: string
  bio: string
  defaultLocation: string
  studentId?: string
}
```

</details>

<details>
<summary><strong>WeeklyAvailability（每周可用时间）</strong></summary>

```typescript
type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

interface DayAvailability {
  enabled: boolean
  start: string   // "HH:MM"
  end: string     // "HH:MM"
}

type WeeklyAvailability = Record<DayKey, DayAvailability>
```

</details>

---

## 环境变量

| 变量 | 是否必需 | 说明 |
|------|----------|------|
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | 否 | Google OAuth Client ID，用于登录和日历同步。未配置时应用自动降级为演示模式，功能完整可用。 |

配置 Google OAuth 的步骤：

1. 在 [Google Cloud Console](https://console.cloud.google.com/) 创建项目
2. 启用 **Google Identity Services** API
3. 创建 OAuth 2.0 客户端 ID（Web 应用类型）
4. 在「已获授权的 JavaScript 来源」中添加 `http://localhost:3000`
5. 在项目根目录创建 `.env.local`：

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

> **注意：** 不配置此变量应用也能完整运行。Google 登录和日历同步将使用演示模式 / 基于 URL 的降级方案。

---

## 部署（GitHub Pages）

本项目使用 **静态导出**（`next build` 生成 `out/`），可免费托管在 [GitHub Pages](https://pages.github.com/)。线上地址一般为：

`https://<你的用户名>.github.io/<仓库名>/`

### 仓库一次性设置

1. 在 GitHub 打开仓库 → **Settings** → **Pages**。
2. **Build and deployment** → **Source** 选择 **GitHub Actions**（不要选 “Deploy from a branch”）。
3. 保存。

### 自动部署

工作流 [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) 会在推送到 `main` 或 `master` 时运行，它会：

- 将 `NEXT_PUBLIC_BASE_PATH` 设为 `/<仓库名>`，使资源与路由在「项目页」子路径下正确工作；
- 上传 `out/` 目录并通过官方 Pages 部署动作发布。

首次成功后，在 **Actions** → 最新的 **Deploy to GitHub Pages** → **deploy** 任务中可看到 **page URL**。

### 本地模拟子路径构建

```bash
# Windows PowerShell
$env:NEXT_PUBLIC_BASE_PATH="/YourRepoName"; npm run build
npx serve out
```

浏览器访问终端提示的地址（若需子路径，路径末尾加上 `/YourRepoName/`）。

### GitHub Pages 上的 Google 登录

若启用 Google 登录，请在 Google Cloud Console 的 OAuth 客户端「已获授权的 JavaScript 来源」中加入生产环境，例如：

`https://your-username.github.io`

---

## 演示账号

认证使用 CSV 文件（`public/users.csv`），以下账号均可登录：

| 邮箱 | 密码 | 姓名 |
|------|------|------|
| `demo@utoronto.ca` | `demo123` | Demo User |
| `alex@mail.utoronto.ca` | `alex123` | Alex Chen |
| `diego@mail.utoronto.ca` | `diego123` | Diego Zhu |
| `jordan@mail.utoronto.ca` | `jordan123` | Jordan Lee |
| `sam@mail.utoronto.ca` | `sam123` | Sam Patel |
| `maya@mail.utoronto.ca` | `maya123` | Maya Kim |

也可以在登录界面直接点击 **「Try Demo」** 跳过输入凭据。

使用任意邮箱注册新账号后，会自动引导完成个人资料设置才能使用其他功能。

---

## 架构概览

```
┌─────────────────────────────────────────────────┐
│                    浏览器                        │
├─────────────────────────────────────────────────┤
│  GoogleOAuthWrapper                             │
│  └─ AppStoreProvider（React Context）            │
│     └─ MobileFrame（手机视口）                    │
│        └─ RouteGuard（认证 + 资料完整性检查）      │
│           └─ 页面路由（App Router）               │
│              └─ TopBar + 页面内容 + BottomNav    │
├─────────────────────────────────────────────────┤
│  localStorage（study-buddy-store，版本: 2）       │
│  ├─ 用户资料与偏好设置                            │
│  ├─ 会话列表（UserSession[]）                     │
│  ├─ 匹配到的伙伴                                 │
│  ├─ 已保存的伙伴                                 │
│  └─ 聊天消息（按伙伴分组）                        │
├─────────────────────────────────────────────────┤
│  模拟数据层                                      │
│  ├─ 11 名学生（含每周可用时间）                    │
│  ├─ 11 个会话（动态未来日期）                      │
│  ├─ 基于 CSV 的认证                              │
│  └─ 匹配算法（课程、学习方式、目标）               │
└─────────────────────────────────────────────────┘
```

### 状态持久化

- 所有用户数据存储在 `localStorage` 中，键名为 `study-buddy-store`
- Store 版本控制（`v2`）确保旧格式数据自动迁移
- 损坏或过期的数据在加载时静默清除
- `resetStore()` 执行全部数据的出厂重置

### 路由保护

`RouteGuard` 组件实施以下规则：
1. **未登录用户** → 重定向到 `/login`
2. **已登录但资料未完成** → 重定向到 `/profile?new=1`
3. **公开路由**（`/login`、`/`）跳过所有检查

---

## 贡献指南

欢迎贡献代码！以下是参与步骤：

1. **Fork** 本仓库
2. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **进行修改** — 遵循现有代码风格：
   - TypeScript 严格模式
   - 使用 Tailwind CSS 编写所有样式
   - 函数式组件 + Hooks
   - 客户端组件使用 `"use client"` 指令
4. **本地测试**
   ```bash
   npm run build   # 确保没有构建错误
   npm run lint     # 确保没有 lint 错误
   ```
5. **使用描述性消息提交**
   ```bash
   git commit -m "feat: 你的功能描述"
   ```
6. **推送并创建 Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### 提交规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

| 前缀 | 用途 |
|------|------|
| `feat:` | 新功能 |
| `fix:` | Bug 修复 |
| `refactor:` | 代码重构（无行为变更） |
| `docs:` | 仅文档修改 |
| `style:` | 格式、空白字符 |
| `chore:` | 构建工具、依赖 |

---

## 支持与联系

- **问题反馈**：[GitHub Issues](https://github.com/JoeZhu-CS/StudyLink/issues)
- **仓库地址**：[github.com/JoeZhu-CS/StudyLink](https://github.com/JoeZhu-CS/StudyLink)

---

<div align="center">

使用 Next.js、TypeScript 和 Tailwind CSS 构建，服务于多伦多大学。

</div>
