##### alert 提示框

```bash
this.$alert({
  message:'hello alert',
  type:'success',
  time:2000
})
```

##### alert 弹窗中的 type、time 参数非必选项，type 提供：default、warning、success 三种类型

- alert 弹层中的参数也可以直接为字符串，如下

```bash
this.$alert('hello alert');
```

##### confirm 确认框

```bash
this.$confirm({
  title:'标题',
  message:'提示内容',
  cancelText:'取消',
  confirmText:'确定',
  animateType:'default',
  confirm:function(){}
});
```

- 参数 title、animateType 为非必选项， animateType 弹窗显示动画效果，目前仅支持 default、scale 两种方式;
- 参数 confirm 为确认后回调方法，此处为自己定义的回调处理函数

##### v1.1.1 版本新增全局 loading 组件

新增全屏 loading 加载组件
在 Vue 中的 App.vue 中或者在需要的页面添加

```bash
<loadings v-if="show"></loadings>
```

根据项目需求在需要的时候添加 v-if，控制 loading 组件 进行显示隐藏

- 其中该组件的可选参数如下（以下参数非填项）：
- 参数 message

  - message(loading 时的提示内容，默认为空)

- 参数 svgType

  - svgType 定义 loading 样式目前有（line、point）两种，默认是原点形式,line 为半圆形式

- 参数 size

  - size 定义 loading 图大小,目前支持三种 small、middle、large ，默认为 middle

- 参数 pointColor 和参数 pointType

  - pointColor 和 pointType 定义 loading 的颜色和样式显示，当 svgType='point'时，这两个此参数可用,其中 pointColor：目前支持 default、gray、dark、linear，默认是 default，pointType：目前支持 small、middle、large、ease、linear，默认为 middle

- v1.1.15 版本新增 calendar 组件

新增 calendar 日历组件，在需要的页面添加组件

```bash
<calendar></calendar>
```

- canendar 组件的可选参数如下（所有参数非必填项）

- 参数 language
- language 参数用于显示中文还是英文日期

- 参数 canSelected
- canSelected(日历中的日期是否可以选择区间，默认为 false 不可选)

- 参数 raws
- raws（日历显示的行数，默认为 5 行，最小为 5 行）
- 参数 rangeMonth（可选择的最大日期区间），需设置 canSelected 为 true，rangeMonth 配合 canSelected 使用，可选择日期区间

- 参数 dateType
- dateType 参数定义了回调函数 handleSelect 返回的日期格式，默认为'YYYY-MM-DD'，返回的日期数组中日期的格式为'YYYY-MM-DD'

- 参数 clean
- clean 参数用于点击日历外的日期时，是否清除已选中的日期区间，默认为 false

- 回调函数 handleMax
- handleMax 回调函数用于返回选择的日期区间超过设置的 rangeMonth 值

- 回调函数 handleSelect，需设置 canSelected 为 true
- handleSelect 回调函数用于返回点后日期后返回对应的选择日期区间数组
