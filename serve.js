const Hexo = require('D:/blog/node_modules/hexo');
const baseDir = 'D:/blog';

// 支持命令行传参：node serve.js --port 7100 --host 127.0.0.1
function getArg(name, fallback) {
  const i = process.argv.indexOf('--' + name);
  if (i > -1 && process.argv[i + 1]) return process.argv[i + 1];
  return fallback;
}
const port = parseInt(getArg('port', '4000'), 10);
const host = getArg('host', '127.0.0.1');

const hexo = new Hexo(baseDir, { silent: false });
hexo.env.init = true;
hexo.init()
  .then(() => hexo.call('server', { port, host, log: false }))
  .catch(e => { console.error('SERVER FAIL:', e); process.exit(1); });
