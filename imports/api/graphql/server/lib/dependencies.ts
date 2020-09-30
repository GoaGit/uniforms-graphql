import { EmailEditorService } from '../../../../server/services/email-editor.service';
import { MetadataService } from '../../../../server/services/metadata.service';

export interface Dependencies {
  metadataService: MetadataService;
  emailEditorService: EmailEditorService;
}
