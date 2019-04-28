#简单描述

#简单的 alert-ui-demo

#基于 Vue cli3 库模式搭建组件库

#引入 alert-ui-demo#
#npm install alert-ui-demo -S;

#在 main.js 中引入

#import AlertUi from 'alert-ui-demo'
#import 'alert-ui-demo/lib/alert-ui.css' 引入 alert 样式（采用内两样式后，不再需要引入样式）

#Vue.use(AlertUi)
注：弹层兼 Vue3 中测试时，发现样式不生效，仅供参考(解决方案： vue.config.js 中 css 强制使用内联样式)

具体使用方式：
此 demo 提供 alert 和 confirm 两种方式的提醒
通过上图引用后，可以直接在需要的地方调用 this.$alert()或者this.$confirm();

1、alert 中的参数可以为字符串、对象两种方式

this.$alert('alert 提示')、this.$alert({message:'alert 提示内容',type:'default',time:3000}) // 其中 type、time 非必填项 type 提供：default、warning、success 三种类型

2、confirm 的参数为对象形式
this.$confirm({})具体参数如下
this.$confirm({
title:'标题', // 非必选项
message:'提示内容',
cancelText:'取消',
confirmText:'确定',
animateType:'default',// (弹窗显示动画，目前仅支持 default、scale); 非必选项
confirm:function(){} // 确认后回调函数，此处为自己定义的回调处理函数
})
