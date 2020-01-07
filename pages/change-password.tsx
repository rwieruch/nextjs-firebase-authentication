import React from 'react';
import styled from 'styled-components';
import { Form, Input, Card } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import Layout from '@components/Layout';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import withAuthorization from '@components/Session/withAuthorization';

import { Session } from '@typeDefs/session';

const PasswordChangePageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
`;

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
    if (value && value !== form.getFieldValue('password')) {
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
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        console.log('Received values of form: ', values);
      }
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
      <FormItem label="Password" hasFeedback>
        {form.getFieldDecorator('password', {
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
        })(<Input.Password />)}
      </FormItem>

      <FormItem label="Confirm Password" hasFeedback>
        {form.getFieldDecorator('confirm', {
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
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </FormItem>

      <FormItem wrapperCol={{ sm: 24 }}>
        <FormStretchedButton type="primary" htmlType="submit">
          Change Password
        </FormStretchedButton>
      </FormItem>
    </Form>
  );
};

const PasswordChangeFormEnhanced = Form.create({
  name: 'password-change',
})(PasswordChangeForm);

const PasswordChangePage = () => (
  <Layout>
    <PasswordChangePageLayout>
      <StyledCard title="Change your password">
        <PasswordChangeFormEnhanced />
      </StyledCard>
    </PasswordChangePageLayout>
  </Layout>
);

const condition = (session: Session): boolean => !!session.authUser;

export default withAuthorization(condition)(PasswordChangePage);
