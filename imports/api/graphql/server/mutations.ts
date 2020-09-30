import { mutationSchemas as EmailEditor } from './email-editor';
/**
 * Load all mutation schemas
 */
export default `
  type Mutation {
    ${EmailEditor}
  }
`;
