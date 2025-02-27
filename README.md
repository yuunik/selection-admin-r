# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

```angular2html
1.  前端性能优化。
	-  图片、视频等资源，做懒加载处理。
	-  多个图片可做精灵图，减少图片访问次数。
	-  css 优化，避免复杂的css选择器和样式计算。
 	-  及时清除不再使用的定时器和监听器。
	-  合理设置http缓存头，利用浏览器缓存静态资源。
	-  本地存储，减少重复的请求。
	-  路由做懒加载处理。
2. react vs vue:
	-  react 提供了 memo, useMemo， useCallback 等 API, 允许开发者对组件进行细粒度的性能优化， 避免不必要的渲染。在处理复杂 ui 界面和交互时， 能够有效地提示性能。
3. 前端更新时， 怎么提示用户？
	-  Service Worker
	-  版本控制和轮询
		- 在前端代码中，使用 JavaScript 定期轮询服务器上的 version.json。
		- 比较本地存储的版本号与服务器上的版本号。
		- 如果版本号不同，则提示用户刷新页面。
		- 使用浏览器通知 API 显示更新通知。
4. 前端接收大量数据时，怎么保证不卡顿？
	- 数据处理优化
		- 数据分页加载
		- 虚拟列表（react-window，vue-virtual-scroller）
		- 数据懒加载
		- 数据预处理
		- 数据缓存
		- web workers
	- 渲染优化
	- 代码优化
```

```angular2html
前端接收大量数据时，保证页面不卡顿是一个非常重要的性能优化课题。以下是一些关键策略，可以帮助你处理这种情况：

**1. 数据处理优化**

* **数据分页加载：**
    * 这是最常用的方法。只加载用户当前可见的数据，当用户滚动或翻页时，再加载更多数据。
    * 后端配合分页接口，前端控制加载数量。
* **虚拟列表（Virtual List）：**
    * 对于长列表，只渲染可见区域内的 DOM 元素，大大减少 DOM 操作。
    * 适用于数据量非常大的场景。
* **数据懒加载：**
    * 对于图片、视频等资源，只有当它们进入视口时才加载。
    * 使用 Intersection Observer API 或第三方库实现。
* **数据预处理：**
    * 在数据展示前，对数据进行必要的处理和格式化。
    * 避免在渲染过程中进行复杂的计算。
* **数据缓存：**
    * 对于不经常变化的数据，进行本地缓存，减少重复请求。
    * 使用浏览器 Local Storage、Session Storage 或 IndexedDB。
* **Web Workers：**
    * 如果数据处理非常复杂，可以考虑使用 Web Workers 将数据处理移到后台线程，不阻塞主线程。

**2. 渲染优化**

* **减少 DOM 操作：**
    * 尽量批量更新 DOM，避免频繁的 DOM 操作。
    * 使用 DocumentFragment 或虚拟 DOM。
* **优化 CSS：**
    * 避免复杂的 CSS 选择器和样式计算。
    * 使用 CSS 动画代替 JavaScript 动画。
    * 使用CSS containment属性，减少重排重绘。
* **使用性能分析工具：**
    * 利用浏览器的开发者工具（Performance 面板）分析页面性能瓶颈。
    * 找出耗时操作并进行优化。
* **防抖和节流：**
    * 对于频繁触发的事件（如滚动、输入），使用防抖或节流技术减少事件处理次数。
    * 例如lodash的debounce和throttle方法。
* **requestAnimationFrame：**
    * 如果需要进行动画或者高频率的重绘，使用 requestAnimationFrame 会比 setTimeout 或者 setInterval 更加高效。

**3. 代码优化**

* **代码分割（Code Splitting）：**
    * 将代码按需加载，减少初始加载时间。
    * 使用 Webpack 等构建工具实现。
* **避免内存泄漏：**
    * 及时清理不再使用的对象和事件监听器。
    * 注意闭包和循环引用。
* **使用高效的算法和数据结构：**
    * 在数据处理过程中，选择合适的数据结构和算法，可以显著提高性能。

**总结：**

保证页面流畅性需要综合考虑数据处理、渲染和代码等多个方面。通过优化数据加载、减少 DOM 操作、使用性能分析工具等方法，可以有效地提升页面性能，避免卡顿现象。

```
