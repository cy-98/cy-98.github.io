---
title: "邮件开发指南"
date: 2023-01-29T15:30:25+08:00
draft: true
---

## 邮件开发

### 邮件渲染相关

> 邮件发送后，经过客户端加工过，所以某些标签可能会触发客户端定义的规则。
> 客户端自带一些内联样式表，邮件`<head>`中携带的样式表在一些客户端会被除去，所以需要使用 inline-style 来编写样式。

> 推荐使用 `maizzle` 能够将 tailwind class 编译为 inline-style。
> 避免客户端自带样式的 pre style。

SMTP 报文发送给邮件服务商，服务商的后端会对报文做处理，图片的链接会代理一层服务，实际上请求的不是存储静态图片的服务器，而是服务商的中间层服务器。后端还会对报文的一些标签、样式做出强制替换处理。

在不同机型渲染结果不一致，是由于服务商对 `http header: User-agent` 作了判断，作了一些加工处理。
Gmail 对 iPhone 5/6/7 等小屏机型会对字号进行放大处理，对元素宽高都会进行一定比例放大。
对 iPhone 11 等大屏手机则没有上述处理。
Outlook 客户端无法渲染超出 Microsoft word 不支持的样式，因为渲染引擎采用了 Microsoft word 的文本渲染引擎处理邮件报文，再返回给浏览器或者客户端渲染 (webview)。

#### 决定渲染结果的因素：

- CSS 兼容性
- User-agent
  - 在 chrome 中模拟移动手机，能够自动发送相应的 UA，服务商后端根据该 UA 决定渲染策略。很大程度上能在 PC 浏览器中模拟移动端邮件。
- 客户端
- 是否为垃圾邮件
- 账号是否登录
- 安全策略
  - 账号收件太频繁？
    在一个邮箱账号接收了太多类似邮件，可能会触发某些客户端的策略，导致渲染不符合预期。如：发送相同的邮件报文，前后渲染结果出现偏差。

### HTML

大多数邮件客户端渲染引擎都不支持 HTML5 和 CSS3 的特性，除此之外，也不支持 flex、float 、
box-shadow 等样式。

邮件的布局基本只能依赖 table 布局，因为有的客户端还会除去 div 标签的 inline-style。
推荐使用的标签：

`<table>`
`<tbody>`
`<tr>`
`<td>`
`<p>`
`<img />`
`<a>`
`<h1>`
`<h5>`
`<em>`
`<strong>`
` <br />`
` </strong>``</em>  `

### CSS

查询 CSS 在邮件客户端的兼容性：https://www.caniemail.com/

#### 不应使用的并且可以替换的 CSS。

| 不应使用的 CSS        | 可以替代的 CSS        |
| --------------------- | --------------------- | ----------------- |
| flex                  | inline-block          | table             |
| background            | background-image      | background-color  |
| float                 | align                 |
| max-width             | width                 | `<td width=* />`  |
| max-height            | height                | `<tr height=* />` |
| `<style>` in `<body>` | `<style>` in `<head>` |

#### cell 模型

❌ margin
✅ padding

在使用 div + 盒模型布局时，经常用到 margin + padding + border-box 或是 flex 来布局。
在 table 布局中，td 看做一个最小的单位，作为表格中的一个 cell。
td 的 display 等同 table-cell，宽度可以被撑起，也可以自动分配。
td 不支持设置 margin 但支持 padding。

如果要设置定宽和定高。

```html
<tr>
  <td width="300" height="500"></td>
  <td width="300" height="300"></td>
</tr>
```

处于同一 tr 内的 td ，高度取决于最高的元素。（表格等高，或是设置 rowspan 来确定高度 ）

#### Space 间隙

实现上下两行之间的边距

```html
<tr>
  <td aria-hidden="true" height="30" style="font-size: 0; line-height: 0px;">
    &nbsp;
  </td>
</tr>
```

#### 垂直居中

```html
<td style="vertical-aligh:middle">❌ <td valign=”"middle"> ✅</td>
```

### 水平居中

```html
<td align="center"></td>
```

地址标记
比如下面左图展示了 footer 的 copyright 在 Gmail 的移动端的展示情况。右图是 PC 端展示情况。

如左图所示，一段类似地址信息的文本被套上了 a 标签，该 a 标签具有 color: #15c 的属性。并且点击后能够跳转该地址的地图页面。对应方案如右图。 在地址信息中插入 span 标签，防止客户端解析出地址信息。

#### 空白符

一般用作预览文案截断

```html
<div
  height="10"
  style="font-size: 0px !important; line-height:0px !important; display: none !important; height:10px;max-height: 0px !important; overflow: hidden !important;"
>
  \n
</div>
```

空白符经过编码后，可能不会被正确的渲染。

替换: ✅

<div height="10" style="font-size: 0px !important; line-height:0px !important; display: none !important; height:10px;max-height: 0px !important; overflow: hidden !important;">
 &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
 &#160;&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
 &#160;&#847; &#847; &#847; &#847; &#847;
 </div>

#### Pre-view

用于用户打开邮件前的预览。

<div style="display:none; font-size:1px; color:#333333; line-height:10px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">{{text}} {{text2}}</div>
<div height="10" style="font-size: 0px !important; line-height:0px !important; display: none !important; height:10px;max-height: 0px !important; overflow: hidden !important;">&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;&#160;&#847; &#847; &#847; &#847; &#847;</div>

