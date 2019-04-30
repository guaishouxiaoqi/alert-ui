#######
##this.$alert 提示框##
this.$alert(
{
message:'hello alert',
type:'success', // 提示类型非必填
time:2000 // 显示时间非必填
}
)

## alert 弹窗中的 type、time 参数非必选项，

## 或者直接使用

<!-- this.$alert('hello alert')； -->

#this.$confirm 确认框
this.$confirm({
title:'标题',
message:'提示内容',
cancelText:'取消',
confirmText:'确定',
animateType:'default',
confirm:function(){}
})；

<!-- title、animateType 为非必选项， animateType(弹窗显示动画，目前仅支持 default、scale);
confirm 为确认后回调函数，此处为自己定义的回调处理函数 -->

###############

新增全屏 loading 加载组件
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
