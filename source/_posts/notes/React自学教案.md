---
title: React知识
date: 2026-10-17 17:00
categories: 学习
tags: [前端]
---

---

`代码在d盘react-demo`

# 第一部分 React 基础

## 第 1 课：React 概述、脚手架、JSX

### React 是一个前端 JavaScript 库，用于构建用户界面，核心聚焦视图层。

1. **核心思想**：组件化开发，页面拆分为独立可复用组件；采用**虚拟 DOM**，减少真实 DOM 操作，提升渲染性能。
2. **语法**：使用 JSX，在 JS 中写类 HTML 标签，最终编译为 JS。
3. **数据特点**：单向数据流，数据自上向下传递；状态`state`驱动视图，状态改变触发页面更新。
4. **版本**：React16 及以前以类组件为主；React18 主推**函数组件 + Hooks**（useState、useEffect 等）。
5. **定位**：只负责 UI 渲染，搭配路由 React Route等构成完整前端项目。

### ① 项目结构是怎么搭起来的（脚手架）

**`2(1)basic.jsx` **：

1. **前置条件**：先装好 Node.js。
2. **建项目**：选一个文件夹 → 打开终端 → `npm init vite@latest` → 给项目命名 → 框架选 react → 语言选 JS+React。
3. **目录作用**：
   - `public`：静态资源，会原样提供给浏览器；
   - `src`：源代码文件夹，是核心代码的存放地，各种组件都在这里；
   - `index.html`：入口文件，运行时提供给浏览器；
   - `package.json`：配置文件，记录装了什么库（依赖项）。
4. 删了 node_modules 可以用 `npm install` 一键自动生成。

### ② 程序是怎么跑起来的（入口 → 根组件）

**`main.jsx`**（此时 `App.jsx` 注释全关，先只显示根标题）：

1. 打开 `index.html` → 里面有 `<div id="root">` 和 `<script>` 引入 `main.jsx`。
2. `main.jsx` 里 `createRoot(document.getElementById('root')).render(<App/>)`：把 `<App/>` 挂到 root 上。
3. `StrictMode` 的作用：开发环境帮忙检查潜在问题。
4. **收尾一句**：入口拿到 App 根组件 → 渲染 → 显示页面上的各种组件。

### ③ JSX 是什么、有哪些规则

1. **JSX 是语法糖**：最终会被转成 `createElement` 调用。
2. **表达式**：`{}` 大括号里遇到就当 JS 执行，可嵌入变量和表达式（`<h1>{count}</h1>`）。
3. **组件命名**：React 组件必须首字母大写；用 `export` 直接导出时不能随意改名。
4. **单一父元素**：每个组件只能返回一个元素，所有元素要包在一个封闭父容器里；可用 `<></>` 空标签当包裹组件。
5. **标签闭合**：`input`、`br` 这类 HTML 里不用闭合的标签，在 JSX 里要自闭合 `<input />`、`<br />`。
6. **属性名差异**：`class` 要写成 `className`，`for` 要写成 `htmlFor`。
7. **收尾一句**：JSX 就是「能在 JS 里写 HTML 模板的语法」，规则记四件事——表达式用 `{}`、组件大写、单父元素、`className`。

---

## 第 2 课：组件、事件处理、this 指向、表单处理

> 理解"组件" → 事件怎么绑定 → 事件函数怎么传给子组件 。

### ① 组件基础（state 让组件有交互性）

1. 组件就是返回 JSX 的函数/类，可复用、可传参，父传子。

2. 用 `useState(0)` 声明状态 `count`，`setCount` 更新它 → 页面跟着变。

3. state 是让 React 组件有交互性的关键。

4. 导出方式：

   **默认导出 export default** 一个文件最多 1 个；导入不加`{}`，导入名字可自定义。常用于文件只导出**一个主组件**。

```
export default function App(){}
import App from './App'
```

​	**命名（具名）导出 export** 一个文件可多个；导入必须加`{}`，**名字必须和导出一致**。适合一个文件导出多个组件 / 变量，支持 tree-shaking。

```
export function Button(){}
import { Button } from './Button'
```

### ② 事件处理（怎么给元素绑事件）

​	**`2(2)CustomButton.jsx`**：

1. 事件名用**驼峰命名**：`onClick`、`onChange`（不是 onclick）。
2. 定义事件发生时执行的函数 `handleClick`，里面写逻辑。
3. 三种写法：绑定已定义函数 `onClick={handleClick}`、内联箭头 `onClick={()=>alert("!")}`、带 event 参数 `(e)=>{...}`。
4. **收尾一句**：React 事件就是驼峰事件名 + 一个回调函数。

