import { Mongo } from 'meteor/mongo';

/**
 * datamodel of the refreshtoken
 */
export interface EmailTemplate {
    _id: string;
    createdAt: Date;
    updatedAt?: Date;
    content: JSON;
}

export const EmailTemplatesCollection = new Mongo.Collection<EmailTemplate>('email-templates');
