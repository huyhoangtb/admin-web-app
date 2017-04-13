import React from 'react'
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Store, {history} from './reducers/StoreInitializer';
import {ConnectedRouter} from 'react-router-redux';
import {IntlProvider} from 'react-intl';
import {i18nIntegration} from './i18n';
import WebApp from './themes/admin-default/WebApp';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {MuiThemeProvider, lightBaseTheme} from "material-ui/styles";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const lightMuiTheme = getMuiTheme(lightBaseTheme);

i18nIntegration((locale) => {
  render(
    <Provider store={Store}>
      <IntlProvider
        locale={locale}
        messages={window.i18nMessages[locale]}>
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <ConnectedRouter history={history}>
            <WebApp/>
          </ConnectedRouter>
        </MuiThemeProvider>
      </IntlProvider>
    </Provider>
    ,
    document.getElementById('root')
  )
});