### ③ 事件函数怎么传给子组件（父子协作）

​	`2(2)ActionButton.jsx` → `2(2)Contact.jsx` → `2(2)Newletter.jsx`：

1. 看 `ActionButton`：它是一个**通用子组件**，接收 `{ text, onClick }`，渲染一个按钮，点击就调用 `onClick`。
2. 看 `Contact`：父组件自己定义 `handleSendMessage`（弹窗提示），把 `onClick={handleSendMessage}` 作为 props 传给 `ActionButton`。
3. 看 `Newletter`：同样结构，`handleSubscribe` 传给子组件。
4. 每个子组件是独立的；React 传数据**只能父传子**；子组件想改父组件的数据，就要**把事件处理函数作为 props 传进来**。
5. **收尾一句**：子组件负责"点"，父组件负责"处理"——靠 props 传函数实现。

---

## 第 3 课：组件通讯（props 与 props 深入、Context）

> props 基础传值 → props 深入（解构/默认值/展开/children）→ Context 解决层层传递。

### ①props 单向数据流

1. `App.jsx` 是父组件，它同时使用了 `<Welcome name="alice"/>` 和 `<UserInfo name="jhon" email="jhon@gmail.com"/>`。
2. `Welcome`（子）：接收 `name` 这个 props，函数里 `{ name = "默认" }` 解构 + 设默认值，没传就用 "默认"。
3. `UserInfo`（子）：接收 `name/age/city/email` 四个 props，都带默认值 `"暂无"`，渲染到页面。

### ② props 深入

**A. 组件通信 + `...rest` 批量转发 → `2(3)UserCard.jsx` + `2(3)UserInfo.jsx`**

1. 父子组件通信：`UserCard` 是父组件（它 import 并在内部使用 `<UserInfo/>`），`UserInfo` 是子组件。
4. 技巧是 `...rest` 批量转发。

**B. children 组合布局 → `2(3)CardWrapper.jsx`**

1. 组件可用 `{children}` 把传进来的子元素原样渲染。
2. 用途：做"包一层卡片、里面放任意内容"的**组合式布局**（容器组件）。
3. **收尾一句**：`children` 就是组件的插槽，谁都能往里面塞东西。

**合起来总结**：props 深入两个技巧——`...rest` 批量转发（UserCard/UserInfo）、`children` 插槽式组合（CardWrapper）。

### ③ Context（解决 props drilling）

**`2(3)ContextDemo.jsx` + `2(3)Child.jsx` + `2(3)GrandChild.jsx`**：

1. **痛点（props drilling）**：看 `Child` → 它只负责往下一层传，里面嵌了 `GrandChild`。如果数据要从最顶层传到 `GrandChild`，中间 `Child` 明明不需要这个数据也得帮着传，这就是 props drilling。
2. **Context 三步**：
   - `ContextDemo.jsx`：`createContext('light')` 创建上下文，自带默认值 `'light'`；
   - `App.jsx`：用 `<ContextDemo.Provider value={theme}>` 在高层广播值，谁都能订阅；
   - `GrandChild.jsx`：`useContext(ContextDemo)` 直接拿到主题值，**不用经过 Child**。
3. **收尾一句**：Context 就是在高层广播一个值，深层组件直接订阅，省去中间层的层层传参。

---

# 第二部分 React 进阶

## 第 4 课：组件生命周期

### ① 生命周期的三个阶段（概念）

1. **挂载**：组件第一次渲染到屏幕上。
2. **更新**：组件的 props 或 state 发生变化，会重新渲染。
3. **卸载**：组件从屏幕上移除。

### ② 用代码感受"更新"这个阶段

`3(1)UserDashBoard.jsx`：

1. 两个 state：`isPremium`（是否会员）、`credits`（积分）。
2. 点 "Upgrade" → `setIsPremium(true)` → 组件**重新渲染**，从"升级界面"变成"积分界面"——这就是更新阶段。
3. 点 "Add Credit" → `setCredit(credits+1)` → 又一次更新。

---

## 第 5 课：组件复用（render props 与高阶组件）

> **render props → 高阶组件 → 对比两种方式**。

### ① render props 模式

** `3(2)Box.jsx`**：

