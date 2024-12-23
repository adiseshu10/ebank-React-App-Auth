import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <Route exact path="/" component={Home} />
      <NotFound />
    </Switch>
  </div>
)
export default App
