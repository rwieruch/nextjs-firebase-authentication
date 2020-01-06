import React from 'react';
import styled from 'styled-components';
import { Form, Input, Card } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import Layout from '@components/Layout';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';

const PasswordForgotPageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 600px;
`;

const PasswordForgotForm = ({ form }: FormComponentProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields((error, values) => {
      if (!error) {
        console.log('Received values of form: ', values);
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
    <PasswordForgotPageLayout>
      <StyledCard title="Reset your password">
        <PasswordForgotFormEnhanced />
      </StyledCard>
    </PasswordForgotPageLayout>
  </Layout>
);

export default PasswordForgotPage;
