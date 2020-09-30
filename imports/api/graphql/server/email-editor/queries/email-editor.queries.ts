import {Dependencies} from '../../lib/dependencies';

export const schema = `
  getEmailTemplate(emailTemplate: EmailTemplateType!): EmailTemplate!
`;

export default (dependencies: Dependencies) => ({
    Query: {
        /**
         * Query to get the username of the authenticated user.
         */
        getEmailTemplate: (parent: any, data: object, context: any) => {
            return dependencies.emailEditorService.getEmailTemplate(data.emailTemplate, context);
        },
    },
});
