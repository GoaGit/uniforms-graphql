import { Dependencies } from '../../lib/dependencies';

export const schema = `
    updateEmailTemplate(emailTemplate: EmailTemplateInput!): EmailTemplate!
`;

export default (dependencies: Dependencies) => ({
    Mutation: {
        /**
         * mutation update an email template
         */
        updateEmailTemplate: async (parent: any, { emailTemplate }, context) => {
            return dependencies.emailEditorService.updateEmailTemplate(emailTemplate, context);
        },
    },
});
