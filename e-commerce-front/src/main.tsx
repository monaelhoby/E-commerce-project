import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import AppRoute from '@routes/appRouter'
import {store, presistor} from '@store/index'
import './services/axios-global'

ReactDOM
    .createRoot(document.getElementById('root')!)
    .render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={presistor}>
                <AppRoute/></PersistGate>
        </Provider>
    )