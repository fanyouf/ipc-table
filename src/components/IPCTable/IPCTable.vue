<template>
<div class="ipcTable">
  <div class="flexa">
    <div v-if="pIsShowEditSwitch" style="margin-right:auto;"> 编辑<i-switch v-model="isEdit" />  
      <Button @click.stop="hSaveTableData" size="small" :disabled="!isDirty" type="default" >保存</Button>
    </div>
    <Poptip v-if="pIsShowImport" v-model="isShowImportPop" style="text-align:center" title="从excel中导入" trigger="click" placement="bottom-end">
      <Button type="text" :loading="isImportExcel">导入</Button>
      <div slot="content">
        <form enctype="multipart/form-data" novalidate >
            <input
              type="file"
              name="file"
              id="xFile"
              @change="hFilesChange($event.target.files)"
            />
          <Button type="primary" @click="hImportFromExcel">确定</Button>
        </form>
      </div>
    </Poptip>
    <Button v-if="pIsShowExport" type="text" :loading="downloadExcel"  @click="hExportToExcel">导出</Button>
    <Poptip  v-model="isShowColsPop" style="text-align:center" :title="cColTitle" trigger="click" placement="bottom-end">
      <div class="pointer" :class="{colsettingIcon:isShowColsPop}">
        <Icon style="font-size:1.5em;" title="列设置"  type="ios-arrow-forward" />{{cColTitle}}
      </div>
      <div slot="content">
        <ul style="text-align:left">
          <li
            class="item item-hover"
            v-for="(item,index) in allColsForCheckList"
            :key="`li_${index}`"
            :data-order="index"
            v-drag="handleDrag"
            title="按下拖动可排序"
          >
            {{index+1}}.
            <input
              type="checkbox"
              style="cursor:pointer"
              :value="item.prop"
              v-model="item.check"
            >
            {{item.label}}
          </li>
        </ul>
      </div>
    </Poptip>
  </div>
   <!--  -->
    <!--  -->
  
  <div v-if="flag">
  <el-table
    v-fixedTableHeader
    v-loading="isLoadTable"
    ref="table"
    header-row-class-name="blod"
    header-cell-class-name="align_center"
    :span-method="cSpanMethod"
    :height="pFixedHeight"
    :data="rowsData"
    :cell-class-name="cellClassName"
    @selection-change="handleSelectionChange"
    @cell-click="hCellClick"
    border>
    <el-table-column
      v-if="pIsMulSelect"
      type="selection"
      width="55">
    </el-table-column>
    <my-column v-for="item in cColsData"  
    :key="item.prop" 
    :col="item" 
    :pIsEditing="isEditing" 
    :pEditRowId ="editRowId"
    :pEditColKey="editColKey"
    :pEditValidator="editValidator"
    :pEditStyle="pEditStyle"
    @modifyValSuccess="hModifyValSuccess"
    @modifyValFailure="hModifyValFailure"
    ></my-column>
  </el-table>
  </div>
  <a style="display:none;" id="aid">导出excel时使用的钩子</a>

  <TableEditCell
    v-if="editStyle=='cell-dialog'"
    ref="refTableEditCell"
    :pEditRow="editRow"
    :pEditColKey="editColKey"
    @ok="hEditCellOk"
    @cancel="hEditCellCancel"
  >
  </TableEditCell>
  <div class="m5" v-show="cShowPageArea">
    <Page :total="pTotalRowNumber" show-total show-elevator show-sizer :page-size-opts="pPageSizeOpts"  size="small"
    @on-change="hPageChange"
    @on-page-size-change="hPageSizeChange"
    />
  </div>
</div>
</template>

