#alert-ui-demo 实现基本的全局 alert、confirm、loading 弹层

#简单的 alert-ui-demo

#基于 Vue cli3 库模式搭建组件库

#引入 alert-ui-demo#
#npm install alert-ui-demo -S;

#在 main.js 中引入

#import AlertUi from 'alert-ui-demo'
#import 'alert-ui-demo/lib/alert-ui.css' 本示例样式采用内联样式，所以不再需要引入该样式

#Vue.use(AlertUi)
注：此处需要注意的是，采用内联样式是为了兼容 Vue cli3 项目，引入样式不生效果问题
即：将 vue.config.js 中 css 强制使用内联样式
css: {
extract: false
}

具体使用方式：
alert-ui-demo 提供 alert 和 confirm 两种方式的全局提醒提醒，在 1.1.1 版本新添加了全局 loading 组件，可以实现两种不同风格 loading，可以根据需求定制一些简单 loading 样式;
在需要的地方调用 this.$alert()或者this.$confirm();
在需要的地方引入全局组件<loadings></loadings>

#alert 中的参数可以为字符串、对象两种方式

#this.$alert('alert 提示')、
#this.$alert({message:'alert 提示内容',type:'default',time:3000})

<!-- 其中 type、time 非必填项 type 提供：default、warning、success 三种类型 -->

#confirm 的参数为对象形式
this.$confirm({})具体参数如下
this.$confirm({
title:'标题',
message:'提示内容',
cancelText:'取消',
confirmText:'确定',
animateType:'default',
confirm:function(){}
})

<!-- title、animateType 为非必选项， animateType(弹窗显示动画，目前仅支持 default、scale);
confirm 为确认后回调函数，此处为自己定义的回调处理函数 -->

#新增全屏 loading 加载组件
在 Vue 中的 App.vue 中或者在需要的页面添加
<loadings v-if="show"></loadings>
控制 show 进行显示隐藏

#其中该组件的可选参数如下（以下参数非填项）：

#参数 message
message(loading 时的提示内容，默认为空)

#参数 svgType
svgType 定义 loading 样式目前有（line、point）两种，默认是原点形式,line 为半圆形式

#参数 size
size 定义 loading 图大小,目前支持三种 small、middle、large ，默认为 middle

#参数 pointColor 和参数 pointType
pointColor 和 pointType 定义 loading 的颜色和样式显示，当 svgType='point'时，这两个此参数可用,其中 pointColor：目前支持 default、gray、dark、linear，默认是 default，pointType：目前支持 small、middle、large、ease、linear，默认为 middle
