import React from 'react'
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux';
import AppReducers from './reducers/AppStore';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import createBrowserHistory from 'history/createBrowserHistory'


import {IntlProvider} from 'react-intl';
import {i18nIntegration} from './i18n';
// import App from './app/App';
import WebApp from './app/themes/admin-default/WebApp';
// import WebApp from './app/WebApp';
//support for material-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {MuiThemeProvider, lightBaseTheme} from "material-ui/styles";
//support for tab on material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const history = createBrowserHistory();
const middleware = routerMiddleware(history)

const lightMuiTheme = getMuiTheme(lightBaseTheme);

let store = createStore(
    AppReducers,
    compose(applyMiddleware(middleware),
        devToolsEnhancer ? devToolsEnhancer() : f => f)
);

i18nIntegration((locale) => {
    render(
        <Provider store={store}>
            <IntlProvider
                locale={locale}
                messages={window.i18nMessages[locale]}>
                <MuiThemeProvider muiTheme={lightMuiTheme}>
                    <ConnectedRouter history={history}>
                        {/*<App/>*/}
                        <WebApp/>
                    </ConnectedRouter>
                </MuiThemeProvider>
            </IntlProvider>
        </Provider>
        ,
        document.getElementById('root')
    )
});