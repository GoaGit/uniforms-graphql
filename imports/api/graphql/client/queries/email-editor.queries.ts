import {gql} from '@apollo/client';

export const GET_EMAIL_TEMPLATE = gql`
    query GetEmailTempate($emailTemplate: EmailTemplateType!) {
      getEmailTemplate(emailTemplate: $emailTemplate) {
        _id
        content
      }
    }
`;