<style scoped>
.m5{
  margin:5px;
  overflow: hidden;
}
.canEdit {
  position: relative;
  cursor: text;
}
.canEdit::after {
  content: "";
  border: 10px solid transparent;
  border-top-color: #ccc;
  border-left-color: #ccc;
  top: 0;
  left: 0;
  position: absolute;
}
.bold {
  font-weight: bold;
}
.colsettingIcon {
  cursor: pointer;
}
.pointer {
  cursor: pointer;
}
.ivu-icon {
  transition: all 0.5s;
}
.colsettingIcon .ivu-icon {
  transform: rotate(90deg);
}

.fixTopTable .el-table__empty-block {
  display: none;
}
.ipcTable .el-table__row .cell {
  padding-left: 0.5em;
  padding-right: 0.5em;
}
.ipcTable .el-table__row .cell span {
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.align_right {
  text-align: right !important;
}
.align_center {
  text-align: center !important;
}
.align_left {
  text-align: left  !important;
}

.item {
  padding: 0.2em;
  display: flex;
  align-items: center;
}
.item-hover:hover {
  margin: 1px;
  outline: 1px dotted #ccc;
  cursor: move;
}

.dragging {
  margin: 1px;
  opacity: 0.8;
  color: #6894d1;
}
.drag-over {
  margin: 1px;
  outline: 1px solid #2d8cf0;
}
.loader {
  width: 30px;
  height: 30px;
  position: relative;
  margin: 0 auto;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>
<script>
import EXECL from "./IPCTable.vue.unit";
import _methods from "./IPCTable.vue.js";
import TableEditCell from "./IPCTableEditCell.vue";
import myColumn from "./IPCTable-column";
export default {
  data() {
    return {
      fixedHeaderStyle: { position: "fixed", top: 0 },
      importExcelFileName: "",
      isShowImportPop: false,
      isShowColsPop: false,
      isImportExcel: false,
      isLoadTable: false,
      rowsData: [],
      tableWidth: 500,
      isEdit: this.pIsEdit,
      editStyle:this.pEditStyle,
      allColsForCheckList: [],
      downloadExcel: false,

      isDirty: false,

      isEditing: false, // 是否正编辑

      editRow: {},
      editRowId:-1,
      editColKey: "",

      editValidator:()=>ture,

      flag: true
    };
  },
  components: {
    TableEditCell,
    myColumn
  },
  props: {
    // 是否显示多选
    pIsMulSelect:{
      type:Boolean,
      default:false
    },
    pTotalRowNumber:{
      type:Number,default:0,
    },
    pTotal:{type:Number,default:0},
    pPageSizeOpts:{
      type:Array,
      default:()=>{
        return [10,20,30,50]
      }
    },
    pEditStyle:{
      type:String,
      default:"",
      validator:(item)=>{
        return true;
      }
    },
    pIsShowEditSwitch:{
      type:Boolean,
      default:false
    },
    // 是否可以开启编辑
    pIsEdit: {
      type: Boolean,
      default: false
    },
    pIsShowExport: {
      type: Boolean,
      default: false
    },
    pIsShowImport: {
      type: Boolean,
      default: false
    },
    // 导入数据到excel时，自定义事件名
    pUpdateTableFromExcelEventName: {
      type: String,
      default: ""
    },
    // 固定高度值
    pFixedHeight: {
      type: [Number, String],
      default: undefined
    },
    // 要显示出来内容在单元格对象中的字段名
    pValKey: {
      type: String,
      required: false,
      default: "val"
    },
    // 数据行
    pRowsData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 给表格的全部的列
    pColsData: {
      type: Array,
      default: () => {
        return [];
      },
      validator: fixedCols => {
        if (fixedCols.length > 0) {
          return fixedCols.every(col => {
            return col.hasOwnProperty("prop") && col.hasOwnProperty("label");
          });
        } else {
          return true;
        }
      }
    }
  },
  computed: {
    cShowPageArea(){
      return this.pTotalRowNumber > 0;
    },
    cColTitle() {
      return (
        "已选" +
        this.allColsForCheckList.filter(item => item.check).length +
        "列/共" +
        this.allColsForCheckList.length +
        "列"
      );
    },
    cSpanMethod() {
      let data = [];
      this.rowsData.forEach(row => {
        let obj = {};
        let keys = Object.keys(row);
        keys.forEach(key => {
          obj[key] =
            row[key] + (this.editableObject[key + row.rowId] ? "--" : "");
        });
        data.push(obj);
      });

      return this.creatCellMerginFunc(
        data,
        this.cMergeCols,
        this.cColsData,
        "both"
      );
    },
    cMergeCols() {
      let rs = [];
      this.cColsData.forEach(item => {
        if (item.isMerge) {
          rs.push(item.prop);
        }
      });
      return rs;
    },
    cFlatCols() {
      let rs = this.flatCols(this.pColsData);
      console.info("cFlatCols", rs);
      return ts;
    },
    // TODO: 这个flag加的不知何故
    cColsData() {
      this.flag = false;
      let rs = this.buildColsWithCheckList(
        this.pColsData,
        this.allColsForCheckList
      );
      console.info(rs, this.allColsForCheckList, this.pColsData, this.rowsData);

      setTimeout(() => {
        this.flag = true;
      }, 10);

      this.setColWidth(rs, this.rowsData,  this.tableWidth) 
      return rs;
    }
  },

  mounted() {
    this.tableWidth = 500;
    try {
      this.tableWidth = this.$refs.table.$el.getBoundingClientRect().width;
    } catch (e) {
      // console.info(e);
    }
  },
  methods: {
    ..._methods,
    hPageChange(curPageIndex){
      this.$emit("pageIndexChange",curPageIndex)
    },
    hPageSizeChange(curPageSize){
      this.$emit("pageSizeChange",curPageSize)
    },
    updateCellVal(rowId,colKey,newVal){
      let row = this.rowsData.find(row =>row.rowId === rowId);
      if(row){
        let obj =  row[colKey];
        if(typeof(obj) === "object"){
          obj.val = newVal;
        }
        else{
          row[colKey] = newVal;
        }
        return true
      }else{
        return false
      }
    },
    hModifyValSuccess({oldVal,newVal,editRowId,editColKey}){
      console.info(oldVal,newVal,editRowId,editColKey);
      if( this.updateCellVal(editRowId,editColKey, newVal )){
        this.isEditing = false;
        let rowIndex = this.rowsData.findIndex(row=>row.rowId===editRowId);
        let colIndex = this.cColsData.findIndex(col=>col.prop === editColKey)
        this.$emit("modifyCellValueSuccess",{oldVal,newVal,editRowId,editColKey,rowIndex,colIndex})
      }
    },
    hModifyValFailure({msg,oldVal,newVal,editRowId,editColKey}){
      console.info(msg,oldVal,newVal,editRowId,editColKey)
      // this.updateCellVal(editRowId,editColKey, oldVal );
      this.isEditing = false;
      let rowIndex = this.rowsData.findIndex(row=>row.rowId===editRowId);
      let colIndex = this.cColsData.findIndex(col=>col.prop === editColKey)
      this.$emit("modifyCellValueFailure",{oldVal,newVal,editRowId,editColKey,rowIndex,colIndex})
    },
    getValidteFunc(rowId,colKey){
      let row = this.pRowsData.find(row =>row.rowId === rowId);
      if(row){
        if(row[colKey].validator){
          return row[colKey].validator
        }
        else{
          return (v)=>true
        }
      }else{
        return (v)=>true;
      }
    },
    flatCols(newVal) {
      let rs = [];
      for (var i = 0; i < newVal.length; i++) {
        let col = newVal[i];
        if (col.children) {
          let children = this.flatCols(col.children);
          rs = rs.concat(children);
        } else {
          rs.push(col);
        }
      }
      return rs;
    },
    // 要处理嵌套的情况 不能同步顺序
    buildColsWithCheckList__(newVal, allColsForCheckList) {
      let rs = [];
      for (var i = 0; i < newVal.length; i++) {
        let col = newVal[i];
        if (col.children) {
          let children = this.buildColsWithCheckList(
            col.children,
            allColsForCheckList
          );
          rs.push({
            ...col,
            children
          });
        } else {
          let obj = allColsForCheckList.find(item => item.prop === col.prop);
          if (obj.check) {
            rs.push({ ...col });
          }
        }
      }
      return rs;
    },
    // 要处理嵌套的情况
    buildColsWithCheckList(pColsData, allColsForCheckList) {
      let rs = [];

      for (var i = 0; i < allColsForCheckList.length; i++) {
        let obj = allColsForCheckList[i];
        if (obj.check) {
          let col = pColsData.find(it=>it.prop === obj.prop)
          if(col){
            if(col.children){
              let children = this.buildColsWithCheckList(
                col.children,
                allColsForCheckList
              );
              rs.push({
                ...col,
                children
              });
            } else {
              rs.push({...col})
            }
          }
        }
      }
      return rs;
    },

    fIsEdit(row, column, index) {
      // console.info(column.prop, row.rowId, index, this.editableObject);
      return this.isEdit && !!this.editableObject[column.prop + row.rowId];
    },
    hFilesChange(file) {
      this.importExcelFileName = file[0];
      this.isShowImportPop = true;
    },
    hImportFromExcel() {
      if (this.importExcelFileName === "") {
        return false;
      }
      this.isShowImportPop = false;
      this.isImportExcel = true;
      setTimeout(() => {
        this.isImportExcel = false;
        EXECL.import(this.importExcelFileName, this.cColsData).then(
          jsonArr => {
            this.updateTableRowWithJsonArr(jsonArr);
          },
          d => {
            this._error(d);
            return;
          }
        );
      }, 2000);
    },
    hExportToExcel() {
      let data = this.exportToJson();
      this.downloadExcel = true;
      try {
        EXECL.download(document.getElementById("aid"), data, "aaaa");
      } catch (e) {
      } finally {
        this.downloadExcel = false;
      }
    },
    handleDrag: function(aindex, bindex) {
      var b = this.allColsForCheckList[aindex];
      var a = this.allColsForCheckList[bindex];

      console.info(aindex,bindex)

      this.$set(this.allColsForCheckList, aindex, a);
      this.$set(this.allColsForCheckList, bindex, b);
    },
    hEditCellOk(val) {
      let row = this.rowsData.find(row => {
        return row.rowId === this.editRow.rowId;
      });
      if (row) {
        row[this.editColKey] = val;
        this.isDirty = true;
      } else {
        console.error(`修改错误,没有找到行`);
        console.info(this.rowsData, this.editRow, this.editColKey);
        console.error(`修改错误,没有找到行`);
      }
      this.hEditCellCancel();
    },
    hEditCellCancel() {
      this.editColKey = "";
    },
    hChechboxChange(e) {
      // console.info(e);
    },
    hSaveTableData() {
      this.$emit("changeData", this.rowsData);
    },
    updateTableRowWithJsonArr(jsonArr) {
      // 从excel中导入数据
      // 默认使用覆盖规则：导入的数据行会覆盖表格中现有的数据行，对超出的数据行不做处理,
      // 如果给定事件名，则抛出数据
      if (this.pUpdateTableFromExcelEventName === "") {
        jsonArr.forEach((item, index) => {
          let keys = this.cColsData.map(it => it.prop);
          let targetData = this.rowsData[index];
          if (!targetData) {
            return;
          }
          keys.forEach(key => {
            if (typeof targetData[key] === "object" && this.pValKey) {
              targetData[key][this.pValKey] = item[key];
            } else {
              targetData[key] = item[key];
            }
          });
        });
      } else {
        this.$emit(this.pUpdateTableFromExcelEventName, jsonArr);
      }
    },
    handleSelectionChange(val) {
      if(this.pIsMulSelect){
        this.$emit("mulSelectChange",val.map(item=>item.rowId));
      }
      // this.multipleSelection = val;
    },
    hCellClick(row, column, cell, event) {
      if (this.editableObject[column.property + row.rowId]) {
        
        this.isEditing = true;
        this.editRowId =  row.rowId
        // this.editFuc = 

        this.editColKey = column.property;
        this.editRow = row;
        this.editValidator = this.getValidteFunc(row.rowId,column.property)
      } else {
        return;
      }
    },
    cellClassName({ row, column, rowIndex, columnIndex }) {
      console.info(row, column, rowIndex, columnIndex);
      let classNameList = [];
      try {
        let align = this.cColsData[columnIndex].align;

        if (align) {
          classNameList.push("align_" + align);
        } else {
          classNameList.push("align_" + "center");
        }
        let classNameFuc = this.cColsData[columnIndex].classNameFuc;
        if (classNameFuc) {
          if (typeof classNameFuc === "function") {
            let colName = column.property;
            let colVal = row[colName];
            let cls = classNameFuc(colVal, row, column, rowIndex, columnIndex);
            classNameList.push(cls);
          }
        }
        if (this.isEdit && this.editableObject[column.property + row.rowId]) {
          classNameList.push("canEdit");
        }
      } catch (e) {
        console.warn(e);
      }

      return classNameList.join(" ");
    },
    getCellValueToShow(obj){
      return typeof(obj) === "object" ? obj['val'] : obj;
    },
    createRows(rowsOriginData = []) {
      if (!rowsOriginData) return [];
      if (rowsOriginData.length === 0) return [];
      let rs = this.validatorTableData(rowsOriginData, this.pValKey);

      if (rs !== true) {
        console.warn(rs.join("\n"));
        return [];
      }
      let rowsData = rowsOriginData.map(item => {
        let obj = {};
        for (let key in item) {

          // obj[key] =  this.pValKey === "" ? item[key] : item[key][this.pValKey];
          obj[key] = this.getCellValueToShow(item[key])
        }
        return obj;
      });
      console.info("表格中的行......",rowsData)
      return rowsData;
    },
    createEditableObject(newVal) {
      // {
      //     rowId: { val: 1 },
      //     userName: { val: "John Brown" },
      //     age: { val: 18, editable: true },
      //     address: { val: "New York No. 1 Lake Park" },
      //     date: { val: "2016-10-01" }
      //   },
      let obj = {};
      newVal.forEach(item => {
        let rowId = item["rowId"]  
        let keys = Object.keys(item);
        keys.forEach(key => {
          let colName = key;
          if (!!item[key].editable) {
            obj[colName + rowId] = true;
          }
        });
      });
      return obj;
    },
    // 要处理嵌套的情况
    createColsFromList(newVal) {
      let rs = [];
      for (var i = 0; i < newVal.length; i++) {
        let col = newVal[i];
        if (col.children) {
          rs = rs.concat(this.createColsFromList(col.children));
        } else {
          // if (!col.isHidden) {
          rs.push({ ...col, check: !col.isHidden });
          // }
        }
      }
      return rs;
    }
  },
  watch: {
    pColsData: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.allColsForCheckList = this.createColsFromList(newVal);
          this.flatCols = this.flatCols(newVal);

          console.info("flatCols", this.flatCols);

          // this.allColsForCheckList = newVal.map(item => {
          //   let obj = {
          //     label: item.label,
          //     prop: item.prop,

          //     check: !item.isHidden
          //   };
          //   if (!!item.fixed) {
          //     obj.fixed = item.fixed;
          //   }

          //   return obj;
          // });
          // console.info(this.allColsForCheckList);
        }
      },
      immediate: true
    },
    pRowsData: {
      handler: function(newVal, oldVal) {
        this.rowsData = this.createRows(newVal);
        // console.info("rowData.....", this.rowsData);
        this.editableObject = this.createEditableObject(newVal);
      },
      immediate: true
    }
  }
};
</script>
