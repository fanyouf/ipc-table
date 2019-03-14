ipc-table
====

##  安装 

```
jnpm install @ipc/table
```
## 引入

main.js
```
import ipctable from "@ipc/table"
Vue.use(ipctable);
```

## 基本用法

### 模板
```
<IPCTable
    :pColsData="colsData"
    :pRowsData="rowsData">
</IPCTable>
```
### 数据
```
data(){
return {
    colsData: [
    {
        prop: "userName",
        label: "用户名",
    },
    {
        prop: "age",
        label: "年龄",
        classNameFuc: (val,row,column,rowIndex,columnIndex) => {
            return val > 20 ? "classRed" : "classBlue";
        }
    },
    {
        prop: "address",
        label: "地址"
    },
    ],
    rowsData: [
    {
        rowId:1 ,
        userName: "John Brown",
        age:18,
        address:"中华人民共和国北京市大兴区科创十一街京东集团总部C座一层."
    },
    {
        rowId:  2 ,
        userName: "Jim Green" ,
        age: 19,
        address:"中华人民共和国北京市大兴区科创十一街京东集团总部C座一层."
        }
    ]
}
} 
```

## 功能

- 显示/隐藏列
- 多级表头
- 合并单元格
- 导出excel
- 导入excel
- 固定表头

### 属性


| 参数	| 说明	| 类型	|  可选值	|  默认值 |
| ------ | ------ | ------ | ------ | ------ |
| pColsData	| 表格的列	| Array	|  必填	|   |
| pRowsData	| 表格的行	| Array	|  必填	|   |
| pIsShowExport	| 是否提供导出为excel功能。一旦设为了true，会显示一个导出按钮，它能把当前表格中的数据导出成excel。	| Boolean	| 可选。|false	|  
| pIsShowImport	| 是否提供从excel中导入功。一旦设为了true，会显示一个导入按钮，它能从excel文件中读出数据并显示在表格中	| Boolean	| 可选。|false	|
| pFixedHeight	| 表格整体的高度。如果不设置这个属性，表格的高度是自适应的；如果设置了这个值，则表格被限制在这个高度之内，多余的高度会在垂直方向上显示出滚动条。 例如：pFixedHeight="200"。 它的单位是px。	| Number	| 可选	| 无 |
| pUpdateTableFromExcelEventName	| 从excel中导入数据时的事件名。它与@importEvent事件一起使用。如果不设置它的话，导入数据成功后会直接更新数据；如果设置这个值，并监听importEvent就会得到从excel中导入的json格式的数据，用户可根据实际业务对数据进行进一步的操作	| String	| 可选	| 无 |
| pTotalRowNumber	| 一共有多少行。如果设置了这个值，并且这个值大于0，则会在表格下方出现 分页区域	| Number	| 可选	| 无 |
| pIsMulSelect	| 是否显示多选。默认为false。如果设置为true，则在第一列前插入一列用于供用户勾选。并通过监听`mulSelectChange`来获取当前用户选中的rowID	| Boolean	| 可选	| false |






#### 表格列： pColsData

它是一个对象数组。数组中的每一个对象表示一列。具体格式如下：
- prop ：必须。 表示列的key。它与pRowsData中的key对应。它必须是唯一的。
- label: 必须。 表示列的标题。
- classNameFuc: 可选。用来设置某个单元设置特殊的css类。入参是{val,row,column,rowIndex,columnIndex} , 返回值是表示具体css类的字符串。
- children：可选。表示多级表头。它的值同样是pColsData格式。
- isMerge:可选。是否需要合并这一列的数据。默认是false。如果设置为true,就会开启自动合并功能。
- isHidden:可选。 是否初始不显示这一列。默认是false。如果设置为true,表格初始始化时，不会显示这一列。
- align:可选。String类型。设置单元格内容在水平方向的对齐方式。可取值为："right" || "left" || "center" 。默认是"center" 表示水平居中。
- sortable:可选。当前列是否可以排序。默认为false。
- "renderHeaderFunc":可选。列标题 Label 区域渲染使用的 Function。格式是：`Function(h, { column, $index })`

下面是一个demo:

```
[
    {
        prop: "userName",
        label: "用户名",
        renderHeaderFunc:(h, { column, $index })=>{
            console.info(column)
            return h("h1",column.label + "h1")
          }
    },
    {
        prop: "age",
        label: "年龄",
        classNameFuc: (val,row,column,rowIndex,columnIndex) => {
            return val > 20 ? "classRed" : "classBlue";
        }
    },
    {
        label: "地址",
        prop: "info",
        children: [{ label: "省", prop: "province" },{ label: "市", prop: "city" }]
    }
]
```

#### 表格数据行： pRowsData

它是一个对象数组。数组中的每一个对象表示数组中的一行。具体格式如下：
- rowId ：必填。 表示行的主键。列的key。它与pRowsData中的key对应。它必须是唯一的。
- pColsData中的某个prop: 对应单元格的值。 值是基本数据类型。
- pColsData中的某个prop: 对应单元格的值。 值是对象(1)。

当它的值是一个对象时，必须遵守如下规则：
```
propName:{
    val:19, // 显示在表格单元格中的值
    editable:true, // 这个单元格是否可以编辑
    validator:(value)=>{ // 编辑单元格的值时，要用到的检验函数。如果通过检验，返回true；否则返回字符串来具体说明失败的原因。
        if(isNaN(value)){
            return "不是数值"
        }
        return true
    }
},
```

下面是一个例子：

```
[       
    {
        rowId:1 ,
        userName: "John Brown",
        age:{
            val:19,
            editable:true,
            validator:(value)=>{
                if(isNaN(value)){
                    return "不是数值"
                }
            return true
            }
        }
    }
]
```

### 事件


| 事件名 | 说明 | 回调参数  |
| ------ | ------ | ------ |
| modifyCellValueSuccess | 修改单元格成功。表示通过这个单元格的校验函数（默认不会有任何检验，除非你提供了自定义的检验函数） |对象： {oldVal,newVal,editRowId,editColKey,rowIndex,colIndex} |
| modifyCellValueFailure | 修改单元格失败。同上。 |对象： {msg,oldVal,newVal,editRowId,editColKey,rowIndex,colIndex} msg表示失败的原因 |
| importEvent | 从excel中导入数据。与pUpdateTableFromExcelEventName配合使用 |JSON格式的数据 |
| pageIndexChange | 翻页 |当前页的索引 |
| pageSizeChange | 每页显示几条发生了变化 |当前pagesize的值 |
| mulSelectChange | 如果pIsMulSelect设置为true，当用户进行选择时会抛出此事件 |Array，保存当前选中行的rowId的值 |



#### 使用 pUpdateTableFromExcelEventName 和 importEvent的demo
```
<IPCTable
    :pIsShowImport="true"
    pUpdateTableFromExcelEventName="importEvent"
    @importEvent="hImportEvent"
    :pIsShowExport="true"
    :pColsData="colsData"
    :pRowsData="rowsData">
</IPCTable>
```