import React from 'react';
import styled from 'styled-components';
import { Form, Input, Card, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import * as ROUTES from '@constants/routes';
import Layout from '@components/Layout';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import { doPasswordReset } from '@services/firebase/auth';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 400px;
`;

const PasswordForgotForm = ({ form }: FormComponentProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields((error, values) => {
      if (error) return;

      message.loading({
        content: 'Loading ...',
        key: ROUTES.PASSWORD_FORGOT,
      });

      doPasswordReset(values.email)
        .then(result => {
          message.success({
            content: 'Success!',
            key: ROUTES.PASSWORD_FORGOT,
            duration: 2,
          });

          form.resetFields();
        })
        .catch(error =>
          message.error({
            content: error.message,
            key: ROUTES.PASSWORD_FORGOT,
            duration: 2,
          })
        );
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
        })(<Input />)}
      </FormItem>

      <FormItem wrapperCol={{ sm: 24 }}>
        <FormStretchedButton type="primary" htmlType="submit">
          Reset Password
        </FormStretchedButton>
      </FormItem>
    </Form>
  );
};

const PasswordForgotFormEnhanced = Form.create({
  name: 'password-forgot',
})(PasswordForgotForm);

const PasswordForgotPage = () => (
  <Layout>
    <Container>
      <StyledCard title="Reset your password">
        <PasswordForgotFormEnhanced />
      </StyledCard>
    </Container>
  </Layout>
);

export default PasswordForgotPage;
