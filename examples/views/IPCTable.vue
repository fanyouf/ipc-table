<template>
<div>
  <h2>IPCTable的基本使用</h2>
  <div v-fullScreen>
  <IPCTable
      :pIsMulSelect="isMulSelect"
      :pIsShowExport="true"
      :pIsShowImport="true"
      pEditStyle='click-cell-input'
      :pColsData="colsData"
      :pRowsData="rowsData"
      :pTotalRowNumber="1"
      @mulSelectChange="hMulSelectChange"
      @pageIndexChange="hPageIndexChange"
      @pageSizeChange="hPageSizeChange"
      @modifyCellValueSuccess="hModifyCellValueSuccess"
      >
    </IPCTable>
    </div>
  <hr>
  <div  class="markdown-body">
    <markdown/>
  </div>
</div>
</template>
<style>
.classRed{
  color:red;
}
.classBlue{
  color:blue;
}
</style>
<script>
import tableData from "./data.js"
import IPCTable from  "@/components/IPCTable/IPCTable"
import markdown  from './IPCTable.md'
export default {
  data(){
    return {
      isMulSelect:true,
      colsData:tableData.colsData,
      rowsData:tableData.rowsData,
      // colsData: [
      //   {
      //     prop: "userName",
      //     label: "用户名",
      //     // isHidden:true,
      //     align:"left",
      //     renderHeaderFunc:(h, { column, $index })=>{
      //       console.info(column)
      //       return h("h1",column.label + "h1")
      //     }
      //   },
      //   {
      //     prop: "age",
      //     label: "年龄",
      //     align:"right",
      //     sortable: true,
      //     classNameFuc: (val,row,column,rowIndex,columnIndex) => {
      //       return val > 20 ? "classRed" : "classBlue";
      //     }
      //   },
      //   {
      //     prop: "address",
      //     label: "地址",
      //   },
      // ],
      // rowsData: [
      //   {
      //     rowId:1 ,
      //     userName: "John Brown",
      //     age:{
      //       val:19,
      //       editable:true,
      //       validator:(value)=>{
      //         if(isNaN(value)){
      //           return "不是数值"
      //         }
      //         return true
      //       }
      //     },
      //     address:"中华人民共和国北京市大兴区科创十一街京东集团总部C座一层.",
      //   },
      //   {
      //     rowId:  2 ,
      //     userName: "Jim Green" ,
      //     age: {
      //       val:19,
      //       editable:false,
      //     },
      //     address:"中华人民共和国北京市大兴区科创十一街京东集团总部C座一层."
      //     },
      //     {
      //       rowId:  3 ,
      //       userName: "Jim Green" ,
      //       age: 31,
      //       address:"中华人民共和国北京市大兴区科创十一街京东集团总部C座一层."
      //     }
      //   ]
    }
  },
  components: {
    markdown,
    IPCTable
  },
  methods:{
    hMulSelectChange(val){
      console.info("你的多选结果是",val);
      setTimeout(()=>{
        this.isMulSelect = false;
        console.info("hidden mul select",this,this.isMulSelect)
      },2000)
    },
    hPageSizeChange(pageSize){
      console.info(pageSize)
    },
    hPageIndexChange(pageIndex){
      console.info(pageIndex)
    },
    hModifyCellValueSuccess({oldVal,newVal,editRowId,editColKey,rowIndex,colIndex}){
      console.info({oldVal,newVal,editRowId,editColKey,rowIndex,colIndex})
    }
  }
}
</script>