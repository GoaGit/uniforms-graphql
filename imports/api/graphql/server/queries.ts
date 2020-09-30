import { querySchemas as EmailEditor } from './email-editor'
/**
 * Load all query schemas
 */
export default `
  type Query {
    ${EmailEditor}
  }
`;
