import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const connectionString = process.env.REACT_APP_APPINSIGHTS_CONNECTION_STRING;

const appInsights = new ApplicationInsights({
  config: {
    connectionString: connectionString
  }
});

appInsights.loadAppInsights();

export default appInsights;