
## a live bookstore app with ionic 
steps:  
 1. git clone
 2. cd ionic-bookstore
 3. npm install  or  yarn install
 4. npm start  or  yarn start


----
> ionic : 集移动应用UI与 angularjs 框架与一身的 Hybrid App 框架

> 利用 ionic 我们可以轻易制造出一款带有原生应用UI与体验的移动App


这次我们就搭建一个图书 App (还能听歌看电影....), 实现了一些基本的功能， 搜索图书类型，查看图书详情，搜索图书标签，查看图书笔记等。当然还能听歌搜个电影之类的。。。。。

先上几张截图


![home](https://github.com/ManInBoat/Switching-to-2017/blob/master/imgs/home.gif)


---
## 总览
> 前端： ionic 框架 => angularjs, ui-router, ngResource

> 后端： nodejs => express, request

> 功能实现： 主题搜索， 标签搜索， 视图内跳转， 下拉刷新， 上划加载， 图书评论



前端UI： [主要采用 ionic 中原生 UI 组件](https://ionicframework.com/docs/components/)

数据来源： 我们没有布置数据库， 所有数据都来自豆瓣 API。 在前端 Ajax 中会有 CORS 跨域问题， 所以我们依靠 nodejs 布置路由进行数据请求， 然后转接给前端。

前端交互： 采用了与 ionic 绑定的 angularjs。 而且 ionic 已经帮我们优化了部分组件，使 ui 交互更符合移动应用的感觉， 我们只需要利用好 ionic 封装好的组件就能达到类似于一个移动应用的体验。

----
## 结构

路由： `www/js/app.js`。 在 angularjs 主文件 `app.js` 里布置 url 与 html 模板的映射。 就像这个样子~~ 其中包括一些视图内嵌套视图的，会有特殊的写法。具体参见 [ui-router](ui-router.github.io/docs/1.0.0-alpha.1/index.html)

```
  //app.js
.state('tab', {
  url: '/tab',
  abstract: true,
  templateUrl: 'templates/tabs.html'
})
```

Api：  `www/js/api.js` 。与后端预定好数据接口之后我们就可以请求数据啦， 当然你也可以用原生 Ajax 请求，但毕竟 ionic 是构建在 angularjs 基础之上的，我们使用 angularjs 的 ngResource 服务配置 api 。 具体是这个样子地~~

```
//BooksResource.js

Books.$inject = ['$resource'];
function Books($resource) {
  return $resource('/api/books/', {},
  {'query': {method: 'GET'}})
}

```

模板： 模板放在 `templates` 文件夹中， 对应四个主视图及一个详情视图。 每个视图文件中包含一个 html 模板和 一个 js 文件(控制器)。 啥是控制器呢？ 简单来说就像你平时写的 js 文件一样，对对应的 html 进行“控制” 。

---

定义好 Api， 模板， 路由后，就可以写页面了。 我们所有请求的数据都在控制器文件中定义，然后在 html 文件中引用就可以了。

基本结构就是这样，更加详细的内容可以查看源码。

![play](https://github.com/ManInBoat/Switching-to-2017/blob/master/imgs/play.gif)
![safari](https://github.com/ManInBoat/Switching-to-2017/blob/master/imgs/safari.gif)
