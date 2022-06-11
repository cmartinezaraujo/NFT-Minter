import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {NFTProvider} from './Context/NFTContext'

ReactDOM.render(
  <NFTProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NFTProvider>,
  document.getElementById('root')
)
