export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/bytedance/Desktop/cy-98.github.io/source/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"/Users/bytedance/Desktop/cy-98.github.io/source/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/profile/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/bytedance/Desktop/cy-98.github.io/source/.vuepress/.temp/pages/profile/index.html.js"), meta: {"title":"个人简历"} }],
  ["/posts/first.html", { loader: () => import(/* webpackChunkName: "first.html" */"/Users/bytedance/Desktop/cy-98.github.io/source/.vuepress/.temp/pages/posts/first.html.js"), meta: {"_blog":{"title":"邮件开发指南","author":"","date":"2023-01-29T07:30:25.000Z","category":[],"tag":[],"excerpt":"<p>邮件模板使用 HTML 开发。由于 head 标签中的 style 会被删除，所以不能够使用 class 方式，而是使用标签中的 inline-style 开发。推荐使用 <code>maizzle</code> 能够将 tailwind class 编译为 inline-style。</p>\n<p>邮件发送后，经过客户端加工过，所以某些标签可能会触发客户端定义的规则。</p>\n<p>SMTP 报文发送给邮件服务商，服务商的后端会对报文做处理，图片的链接会代理一层服务，实际上请求的不是图片的原链接，而是服务商的中间层服务器做了一次转发。邮件服务端还可能会对报文的一些标签、样式做出强制替换处理。</p>"},"title":"邮件开发指南"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/bytedance/Desktop/cy-98.github.io/source/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/bytedance/Desktop/cy-98.github.io/source/.vuepress/.temp/pages/category/index.html.js"), meta: {"title":"Categories"} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/bytedance/Desktop/cy-98.github.io/source/.vuepress/.temp/pages/tag/index.html.js"), meta: {"title":"Tags"} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/bytedance/Desktop/cy-98.github.io/source/.vuepress/.temp/pages/article/index.html.js"), meta: {"title":"Articles"} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/bytedance/Desktop/cy-98.github.io/source/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"title":"Timeline"} }],
]);
