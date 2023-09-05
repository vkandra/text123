import { LogLevel } from '@azure/msal-browser';

const isLocal = window.location.hostname === 'localhost';
export const msalConfig = {
  auth: {
    clientId: '2c46bdb2-5fb1-4971-a02f-090b52b1cc64',
    authority:
      'https://login.microsoftonline.com/2d6b0cf3-57fa-4619-abf9-d13e1ef2352a',
    redirectUri: isLocal
      ? 'http://localhost:3000/'
      : 'https://red-smoke-03fa29200.3.azurestaticapps.net/',
    // : 'https://proud-bush-0d4184d00.2.azurestaticapps.net/',

    // redirectUri: ,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ['User.Read'],
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
