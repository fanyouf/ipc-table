## 导入excel

设置 pIsShowImport = "true"。

建议先导出，在excel中修改，然后再导入。

### 模板
```
<IPCTable
    :pIsShowImport="true"
    :pColsData="colsData"
    :pRowsData="rowsData">
</IPCTable>
```

###  劫持导入数据 pUpdateTableFromExcelEventName

从excel中获取数据之后，你可以按你自己的规则进行数据处理。
1. 设置`pUpdateTableFromExcelEventName`的值。
它是值是一个字符串，当从excel中获取数据之后，并不直接使用数据去覆盖table，而是抛出这个事件，并把excel中的数据传出。 例如设置值为`importEvent`

2. 监听事件，自定义回调函数去处理
`@importEvent="hImportEvent"`

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

```
{
    methods:{
        hImportEvent(data){
            console.info(data);
            alert(`数据共${data.length}行，请在控制台中查看数据`)
        }
    }
}
```

