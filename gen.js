const path = require('path');
const Hexo = require('hexo');
const baseDir = __dirname;
const hexo = new Hexo(baseDir, { silent: true });
hexo.env.init = true;
hexo.init().then(() => {
  return hexo.call('generate', {});
}).then(() => {
  console.log('GENERATE OK');
  process.exit(0);
}).catch(e => { console.error(e); process.exit(1); });
