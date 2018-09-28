"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by sajjad on 3/14/18.
 */
require("@babel/polyfill");
var react_dom_1 = require("react-dom");
var App_1 = require("./components/App");
function renderApp(_a) {
    var App = _a.App;
    react_dom_1.hydrate(/>,, document.getElementById('root'));
}
window.onload = function () {
    renderApp({ App: App_1.default });
};
if (module.hot) {
    module.hot.accept(['./components/App'], function () {
        var NewApp = require('./components/App').default;
        renderApp({
            App: NewApp
        });
    });
}
