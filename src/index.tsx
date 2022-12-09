import './index.css'

import { BrowserRouter, HashRouter } from 'react-router-dom'

import App from './app/App'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { store } from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
