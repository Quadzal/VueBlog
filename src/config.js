import Vue from 'vue'
import VueRouter from "vue-router"
import axios from "axios"
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import CKEditor from '@ckeditor/ckeditor5-vue';


Vue.config.productionTip = false

library.add(far)

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
 
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.use(CKEditor);

export default Vue