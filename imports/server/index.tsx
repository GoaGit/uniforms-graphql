import '../api/graphql/server';
import './fixtures/email-templates';

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import helmet from 'helmet';

Meteor.startup(() => {
    // Check if all enviornment variables are set
    ['ROOT_URL', 'MONGO_URL', 'MONGO_OPLOG_URL', 'MAIL_URL'].forEach((variable) => {
        if (process.env[variable] === undefined || process.env[variable] === null) {
            console.warn(`Warning: ${variable} is not set`);
        }
    });
    console.log(process.env['MONGO_URL']);

  // Set default HTTP headers
  WebApp.connectHandlers.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ['\'self\'', 'editor.unlayer.com', '*.editor.unlayer.com'],
        scriptSrc: [
          '\'self\'',
          '\'unsafe-inline\'',
          'editor.unlayer.com',
          '*.editor.unlayer.com',
        ],
        connectSrc: ['*'],
        imgSrc: ['\'self\''],
        styleSrc: ['\'self\'', '\'unsafe-inline\''],
      },
    }),
  );
  WebApp.connectHandlers.use(helmet.frameguard());
});

