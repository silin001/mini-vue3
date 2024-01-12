/*
 * @Date: 2024-01-11 23:18:52
 * @LastEditTime: 2024-01-12 23:11:57
 * @Description: rollup配置文件
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-project/mini-vue3/rollup.config.js
 */
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'

// 导出 rollup 配置对象
export default {
  input: "./packages/vue/src/index.js", // 打包入口
  output: {             // 打包出口：可定义为数组，输出多种构件
    // file: 'dist/miniVue.js',   // 打包输出文件
    file: './packages/vue/dist/minivue3.js', // 打包输出文件
    // 打包格式（可选项）：iife（立即执行函数）、esm（ES6 模块）、cjs（Node 规范）、umd（支持 amd + cjs）
    format: 'umd',
    //当format为iife和umd时必须提供，导出的模块名 Minivue3 将作为全局变量挂在window下
    name: 'Minivue3',
    // 开启 sourcemap 源码映射，打包时会生成 .map 文件；作用：浏览器调试ES5代码时，可定位到ES6源代码所在行；
    sourcemap: true,
    globals: {
      // "vue": "vue", // 指明 global.vue 即是外部依赖 vue
    }
  },
  // 使用 Rollup 插件转译代码
  plugins: [
    babel({
      // 忽略 node_modules 目录下所有文件（**：所有文件夹下的所有文件）
      exclude: 'node_modules/**'
    }),
    // 与webpack不同的是,rollup并不知道如何寻找路径以外的依赖,比如node_module中的,帮助程序可以在项目依赖中找到对应文件
    resolve(),
    // rollup默认仅支持es6的模块,但是还存在很多基于commonjs的npm模块,这就需要改插件来完成读取工作
    // commonjs(),
  ]
}
