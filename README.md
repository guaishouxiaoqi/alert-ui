#alert-demo 实现基本的全局 alert、confirm、loading 弹层，新增 calendar 组件

基于 Vue cli3 库模式搭建组件库
alert-demo 提供 alert 和 confirm 两种方式的全局提醒提醒，在 1.1.1 版本新添加了全局 loading 组件，可以实现两种不同风格 loading，可以根据需求定制一些简单 loading 样式，在 1.1.16 版本中新增 calendar 组件

#alert-demo 的引入和使用方式

1、npm install alert-demo -S

2、在 main.js 中引入或则在需要的地方引入
import AlertDemo from 'alert-demo'
Vue.use(AlertDemo)
3、详细使用说明：

3-1、alert 提示框使用说明

参数可以为字符串、对象两种方式
this.$alert('alert 提示');
this.$alert({message:'alert 提示内容',type:'default',time:3000});

(注：alert 中的参数 type、time 非必填项 type 提供：default、warning、success 三种类型)

3-2、confirm 确认框说明

this.$confirm({})参数为形象形式
this.$confirm({
title:'标题',
message:'提示内容',
cancelText:'取消',
confirmText:'确定',
animateType:'default',
confirm:function(){}
})

(注：confirm 中的参数 title、animateType 为非必选项， animateType 弹窗显示动画，目前仅支持 default、scale 两种类型，confirm 为确认后回调函数，此处为自己定义的回调处理函数)

3-3、全屏 loading 组件

在需要的页面添加 loadings 组件

v-if 根据自己的需求定义

loading 组件的可选参数如下（以下所列参数均为非填项）

(1)、参数 message
message(loading 时的提示内容，默认为空)

(2)、参数 svgType
svgType 定义 loading 样式目前有（line、point）两种，默认是原点形式,line 为半圆形式

(3)、参数 size
size 定义 loading 图大小,目前支持三种 small、middle、large ，默认为 middle

(4)、参数 pointColor 和参数 pointType
pointColor 和 pointType 定义 loading 的颜色和样式显示，当 svgType='point'时，这两个此参数可用,其中 pointColor：目前支持 default、gray、dark、linear，默认是 default，pointType：目前支持 small、middle、large、ease、linear，默认为 middle

3-4、日历插件

在需要的页面添加 calendar 组件
在 pc 页面使用时需要设置 calendar 或者 calendar 父标签的宽度
canendar 组件的可选参数如下（所有参数非必填项）

(1)、参数 language
language 参数用于显示中文还是英文日期

(2)、参数 canSelected
canSelected(日历中的日期是否可以选择区间，默认为 false 不可选)

(3)、参数 raws
raws（日历显示的行数，默认为 5 行，最小为 5 行）
(4)、参数 rangeMonth（可选择的最大日期区间），需设置 canSelected 为 true
rangeMonth 配合 canSelected 使用，可选择日期区间

(5)、参数 dateType
dateType 参数定义了回调函数 handleSelect 返回的日期格式，默认为'YYYY-MM-DD'，
返回的日期数组中日期的格式为'YYYY-MM-DD'

(6)、参数 clean
clean 参数用于点击日历外的日期时，是否清楚已选中的日期区间，默认为 false

(7)、回调函数 handleMax
handleMax 回调函数用于返回选择的日期区间超过设置的 rangeMonth 值

(8)、回调函数 handleSelect，需设置 canSelected 为 true
handleSelect 回调函数用于返回点后日期后返回对应的选择日期区间数组
