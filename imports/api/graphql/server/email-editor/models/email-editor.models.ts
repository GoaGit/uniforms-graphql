export const emailEditorSchema = `
  enum EmailType {
    EMAIL_1
    EMAIL_2
    EMAIL_3
  }

  type EmailTemplate {
    _id: EmailType
    createdAt: DateTime
    updatedAt: DateTime
    content: JSON
  }

  input EmailTemplateInput {
    _id: EmailType
    content: JSON
  }

  input EmailTemplateType {
    _id: EmailType
  }
`;
