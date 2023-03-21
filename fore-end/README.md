# Code Star's Gangster

## 创建项目

npm init vue

## 修改tsconfig.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "compilerOptions": {"target": "esnext",
  "module": "esnext",
  "useDefineForClassFields": true,
  "moduleResolution": "node",
  "strict": true,
  "jsx": "preserve",
  "allowJs": true,
  "sourceMap": true,
  "skipLibCheck": true,
  "resolveJsonModule": true,
  "esModuleInterop": true,
  "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    }
  },
  "include": [
    "env.d.ts", 
    "types/**/*.ts", 
    "src/**/*", 
    "src/**/*.vue",
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "library/**/*.vue",
    "*.ts" 
  ],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}

```



## 修改vite.config.ts

```typescript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@lib": fileURLToPath(new URL('./library', import.meta.url) ),
    }
  },
})

```

## 根目录新建 types 放 ts 声明文件

### 新建 env.d.ts

```typescript
/// <reference types="vite/client" />
 
declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
 
// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
	VITE_APP_TITLE: string;
	VITE_APP_PORT: string;
	VITE_APP_BASE_API: string;
}
 
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
```





## 引入 less

安装依赖

```
npm install less
npm install less-loader
```

配置vite.config.js

```javascript
export default defineConfig({
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./library/style/global.less";',
      },
    },
  },
})
```

### 引入样式变量

创建 variables.less

```less
@base-color-border: #cccccc;

@base-border-radius :10px;
```

在 global.less 中引入

```less
@import './variables.less';
```



## 全局批量引入组件

```typescript
import { defineAsyncComponent} from 'vue';
import type {AsyncComponentLoader} from 'vue'
// 获取所有组件，该方法返回一个对象
// 匹配路径'./*.vue' 
const components = import.meta.glob('./*.vue');
export default function install(app: any) {
    // 遍历对象并注册异步组件
    for (const [key, value] of Object.entries(components)) {
        // ./HelloWorld.vue 截取中间部分做名字
        const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
        app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
    }
}
```

