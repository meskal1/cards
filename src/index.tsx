import './index.scss'
import './analytics/analytics'
import './utils/setWindowHeight'

import * as ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from './app/App'
import { store } from './app/store'
import RouterUtils from './utils/routerUtils'

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <HashRouter>
      <RouterUtils>
        <App />
      </RouterUtils>
    </HashRouter>
  </Provider>
)
