# Jikeyuan
黑马程序员 极客园 React18项目


 最大的感受就是，react你只要看得懂js css html，你直接就能写。而Vue里的语法糖太多了，要记的东西很多。Vue入门要花一点时间，但是之后很爽。React写起来比较繁琐，不像Vue一样干练。 举个例子，React是单向数据流，vue有双向数据绑定。一个页面搞定，导入什么的都很方便，import不乱

基本上html代码和css都是复制进来的，没有自己写过。但是工作中真的遇到过不会写css的场景，不知道黑马有没有课程教过。


React基本上只要会三个函数，useEffect，useDispatch，还有一个看b站评论

1. 没传文档地址，包括接口文档和代码文档，接口文档是apifox，代码文档是语雀

2. react复杂很多，不仅是redux对比pinia，还有接口调用方式

3. 没有登录的时候，使用HOC高阶组件封装，强制跳转回登录页，我觉得不太合理，应该根据后端返回的是否为401跳转，因为是否登录是由后端控制的，这里本地的token比如说过期了，那么后端返回401，页面直接崩掉了。虽然之后加了是不是401的判断，但是感觉这一步绝对是多余的。

4. P99 思考题 配置默认跳转 配了之后要关注Layout里的路由要改成/home而不是/，是因为P101中，要和高亮去匹配。黑马讲课的时候没有看首页有没有高亮

