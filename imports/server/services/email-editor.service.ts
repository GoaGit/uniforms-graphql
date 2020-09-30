import { EmailTemplatesCollection } from '../../db/email-templates';

export class EmailEditorService {
  public getEmailTemplate = async (emailTemplate, context) => {
    console.log(emailTemplate);
    if (true) {
      const result = EmailTemplatesCollection
        .findOne({ _id: emailTemplate._id });
      return result;
    }
  }

  public updateEmailTemplate = async (emailTemplate, context) => {
    if (true) {
      return EmailTemplatesCollection.update({ _id: emailTemplate._id }, { $set: { content: emailTemplate.content } });
    }
  }
};
