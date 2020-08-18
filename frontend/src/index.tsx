import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import PatternApp from './App'

ReactDOM.render(<PatternApp/>, document.getElementById('root'))

serviceWorker.unregister()
