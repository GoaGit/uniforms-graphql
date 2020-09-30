import { AutoForm, SubmitField } from 'uniforms-antd';
import {
  CalendarOutlined,
  ContactsOutlined,
  FullscreenOutlined,
  QrcodeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import React, { useReducer, useRef } from 'react';
import { buildASTSchema, parse } from 'graphql';
import { useApolloClient, useMutation } from '@apollo/client';

import Button from 'antd/lib/button';
//@ts-ignore
import CP_EMAIL_TEMPLATE from './temporary-folder/CP_email_template';
import Col from 'antd/lib/col';
import EmailEditor from 'react-email-editor';
import { GET_EMAIL_TEMPLATE } from '../../../api/graphql/client/queries/email-editor.queries';
import { GraphQLBridge } from 'uniforms-bridge-graphql';
import NL_TRANSLATIONS from './translations/nl';
import Row from 'antd/lib/row';
import Space from 'antd/lib/space';
import { Styles } from '../../lib/styling/style';
import { UPDATE_EMAIL_TEMPLATE } from '../../../api/graphql/client/mutations/email-editor.mutations';
import { connectField } from 'uniforms';

const EMAIL_TEMPLATES = [
  'EMAIL_1',
  'EMAIL_2',
  'EMAIL_3'
];

const OPTIONS = {};

const style: Styles = {
  pageTitle: {
    fontSize: '30px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
    color: 'black',
  },
};

const schema = `
  type EmailTemplateForm {
    _id:     String!
    content: String!
  }

  # This is required by buildASTSchema
  type Query { anything: ID }
`;

const schemaType = buildASTSchema(parse(schema)).getType("EmailTemplateForm");
const schemaData = {
  _id: {
    allowedValues: EMAIL_TEMPLATES,
  },
  content: {},
};

const schemaValidator = (model) => {
  const details = [];

  if (!model._id) {
    details.push({ name: 'id', message: 'ID is required!' });
  }

  if (details.length) {
    throw { details };
  }
};

const EmailTemplatesSchema = new GraphQLBridge(
  schemaType,
  schemaValidator,
  schemaData
);

const EmailComponent = (props) => {
  const onLoad = () => {
    if (props.emailEditorRef?.current) {
      props.emailEditorRef?.current.editor.loadDesign(CP_EMAIL_TEMPLATE);
    }
  };

  return (
    <EmailEditor
      ref={props.emailEditorRef}
      minHeight={'95vh'}
      onLoad={onLoad}
      options={OPTIONS}
    />
  );
};

const EmailEditorComponent = connectField(EmailComponent);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEMPLATE': {
      return { ...state, emailTemplate: action.value };
    }
    case 'SAVE_TEMPLATE': {
      return { ...state, loading: action.value };
    }
    default:
      return state;
  }
};

const initialState = {
  _id: null,
  emailTemplate: {
    _id: null,
    content: {},
  },
  loading: false,
};

const EmailTemplates = () => {
  const emailEditorRef = useRef(null);
  const client = useApolloClient();
  const handle = useFullScreenHandle();
  let formRef;
  const [state, dispatch] = useReducer(reducer, initialState);

  const [
    updateEmailTemplate,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_EMAIL_TEMPLATE, {
    onCompleted() {
      dispatch({ type: 'SAVE_TEMPLATE', value: false });
    },
    onError(e) {
      console.log(e);
      dispatch({ type: 'SAVE_TEMPLATE', value: false });
    },
  });

  const handleQuery = ({ _id }) => async () => {
    const result = await client.query({
      query: GET_EMAIL_TEMPLATE,
      variables: {
        emailTemplate: {
          _id,
        },
      },
    });

    if (result.data.getEmailTemplate?.content) {
      dispatch({ type: 'SET_TEMPLATE', value: result.data.getEmailTemplate });
    }
  };

  const handleUpdate = async () => {
    dispatch({ type: 'SAVE_TEMPLATE', value: true });
    emailEditorRef.current.editor.exportHtml(({ design }) => {
      return updateEmailTemplate({
        variables: {
          emailTemplate: { _id: state.emailTemplate._id, content: design },
        },
      });
    });
  };

  const modelTransform = (mode, model) => {
    const asyncFn = async (callback) => {
      return await emailEditorRef.current.editor.exportHtml(callback);
    };
    if (mode === 'form') {
    }
    if (mode === 'validate') {
    }
    if (mode === 'submit') {
    }
    return model;
  };

  return (
    <>
      <AutoForm
        schema={EmailTemplatesSchema}
        model={state.emailTemplate}
        onSubmit={handleUpdate}
        showInlineError
        ref={(ref) => (formRef = ref)}
        modelTransform={modelTransform}
      >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col>
          <Space>
            <Button
              onClick={handleQuery({ _id: 'EMAIL_1' })}
              type="primary"
              disabled={state.loading}
              icon={<QrcodeOutlined />}
            >
              EMAIL_1
            </Button>
          </Space>
        </Col>
        <Col>
          <Button
            disabled={state.loading}
            type="primary"
            onClick={handleUpdate}
            icon={<SaveOutlined />}
          >
            SAVE
          </Button>
        </Col>
      </Row>
      <div style={{ marginTop: '50px' }}>
        <FullScreen handle={handle}>
          <Button
            disabled={state.loading}
            type="link"
            onClick={handle.enter}
            icon={<FullscreenOutlined />}
          >
            Fullscreen
          </Button>
          <EmailEditorComponent
            name="content"
            emailEditorRef={emailEditorRef}
          />
        </FullScreen>
      </div>
      </AutoForm>
    </>
  );
};

export default EmailTemplates;
