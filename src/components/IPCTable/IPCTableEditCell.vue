<template>
    <Modal
        title="修改"
        v-model="visiable"
        @on-ok="hSave"
        @on-cancel="hCancel"
        :mask-closable="false">
        <p><span>初值：{{ initValue }}</span></p>
        <p><Input v-model="value" /></p>
    </Modal>
</template>
<script>
export default {
  props: {
    pEditRow: {
      type: Object
    },
    pEditColKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      value: "",
      initValue: "",
      row: { ...this.pEditRow },
      visiable: false
    };
  },
  methods: {
    hSave() {
      this.$emit("ok", this.value);
    },
    hCancel() {
      this.$emit("cancel");
    }
  },
  watch: {
    pEditColKey: {
      handler(newVal, oldVal) {
        this.visiable = newVal != "";

        if (newVal != "") {
        }
      },
      immediate: true
    },
    pEditRow: {
      handler(newVal) {
        this.row = { ...newVal };
        if (this.pEditRow != "") {
          this.value = this.row[this.pEditColKey];
          this.initValue = this.value;
        }
      },
      immediate: true
    }
  }
};
</script>

