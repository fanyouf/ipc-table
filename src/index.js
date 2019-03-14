import IPCTable from "./components/IPCTable/IPCTable"
import directives from "./directives"
const components = {
  IPCTable
};

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });

  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
  });
};

export default { install }

