// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const HOSTNAME: string = "localhost";
const PORT_NUMBER: number = 4000;
const APPLICATION_NAME: string = '/Ekart';

export const environment = {
  production: false,
  
  updateCustomerAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customer-api',
  customerAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customer-api',
  customerCartUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customercart-api',
  customerProductAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/product-api',
  cardAPIUrl : 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/payment-api',
  orderAPIurl : 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/order-api'
};