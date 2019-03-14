## 目的

集成一个通用的表格业务组件。

## 依赖

- 组件： element-ui 。核心功能使用了 它的 table 组件。
- 组件： iview modal input
- v-dragge
- xlsx

## 功能

- 自适应列宽
- 固定列
- 固定高度
- 单元格内容不换行
- 手动调整列宽
- 合并单元格
- 排序
- 从 excel 导入
- 导出为 excel 文件
- 编辑
- 自定义单元格样式
- 隐藏/显示列
- 调整列的顺序
- 多级表头

## 示例

### 基本示例

html

```
    <IPCTable
      :pColsData="colsData"
      :pRowsData="rowsData">
    </IPCTable>
```

js

```
data(){
    return {
        colsData: [
        {
          title: "用户名",
          key: "userName",
        },
        {
          title: "Age",
          key: "age",

        },
      ],
      rowsData: [
        {
          rowId:1 ,
          userName: "John Brown",
          age: 18,

        },
        {
          rowId:  2 ,
          userName: "Jim Green" ,
          age: 18,
        }]
    }
}

```

说明

- pColsData ：固定名字。它是一个对象数组，其中的每个对象表示一列。结构为：{key:yourKey, title: yourTitle} 。其中 `key`和`title`是固定写法

- pRowsData ：固定名字。它是一个对象数组，其中的每个对象表示一行数据。

### 设置初始隐藏列 isHidden

当表格中的列比较多时，我们需要把一部分列先隐藏起来。

只需要在 pColsData 中的某个列上，设置 isHidden 属性 。

```
colsData: [
        {
          title: "用户名",
          key: "userName",
          isHidden:true
        },
        {
          title: "Age",
          key: "age",
        },
      ]
```

### 设置固定列

当表格中的列比较多时，我们需要把一部分列固定起来，并在表格中显示出水平方向上的滚动条。

只需要在 pColsData 中的某个列上，设置 fixed 属性 。

```
colsData: [
        {
          title: "用户名",
          key: "userName",
          fixed:"left"
        },
        {
          title: "Age",
          key: "age",
        },
      ]
```

说明

- fixed 的取值 必须是"left" 或者 "right"

### 合并单元格 isMerge

只需要在 pColsData 中的某个列上，添加 `isMerge` 属性 并设置为 true。

```
colsData: [
    {
        title: "用户名",
        key: "userName",
        isMerge:true
    },
    {
        title: "Age",
        key: "age",
    },
]
```

### 设置单元格内容水平对齐

表格中单元格默认是水平居中对齐的。可以通过在 pColsData 中的某个列上，设置 align 属性来特殊设置 。

```
colsData: [
        {
          title: "用户名",
          key: "userName",
        },
        {
          title: "Age",
          key: "age",
          align:"right"
        },
      ]
```

说明

- align 的取值 必须是"left" 或者 "right"

### 设置自定义的单元格样式

如果希望给某个单元格设置特殊的样式，可以通过在 pColsData 中的某个列上，设置 classNameFunc 属性来特殊设置 。

示例如下：

```
colsData: [
        {
          title: "用户名",
          key: "userName",
        },
        {
          title: "Age",
          key: "age",
          classNameFuc: (val,row,column,rowIndex,columnIndex) => {
            return val > 20 ? "classRed" : "classBlue";
          }
        },
      ]
```

说明

`classNameFuc` 的值是一个函数，它的入参如下：

- val :当前单元格的值
- row :当前行
- column ：当前列
- rowIndex：当前行序号
- columnIndex：当前列序号

返回值是类名。

### 启动排序功能

表格中的列默认不能排序，可以通过在 pColsData 中的某个列上，设置 sortable 属性为`true` 。

```
colsData: [
        {
          title: "用户名",
          key: "userName",
        },
        {
          title: "Age",
          key: "age",
          sortable: true
        },
      ]
```

### 设置表格的固定高度 `pFixedHeight`

如果页面整体的高度有限，可以给表格设置一个固定的高度。当数据行的整体内容超出了这个固定高度值时，会显示出垂直方向的滚动条。

