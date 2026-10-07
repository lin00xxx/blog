'use strict';

// 首页使用 index 布局（渲染 themes/fluid/layout/index.ejs）
module.exports = function(locals) {
  const config = this.config;
  const pagination = require('hexo-pagination');
  const indexPosts = (locals.index_posts || locals.posts).sort(config.index_generator.order_by);
  const paginationDir = config.pagination_dir || 'page';
  const path = config.index_generator.path || '';
  return pagination(path, indexPosts, {
    perPage: config.index_generator.per_page,
    layout: 'index',
    format: paginationDir + '/%d/',
    data: { __index: true }
  });
};