1. `Box` 组件接收一个 `render` 函数作为 props。
2. 组件内部有数据 `const name = "Tom"`，调用 `render(name)`，把 `name` 作为参数传出去。
4. 需要的话可复用 Box，同一套数据/逻辑用不同函数展示。
5. **收尾一句**：render props = 传一个"怎么渲染"的函数进去，数据在组件里、样式在调用方。

### ② 高阶组件 HOC

** `hoc/withLog.jsx` + `3(2)User.jsx` + `App.jsx` **：

1. `User.jsx` 是一个普通组件，只渲染 `<h1>我是user组件</h1>`。
2. `withLog.jsx`：**接受一个组件、返回一个新组件**的函数。返回的新组件在被使用时打印 `console.log("组件被使用了")`，再渲染原 `<Component/>`。
3. `App.jsx` 里 `const UserWithLog = withLog(User)` → 用 `<UserWithLog/>`，就得到一个"带日志功能"的 User。
4. **收尾一句**：HOC 就是把普通组件包一层，变成更高级、带额外功能的组件。

### ③对比总结

| | render props | 高阶组件 HOC |
|---|---|---|
| 思路 | 把"渲染函数"当 props 传进组件 | 把"组件"当参数，返回新组件 |
| 谁控制逻辑 | 组件内部有逻辑/数据 | 外层包装函数加逻辑 |
| 记忆点 | **传函数进去** | **包组件出来** |



---

## 第 6 课：React 路由 + axios

> **整体路由结构 → Link/Route 分工 → 编程式航 → 动态参数 → 嵌套路由 → 404 → axios**。

### ①路由整体配置

**`App.jsx` 的路由部分**：

1. `BrowserRouter` 包在最外面，启用浏览器路由。
2. `<nav>` 里 `Link` 定义导航链接（首页 / 关于我们 / 用户1）。
3. `<Routes>` 里 `<Route path="..." element={...}>` 配置 URL 对应的页面。
4. 最后一行 `<Route path="*" element={<NotFound/>}/>` 是通配，匹配不到就进 404。
5. **收尾一句**：路由 = 一张「URL ↔ 页面」的映射表，BrowserRouter 是总开关。

### ③ 编程式导航（useNavigate）

**`pages/About.jsx`**：

1. `import { useNavigate } from "react-router-dom"`。
2. `const navigate = useNavigate()` 拿到导航函数。
3. 按钮 `onClick={() => navigate(-1)}` → 返回上一页（-1 = 后退一步）。
4. **收尾一句**：不想靠点击链接、想用代码/按钮跳转时，就用 useNavigate。

### ④ 动态路由参数（useParams）

**`pages/User3.jsx`**：

1. 路由里 `path="/user/:id"`，`:id` 是动态参数。
2. `const Params = useParams()` → 拿到 `Params.id`，页面上显示"用户id:xxx"。
3. **实际应用**：同一个页面组件，根据 URL 里不同的 id，去请求不同的数据、展示不同内容（注释里写了）。
4. **收尾一句**：`:参数` 是占位符，useParams 把它取出来，一个组件就能服务无数个 id。

### ⑤ 嵌套路由 + Outlet

**看 `pages/User3.jsx` 的结构 + `pages/Profile.jsx` + `pages/Orders.jsx`**：

1. `App.jsx` 里 `<Route path="user/:id">` 内嵌两个子路由 `profile` 和 `orders`。
2. `User3.jsx` 里 `Link to="profile"` / `Link to="orders"` 切换，中间放 `<Outlet/>`。
3. `<Outlet/>` 是子页面的"插槽"：父页面（用户信息 + 导航）保留，子页面（Profile / Orders）在 Outlet 位置替换。
4. **收尾一句**：嵌套路由让父页面当"外壳"，Outlet 决定里面换哪块子页面。

### ⑥ 404 兜底

** `pages/NotFound.jsx`**：

1. 返回 `<h1>404 页面不存在</h1>`。
2. 配合 `App.jsx` 里 `path="*"`，所有匹配不到的路由都进这里。
3. **收尾一句**：`*` 是万能匹配，兜住所有未知地址。

### ⑦ axios 向后端发请求

1. **安装**：`npm install axios`。

2. **引入**：`import axios from 'axios'`。

3. **发请求**： `axios.get(\`https://jsonplaceholder.typicode.com/users/${Params.id}\`)` 拿用户数据，`

   res.data取返回内容。

4. 增删改对应方法：`axios.post()` 发送、`axios.put()` 修改、`axios.delete()` 删除。

5. **收尾一句**：axios 就是向后端发 HTTP 请求的工具，get 拿数据、post/put/delete 改数据。

