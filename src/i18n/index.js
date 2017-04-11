/**
 * Created by Peter Hoang Nguyen on 3/29/2017.
 */
import {injectIntl} from 'react-intl';
import  config from '../configs/configuration';
import {addLocaleData} from 'react-intl';
import scriptjs from 'scriptjs'; //$script.js is an asynchronous JavaScript loader and dependency manager
import qs from 'qs'; //A querystring parser that supports nesting and arrays, with a depth limit.



const SupportI18N = (callback, locale) => {
    // addLocaleData(window.ReactIntlLocaleData[localePrefix]);

    for (var location in window.i18nMessages) {
        // skip loop if the property is from prototype
        if (!window.i18nMessages.hasOwnProperty(location)) continue;
        addLocaleData(window.i18nMessages[location]);
    }

    callback(locale);
}

export const i18nIntegration = (callback) => {
    let scripts = [];
// scripts.push(`https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/${locale}.js`);
// scripts.push(`/public/messages.json`);
    let locale = qs.parse(location.search && location.search.slice(1)).locale || 'en-US';
// const localePrefix = locale.slice(0, locale.indexOf('-'));


    scripts.push("/messages.js");

    if (scripts.length) {
        scriptjs(scripts, function () {
            SupportI18N(callback, locale);
        });
    } else {
        SupportI18N(callback, locale);
    }
}

export const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

export const capitalizeString = (message) => {
    if (!message || message.length <= 0) {
        return message;
    }
    let result = message[0].toUpperCase();
    for (let i = 1; i < message.length; i++) {
        if (message[i - 1] === ' ' && message[i] !== ' ') {
            result += message[i].toUpperCase();
            continue;
        }
        if (message[i - 1] !== ' ' && message[i] !== ' ') {
            result += message[i].toLowerCase();
            continue;
        }
        if (message[i - 1] !== ' ' && message[i] === ' ') {
            result += message[i];
        }
    }
    return result;
}


/**
 * How to use:
 * FIRST WAY:
 *  - import I18nUtils from"utils/I18nUtils";
 *  - I18nUtils.injectIntl(Component)
 *  - let {intl} =this.props;
 *  - {I18nUtils.formatMessage(intl, "messages", I18nUtils.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD)}
 * SECOND WAY:
 *  - import {injectI18N, t, t1, t2, t3, t4} from "utils/I18nUtils";
 *  - injectI18N(Component);
 *  - let {intl} =this.props;
 *  - {t1(intl, "messages")}
 */
class I18nUtils {
    MESSAGES_NORMAL = 0;
    MESSAGES_UPPERCASE = 1;
    MESSAGES_LOWERCASE = 2;
    MESSAGES_UPPERCASE_FIRST_CHAR = 3;
    MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD = 4;

    injectIntl(T) {
        let a = injectIntl(T);
        return a;
    }

    formatMessage(intl, id, type, properties) {
        if (!id) {
            throw new Error("key of message not found");
        }
        if (!type) {
            type = this.MESSAGES_NORMAL;
        }
        let message = id;
        // let message = intl.formatMessage({...properties, id: id});
        if (message && !message.hasOwnProperty(id)) {
            this.processMissingKey(intl.locale, id);
            message = message.replace(/_/g, " ");
        }
        switch (type) {
            case this.MESSAGES_NORMAL:
                break;
            case this.MESSAGES_LOWERCASE:
                message = message.toLowerCase();
                break;
            case this.MESSAGES_UPPERCASE:
                message = message.toUpperCase();
                break;
            case this.MESSAGES_UPPERCASE_FIRST_CHAR:
                message = capitalize(message);
                break;
            case this.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD:
                message = capitalizeString(message);
                break;
            default:
                break;
        }

        return message;
    }

    processMissingKey(locale, messagesId) {
        if (config.autoDetectMissingMessage) {
            // send ajax locale, messagesId
        }
    }
}

const i18nUtils = new I18nUtils();

export const t = (intl, id, type, properties) => i18nUtils.formatMessage(intl, id, type, properties);

export const t1 = (intl, id, properties) => i18nUtils.formatMessage(intl, id, i18nUtils.MESSAGES_UPPERCASE_FIRST_CHAR, properties);

export const t2 = (intl, id, properties) => i18nUtils.formatMessage(intl, id, i18nUtils.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD, properties);

export const t3 = (intl, id, properties) => i18nUtils.formatMessage(intl, id, i18nUtils.MESSAGES_UPPERCASE, properties);

export const t4 = (intl, id, properties) => i18nUtils.formatMessage(intl, id, i18nUtils.MESSAGES_LOWERCASE, properties);

export const injectI18N = (T) => i18nUtils.injectIntl(T);

export default  i18nUtils;