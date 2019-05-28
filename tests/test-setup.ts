import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

// Ignore excalibur warning
const url: any = URL; // eslint-disable-line @typescript-eslint/no-explicit-any
url["revokeObjectURL"] = null;
url["createObjectURL"] = null;
