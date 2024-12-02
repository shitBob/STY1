import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Button,Cell, CellGroup ,Form, Field, Tabbar, TabbarItem,Collapse, CollapseItem,Tag
    ,NavBar,Pagination,Divider,Checkbox, CheckboxGroup,Image as VanImage,ImagePreview,Highlight,Icon,
    CountDown

} from 'vant';
import piniaPersistedstate from 'pinia-plugin-persistedstate';
import 'vant/lib/index.css';
import axios from 'axios';
const app = createApp(App)

app.use(CountDown)
app.use(Highlight)
app.use(Button);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Collapse);
app.use(CollapseItem);
app.use(Tag);
app.use(NavBar);
app.use(Pagination);
app.use(Divider);
app.use(Checkbox); 
app.use(CheckboxGroup);
app.use(VanImage);
app.use(ImagePreview);
app.use(Icon);

const pinia=createPinia()
pinia.use(piniaPersistedstate);
app.use(pinia)
app.use(router)
app.mount('#app')
