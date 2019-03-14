<template>
<div>
  <h2>从excel中导入</h2>
  <IPCTable
      :pIsShowImport="true"
      pUpdateTableFromExcelEventName="importEvent"
      @importEvent="hImportEvent"
      :pIsShowExport="true"
      :pColsData="colsData"
      :pRowsData="rowsData">
    </IPCTable>
  <hr>
  <div  class="markdown-body">
    <markdown/>
  </div>
</div>
</template>
<script>
import IPCTable from  "@/components/IPCTable/IPCTable"
import markdown  from './IPCTableImport.md'
export default {
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
          label: "地址",
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
  },
  components: {
    markdown,
    IPCTable
  },
  methods:{
    hImportEvent(data){
      console.info(data);
      alert(`数据共${data.length}行，请在控制台中查看数据`)
    }
  }
}
</script>