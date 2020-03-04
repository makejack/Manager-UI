import vue from 'vue'

import {
  Button,
  Dialog,
  Pagination,
  Container,
  Header,
  Aside,
  Main,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Menu,
  Submenu,
  MenuItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
  Icon,
  Message,
  MessageBox,
  Loading,
  Upload,
  Tag
} from 'element-ui'

vue.use(Button)
vue.use(Dialog)
vue.use(Pagination)
vue.use(Container)
vue.use(Header)
vue.use(Aside)
vue.use(Main)
vue.use(Form)
vue.use(FormItem)
vue.use(Input)
vue.use(Select)
vue.use(Option)
vue.use(Menu)
vue.use(Submenu)
vue.use(MenuItem)
vue.use(Dropdown)
vue.use(DropdownItem)
vue.use(DropdownMenu)
vue.use(Table)
vue.use(TableColumn)
vue.use(Icon)
vue.use(Upload)
vue.use(Tag)

vue.use(Loading.directive)

vue.prototype.$loading = Loading.service
vue.prototype.$msgbox = MessageBox
vue.prototype.$alert = MessageBox.alert
vue.prototype.$confirm = MessageBox.confirm
vue.prototype.$prompt = MessageBox.prompt
vue.prototype.$message = Message
