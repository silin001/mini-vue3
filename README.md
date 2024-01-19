# mini-vue3

# 说明

手写简化版本的 vue3 核心源码，只保留核心逻辑，用于学习理解 vue3 源码的实现原理。


# 目录说明

```
|---packages
  |---reactivity 响应式核心
     |---src
       |---...
       |---index.js
     |---package.json
  |---shared 各模块通用方法
     |---src
       |---...
       |---index.js
     |---package.json
  |---vue 我们最终vue
     |---src
       |---...
       |---index.js 打包入口
     |---package.json
```
vue3采用monorepo进行包管理，而 monorepo 由pnpm提供，所以需要一定要预先安装pnpm

packages下每个模块都要包含src、index.js、package.json，且需要注意package.json中name名称


# 案例运行
在​打包完成后，将会在packages/vue/dist，路径下生成打包后的vue3的代码，然后我们可以去packages/vue/examples 提供的案例中运行打包后代码，在目标html文件通过vscode启动live server，即可完成vue3示例的运行。
