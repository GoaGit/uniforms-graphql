import { EmailTemplatesCollection } from '../../db/email-templates';
import { Meteor } from 'meteor/meteor';

const DEFAULT_CONTENT = {};
const EMAIL_TEMPLATES = [
  'APPOINTMENT_CONFIRMATION_TEMPLATE',
  'TOKEN_REQUEST_TEMPLATE',
  'QR_CODE_REQUEST_TEMPLATE',
];

Meteor.startup(async () => {
  // Initialize email templates from a set of templates
  // emails contains a list of email template names that are currently stored in the database
  // the _id field of a document contains the email type
  const emails = await EmailTemplatesCollection
    .find()
    .fetch()
    .map(({_id}) => _id);

  EMAIL_TEMPLATES.forEach(email => {
    if (emails.indexOf(email) === -1) {
      EmailTemplatesCollection.insert({
        _id: email,
        createdAt: new Date(),
        content: <JSON>DEFAULT_CONTENT,
      });
    }
  });
});
