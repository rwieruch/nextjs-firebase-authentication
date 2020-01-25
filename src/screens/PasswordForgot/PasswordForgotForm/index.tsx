import React from 'react';
import { Form, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useApolloClient } from '@apollo/react-hooks';

import * as ROUTES from '@constants/routes';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';

import passwordForgot from './passwordForgot';

interface PasswordForgotFormProps extends FormComponentProps {
  onLoadingMessage: () => void;
  onSuccessMessage: () => void;
  onErrorMessage: (error: Error) => void;
}

const PasswordForgotForm = ({
  form,
  onLoadingMessage,
  onSuccessMessage,
  onErrorMessage,
}: PasswordForgotFormProps) => {
  const apolloClient = useApolloClient();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields(async (error, values) => {
      if (error) return;

      onLoadingMessage();

      try {
        await passwordForgot(apolloClient, values.email);

        onSuccessMessage();

        form.resetFields();
      } catch (error) {
        onErrorMessage(error);
      }
    });

    event.preventDefault();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <FormItem label="E-mail">
        {form.getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(<Input aria-label="password-forgot-email" />)}
      </FormItem>

      <FormItem wrapperCol={{ sm: 24 }}>
        <FormStretchedButton
          type="primary"
          htmlType="submit"
          aria-label="password-forgot-submit"
        >
          Reset Password
        </FormStretchedButton>
      </FormItem>
    </Form>
  );
};

export default Form.create<PasswordForgotFormProps>({
  name: 'password-forgot',
})(PasswordForgotForm);
