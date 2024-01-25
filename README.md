# mini-vue3

# 说明

参考了一些网上学习资料，只保留vue3源码的核心逻辑，实现一个极简版本的 mini-vue3，用于学习理解 vue3 源码原理。

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
  |---vue 最终的minivuejs
     |---src
       |---...
       |---index.js 打包入口
     |---package.json
```
## monorepo进行包管理
- vue3采用monorepo进行包管理，而 monorepo 由 pnpm 提供，所以一定要预先安装 pnpm

- packages下每个模块都要包含src、index.js、package.json，且需要注意package.json中name名称


# 源码运行调试
在​打包完成后，将会在 packages/vue/dist 路径下生成打包后的mini-vue3的源码。然后就可以去 packages/vue/examples 下提供的案例中html文件中引入，然后通过vscode启动live server，即可完成vue3示例的运行。


# star 支持、学习交流

你的star是对我最大的支持， 技术交流群：加vx：xbql2p8b01（备注来意！）
