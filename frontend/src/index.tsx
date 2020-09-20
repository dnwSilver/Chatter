import React              from 'react'
import ReactDOM           from 'react-dom'
import PatternApp         from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<PatternApp/>, document.getElementById('root'))

serviceWorker.unregister()
