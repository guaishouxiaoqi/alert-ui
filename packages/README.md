#######
alert 提示框
this.$alert(
{
message:'hello alert',
type:'success', // 提示类型非必填
time:2000 // 显示时间非必填
}
)
或者直接使用
this.$alert('hello alert')

######

this.$confirm 确认框
this.$confirm({
title:'标题', // 非必选项
message:'提示内容',
cancelText:'取消',
confirmText:'确定',
animateType:'default',// (弹窗显示动画，目前仅支持 default、scale); 非必选项
confirm:function(){} // 确认后回调函数，此处为自己定义的回调处理函数
})
