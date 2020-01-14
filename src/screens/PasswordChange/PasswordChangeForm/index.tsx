import React from 'react';
import { Form, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import * as ROUTES from '@constants/routes';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import { doPasswordUpdate } from '@services/firebase/auth';

const PasswordChangeForm = ({ form }: FormComponentProps) => {
  const [
    confirmPasswordDirty,
    setConfirmPasswordDirty,
  ] = React.useState(false);

  const handleConfirmBlur = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordDirty(
      confirmPasswordDirty || !!event.target.value
    );
  };

  const compareToFirstPassword = (
    _: any,
    value: any,
    callback: any
  ) => {
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Your passwords are different.');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (
    _: any,
    value: any,
    callback: any
  ) => {
    if (value && confirmPasswordDirty) {
      form.validateFields(['confirmNewPassword'], { force: true });
    }
    callback();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields((error, values) => {
      if (error) return;

      message.loading({
        content: 'Loading ...',
        key: ROUTES.PASSWORD_CHANGE,
      });

      doPasswordUpdate(values.newPassword)
        .then(result => {
          message.success({
            content: 'Success!',
            key: ROUTES.PASSWORD_CHANGE,
            duration: 2,
          });

          form.resetFields();
        })
        .catch(error =>
          message.error({
            content: error.message,
            key: ROUTES.PASSWORD_CHANGE,
            duration: 2,
          })
        );
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
      <FormItem label="Old Password" hasFeedback>
        {form.getFieldDecorator('oldPassword', {
          rules: [
            {
              required: true,
              message: 'Please input your Password!',
            },
            {
              min: 6,
              message: 'Your password is too short.',
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(
          <Input.Password aria-label="password-change-password-old" />
        )}
      </FormItem>

      <FormItem label="New Password" hasFeedback>
        {form.getFieldDecorator('newPassword', {
          rules: [
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 6,
              message: 'Your password is too short.',
            },
            {
              validator: validateToNextPassword,
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(
          <Input.Password aria-label="password-change-password-new" />
        )}
      </FormItem>

      <FormItem label="Confirm Password" hasFeedback>
        {form.getFieldDecorator('confirmNewPassword', {
          rules: [
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              min: 6,
              message: 'Your password is too short.',
            },
            {
              validator: compareToFirstPassword,
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(
          <Input.Password
            onBlur={handleConfirmBlur}
            aria-label="password-change-password-confirm"
          />
        )}
      </FormItem>

      <FormItem wrapperCol={{ sm: 24 }}>
        <FormStretchedButton
          type="primary"
          htmlType="submit"
          aria-label="password-change-submit"
        >
          Change Password
        </FormStretchedButton>
      </FormItem>
    </Form>
  );
};

export default Form.create({
  name: 'password-change',
})(PasswordChangeForm);
