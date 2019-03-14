<template>
  <el-table-column 
    :min-width="col.width"
    :prop="col.prop"
    :render-header="col['renderHeaderFunc']"
    :label="col.label"
    :sortable="col.sortable"
    align="left">
    <template slot-scope="scope">
        <span v-if="!isEdit(scope.row,col)" :title="scope.row[col.prop]" >{{ scope.row[col.prop] }}</span>
        <input v-else  v-focus ref="inputObj" :data-initvalue="scope.row[col.prop]" :value="scope.row[col.prop]" @blur="hBlur"/>
      </template>

    <template v-if="col.children">
      <my-column v-for="(item) in col.children"
        :key="item.prop"
        :col="item"></my-column>
    </template>

  </el-table-column>
</template>

<script>
export default {
  name: "MyColumn",
  data(){
    return {
      // initVal:
    }
  },
  props: {
    pEditValidator:{
      type:Function,
      default:()=>true
    },
    pEditColKey:{
      type:String,
      default:""
    },
    pEditRowId:{
      type:[String,Number],
      default:""
    },
    pEditStyle:{
      type:String,
      default:""
    },
    pIsEditing:{
      type:Boolean,
      default:false,
    },
    col: {
      type: Object
    }
  },
  methods:{
    hBlur(e){
      // console.info(this.$refs.inputObj.$el.dataset)
      console.info(e.target.value);
      let msg = this.pEditValidator(e.target.value)
      if(msg === true){
        this.$emit("modifyValSuccess",{
          oldVal:e.target.dataset.initvalue,
          newVal:e.target.value,
          editRowId:this.pEditRowId,
          editColKey:this.pEditColKey
        })
      }else{
        this.$emit("modifyValFailure",{
          msg:msg,
          oldVal:e.target.dataset.initvalue,
          newVal:e.target.value,
          editRowId:this.pEditRowId,
          editColKey:this.pEditColKey
        })
      }
    },
    isEdit(row,col){
      console.info(this.pIsEditing,row,col,this.pEditColKey,this.pEditRowId,this.pEditStyle)
      return this.pIsEditing && this.pEditStyle === 'click-cell-input' && this.pEditRowId === row.rowId && col.prop === this.pEditColKey;
    }
  }
};
</script>
