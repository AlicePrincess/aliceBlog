/*
 * Providers provided by Angular
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
/*
 * Platform and Environment
 * our providers/directives/pipes
 */
import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS, decorateComponentRef } from './platform/environment';
import { APP_ROUTER_DIRECTIVES } from './app/app.router';

/*
 * App Component
 * our top level component that holds all of our components
 */
import { App, APP_PROVIDERS } from './app';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?:any):Promise<any> {

    return bootstrap(App, [
        ...PROVIDERS,
        ...ENV_PROVIDERS,
        ...DIRECTIVES,
        ...PIPES,
        ...APP_ROUTER_DIRECTIVES,
        ...APP_PROVIDERS,
        ...ROUTER_DIRECTIVES,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ])
        .then(decorateComponentRef)
        .catch(err => console.error(err));

}


/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
    // activate hot module reload
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
} else {
    // bootstrap when documetn is ready
    document.addEventListener('DOMContentLoaded', () => main());
}
