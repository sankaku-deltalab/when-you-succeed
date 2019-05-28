import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

// Ignore excalibur warning
const url: any = URL;
url["revokeObjectURL"] = null;
url["createObjectURL"] = null;