设置 pFixedHeight 属性值即可。它的单位是 px.

```
 <IPCTable
    :pColsData="colsData1"
    :pRowsData="rowsData1"
    :pFixedHeight="500">
</IPCTable>
```

### 显示复杂数据

对于数据行来说，数据的结构可能非常复杂:一个单元格除了要显示的数据之外，还有其他的数据。

如下的`age`属性：

```
[{
    rowId: { val: 20 },
    userName: { val: "Joe Black" },
    age: { val: 42,otherP1:"test1",otherP2:true }
},
{
    ....
}]
```

其中的 `val`字段才是我们希望显示在表格中。

此时为了正常的显示数据，必须设置 `pValKey`属性的值。

```
 <IPCTable
    :pColsData="colsData1"
    :pRowsData="rowsData1"
    pValKey="val">
</IPCTable>
```

### 提供编辑某个单元格值的功能。

有两个前提：

1. 组件的`pIsEdit` 设置为 true。
2. 数据行中，在可以编辑的字段上，添加 editable 属性，并设置为 true

同时，添加对`changeData`事件的监听，以处理保存数据修改的逻辑。

```
 <IPCTable
    @changeData="hChangeData"
    :pColsData="colsData1"
    :pRowsData="rowsData1"
    :pIsEdit="true">
</IPCTable>
```

```
 rowsData: [
    {
        rowId: { val: 1 },
        userName: { val: "John Brown" },
        age: { val: 18, editable: true },
        address: { val: "New York No. 1 Lake Park" },
        address1: { val: "New York No. 1 Lake Park" },
        date: { val: "2016-10-01" },
        saler: { val: "1233232.33223%" },
        GMV: { val: "123323" }
    },
    {
        rowId: { val: 2 },
        userName: { val: "Jim Green" },
        age: { val: 18 },
        address: { val: "London No. 1 Lake Park", editable: true },
        address1: { val: "London No. 1 Lake Park" },
        address2: { val: "London No. 1 Lake Park" },
        address3: { val: "London No. 1 Lake Park" },
        date: { val: "2016-10-01" }
    }]
```

#### 编辑数据的基本流程

1. 启动编辑。此时，可编辑的单元格在左上角会有一个特殊的标记。同时被添加一个类 `canEdit` 。你如果对这样样式不满意，可以通过自定义的样式去覆盖它。

2. 点击可以编辑的单元格。

3. 在弹出框中进行数据的修改,点击弹出框的确定按钮。

4. 点击表格工具条中的`保存`按钮，会抛出 `changeData`事件，同时把整个表格中的数据作为事件的参数传出。

### 导出 excel 功能 `pIsShowExport`

设置组件的 `pIsShowExport` 为 true

```
<IPCTable
   :pIsShowExport="true"
    :pColsData="colsData1"
    :pRowsData="rowsData1"
    :pIsEdit="true">
</IPCTable>
```

### 导入 excel 到表格 `pIsShowImport`

设置组件的 `pIsShowImport` 为 true

```
<IPCTable
   :pIsShowImport="true"
    :pColsData="colsData1"
    :pRowsData="rowsData1"
    :pIsEdit="true">
</IPCTable>
```

#### 默认的导入规则是`覆盖`。

导入生效的前提是当前的表格中有数据行，然后用导入数据中的行去覆盖表格中的行。 常见的应用场景是：先对表格进行导出，然后修改 excel（不要添加新行），在进行导入操作。

#### 自定义导入

通过设置`pUpdateTableFromExcelEventName`属性，并监听这个事件，在回调函数中自行处理导入的数据。

```
<IPCTable
   :pIsShowImport="true"
   @importData="yourHandlerFuc"
    :pColsData="colsData1"
    :pRowsData="rowsData1"
    :pUpdateTableFromExcelEventName="importData"
    >
</IPCTable>

methods:{
    yourHandlerFuc(jsonArr){
        console.info(jsonArr)
    }
}
```
