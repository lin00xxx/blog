const path = require('path');
const Hexo = require('D:/blog/node_modules/hexo');
const baseDir = 'D:/blog';
const hexo = new Hexo(baseDir, { silent: false });
hexo.env.init = true; // 标记已初始化，才会加载 _config.yml
hexo.init().then(() => {
  console.log('base_dir:', hexo.base_dir);
  console.log('title:', hexo.config.title);
  console.log('theme:', hexo.config.theme);
  console.log('theme_dir:', hexo.theme_dir);
  return hexo.call('generate', {});
}).then(() => {
  console.log('GENERATE OK');
  // 调试：打印所有路由
  const routes = hexo.route.list();
  console.log('ROUTES:', routes.slice(0, 20).join(', '));
  process.exit(0);
}).catch(e=>{console.error(e);process.exit(1);});
