import { terser } from 'rollup-plugin-terser';

export default {
  input: 'modules/index.js',
  output: [
    { file: 'dist/blue.js', format: 'cjs' },
    { file: 'dist/blue.mjs', format: 'esm' },
    { file: 'dist/blue.umd.js', format: 'umd', name: 'blue' }
  ],
  plugins: [terser()]
};
