import emailEditorMutationResolvers, { schema as EmailEditorMutation } from './mutations/email-editor.mutations';
import emailEditorQueryResolvers, { schema as EmailEditorQuery } from './queries/email-editor.queries';

import { Dependencies } from "../lib/dependencies";
import { emailEditorResolvers } from './resolvers/email-editor.resolvers';
import { emailEditorSchema } from './models/email-editor.models';
import merge from "lodash/merge";

export const typeSchemas = `
  ${emailEditorSchema}
`;

export const querySchemas = `
  ${EmailEditorQuery}
`;

export const mutationSchemas = `
  ${EmailEditorMutation}
`;

export const createEmailEditorResolvers = (adapters: Dependencies) => merge(
  emailEditorResolvers(adapters),
  emailEditorQueryResolvers(adapters),
  emailEditorMutationResolvers(adapters),
);
