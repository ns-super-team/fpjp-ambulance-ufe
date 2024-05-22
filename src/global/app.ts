import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/icon/icon'
import '@material/web/divider/divider'
import '@material/web/button/filled-tonal-button.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/filled-select.js'
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/select/select-option'

import { registerNavigationApi } from './navigation.js'

export default function() {
    registerNavigationApi()
}