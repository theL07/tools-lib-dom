/*
 * @Description: 
 * @Author: theL07
 * @Date: 2022-06-16 20:11:18
 * @LastEditTime: 2022-06-16 21:51:32
 * @LastEditors: theL07
 */
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
export default {
  input: './index.ts',
  output: [
    {
      file: 'build/index.cjs.js',
      exports: 'named',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'build/index.es.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'build/lib.global.js',
      name: 'toolLibDom',
      format: 'iife',
      sourcemap: true
    },
  ],
  sourcemap: false,
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: { 
        compilerOptions: {
          sourceMap: true
        },
        esModuleInterop: true
      }
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            module: false
          }
        ]
      ],
    })
  ],
  moduleContext: (/** @type {string} */ id) => {
    const thisAsWindowForModules = [
      'node_modules/intl-messageformat/lib/core.js',
      'node_modules/intl-messageformat/lib/parser.js',
      'node_modules/intl-messageformat/lib/compiler.js',
    ]
    if (thisAsWindowForModules.includes(id)) {
      return 'window'
    }
  }
}