#### 文字颜色

1. 尽量使用 hex, 避免简写和小写。
   color: #FFFFFF;

2. 邮件对颜色透明度的兼容性不佳，尽量换算成不带透明度的色值

#### 小号字体

在 Gmail 的移动端 web / 客户端内，小于 14px 的字体可能会被改成 18px。
Outlook 允许最小字号 17px。
即使加了一段 CSS

```css
 {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
```

也并不能防止客户端从邮件报文中更改字体大小。

#### 文本溢出省略

`overflow: hidden;`生效的前提是盒模型有定宽和定高。

`text-overflow: ellisp; `生效的前提是 `overflow: hidden; white-space: nowrap; word-break： break-all` 生效。

- 文本单行省略： 对元素高度限定， Gmail Yahoo 客户端可以截断溢出文本， Gmail 可以在截断后显示省略号。
- 文本全部展示：不对元素高度做出限定

#### Mobile Outlook 嵌套 table 丢失宽度

https://stackoverflow.design/email/base/mso/
The main way we use MSO tags in our emails is to create “ghost tables” so hybrid emails don’t fall apart in Outlook. Hybrid design uses inline-block, max-width, min-width to stack table columns. Outlook doesn’t support these CSS properties, so we use MSO tags to create “ghost tables” that apply a fixed width just for Outlook.

```html
<!--[if mso]>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td width="340">
<![endif]-->
<div
  style="display:inline-block; width:100%; min-width:200px; max-width:340px;"
>
  Outlook can’t render the CSS in this DIV but other email clients can, so we
  wrap this in a ghost table that replicates the DIV’s desktop style. In this
  case, a container 340px wide.
</div>
<!--[if mso]></td></tr></table><![endif]-->

Without the ghost table above, Outlook would display the
<div>
  at 100% width. Learn how we use ghost tables to make our emails responsive.
</div>
```

#### 图片加载

```html
<img width="10" height="10" src="xxx" />
```

设置 width height 能够确保加载之前不会破坏模板结构。

- 图片比例过大或者只是简单切图组成的邮件称为垃圾邮件的概率很大，多数邮箱对图片大小也有限制，一般图片超过 150k 后几乎所有邮箱都不会默认加载邮件中的图片

#### DOCTYPE

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

### 响应式布局

使用媒体查询来检测屏幕宽度，更改元素的布局

- 检测屏幕宽度而不是 UA/机型
- 媒体查询支持度有限
  响应式设计
  响应式设计能够让邮件看起来更稳定和美观，避免嵌套的复杂布局。
- 在 PC 端展示的邮件宽度为 600px
- 在移动端展示的邮件宽度为 100% (outlook 需要设定固定宽度，在 if mso 条件渲染中设定为 600px)
  推荐先浏览一遍下面的 article：
  https://www.campaignmonitor.com/dev-resources/
  https://www.campaignmonitor.com/dev-resources/guides/design/
  布局策略

1. Mobile First

- Considers the mobile user a priority
  优先考虑移动用户
- One layout for all screen sizes
  所有尺寸的屏幕使用一个布局
- Single column design： 320-500px
  单列宽度： 320-500px
- Large text & buttons
  较大的文本和按钮
- Generous whitespace
  丰富的空隙
- Short concise body copy

2. Fluid

- Percentage-based widths（百分比宽度）
- Adapts to fit the screen（适应屏幕）
- Text wraps automatically（文本自动换行）

3. Responsive

- Resize content: make images fit, make text larger
  调整内容大小：使图像合适，使文本更大
- Hide content on mobile
  在手机端隐藏内容
- Stack columns
  将列布局堆叠
- Move a two-column design to a one-column design
  两列布局变为单列布局

- 尽量避免外层容器的定高定宽，尽量以 content + padding 方式填充宽高。
  Example:  
  300px 宽 - 50px 高的按钮，按钮文本 18px， UI 不一定符合预期。
  因为在移动端，定高可能会被强制放大/缩小 1.x 倍。导致字体行高过高/低，文字下沉/上浮。
  文本翻译为其他语言，可能导致文字数增多换行，文本高度大于按钮高度。
  Solution:
  样式更改为：font-size: 18px; padding： 30px 60px;
  确保由 padding + content 填充， UI 一致
- 避免邮件模板定宽
  邮件宽度 375px，如果大于展示宽度，有的客户端不支持横向 scroll，模板则只能展示一部分。

- outlook 中嵌套的 table 如果没有定高，会丢失宽度，所以复杂布局最好有纵列的响应式布局

### 避免进入垃圾箱

https://stackoverflow.design/content/guidelines/grammar-and-mechanics/#buttons-and-links

### 测试工具

chrome 浏览器可以通过浏览器模拟机型（发送一个相应手机机型的 UA）来检查 mobile web 端的渲染情况。
[accessible-email](https://www.accessible-email.org/checker/editor.php)
[HTML MAIL CHECK](https://www.htmlemailcheck.com/check/)
[everest](https://everest.validity.com/login?r=%2Fdesign%2F)
Login : Validity
发送一封测试邮件，能够在众多的真实的机型屏幕上得到截屏，检查 UI。

参考 （ 推荐阅读 ）
Stacks
#letsfixemail
What You Should Know About HTML Email
Word 2007 HTML and CSS Rendering Capabilities in Outlook 2007 (Part 1 of 2)
https://www.campaignmonitor.com/dev-resources/guides/coding-html-emails/
