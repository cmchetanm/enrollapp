/* eslint-env node */

/*
 * This file is automatically compiled by Webpack, along with any other files
 * present in this directory. You're encouraged to place your actual application logic in
 * a relevant structure within app/javascript and only use these pack files to reference
 * that code so it'll be compiled.
 */

/* global Turbolinks:true */
require('@rails/ujs').start();
require('turbolinks').start();// Support component names relative to this directory:
const componentRequireContext = require.context('components', true);
const ReactRailsUJS = require('react_ujs');
ReactRailsUJS.useContext(componentRequireContext);

document.addEventListener('ajax:complete', event => {
    let referrer, snapshot;
    const xhr = event.detail[0];

    if ((xhr.getResponseHeader('Content-Type') || '').substring(0, 9) === 'text/html') {
        referrer = window.location.href;
        snapshot = Turbolinks.Snapshot.wrap(xhr.response);
        Turbolinks.controller.cache.put(referrer, snapshot);
        return Turbolinks.visit(referrer, {
            action: 'restore'
        });
    }

    return true;
}, false);