import React from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { useApolloClient } from '@apollo/react-hooks';
import { useEmailChangeMutation } from '@generated/client';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import useIndicators from '@hooks/useIndicators';
import signOut from '@components/Navigation/signOut';

interface EmailChangeFormProps extends FormComponentProps {}

const EmailChangeForm = ({ form }: EmailChangeFormProps) => {
  const apolloClient = useApolloClient();
  const [emailChange, { loading, error }] = useEmailChangeMutation();

  const { successMessage } = useIndicators({
    key: 'email-change',
    error,
  });

  const [confirmEmailDirty, setConfirmEmailDirty] = React.useState(
    false
  );

  const handleConfirmBlur = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmEmailDirty(confirmEmailDirty || !!event.target.value);
  };

  const compareToFirstEmail = (_: any, value: any, callback: any) => {
    if (value && value !== form.getFieldValue('newEmail')) {
      callback('Your emails are different.');
    } else {
      callback();
    }
  };

  const validateToNextEmail = (_: any, value: any, callback: any) => {
    if (value && confirmEmailDirty) {
      form.validateFields(['confirmNewEmail'], { force: true });
    }
    callback();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields(async (error, values) => {
      if (error) return;

      try {
        await emailChange({
          variables: {
            email: values.newEmail,
          },
        });

        form.resetFields();

        successMessage();

        signOut(undefined, undefined, apolloClient);
      } catch (error) {}
    });

    event.preventDefault();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <FormItem label="New Email" hasFeedback>
        {form.getFieldDecorator('newEmail', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid email!',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              validator: validateToNextEmail,
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(<Input aria-label="email-change-email-new" />)}
      </FormItem>

      <FormItem label="Confirm Email" hasFeedback>
        {form.getFieldDecorator('confirmNewEmail', {
          rules: [
            {
              required: true,
              message: 'Please confirm your email!',
            },
            {
              validator: compareToFirstEmail,
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(
          <Input
            onBlur={handleConfirmBlur}
            aria-label="email-change-email-confirm"
          />
        )}
      </FormItem>

      <FormItem wrapperCol={{ sm: 24 }}>
        <FormStretchedButton
          loading={loading}
          type="primary"
          htmlType="submit"
          aria-label="email-change-submit"
        >
          Change Email
        </FormStretchedButton>
      </FormItem>
    </Form>
  );
};

export default Form.create<EmailChangeFormProps>({
  name: 'email-change',
})(EmailChangeForm);
