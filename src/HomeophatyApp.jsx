import { Provider } from 'react-redux';

import './App.css'
import { MainRouter } from './routers/MainRouter'
import { store } from './store/store';

export const HomeophatyApp = () => {

  return (
    <>
      <Provider store={ store }>
        <MainRouter />
      </Provider>
    </>
  )
}
