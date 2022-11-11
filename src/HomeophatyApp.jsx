import { Provider } from 'react-redux';

import './App.css'
import { Alert } from './components/iterface/Alert';
import { MainRouter } from './routers/MainRouter'
import { store } from './store/store';

export const HomeophatyApp = () => {

  return (
    <>
      <Provider store={ store }>
        <Alert>
          <MainRouter />
        </Alert>
      </Provider>
    </>
  )
}
