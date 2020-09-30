import {gql} from '@apollo/client';

export const UPDATE_EMAIL_TEMPLATE = gql`
  mutation UpdateEmailTemplate($emailTemplate: EmailTemplateInput!) {
    updateEmailTemplate(emailTemplate: $emailTemplate) {
      _id
      content
    }
  }
`;
