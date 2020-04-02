import React from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { User, useCommunityJoinMutation } from '@generated/client';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import useIndicators from '@hooks/useIndicators';

interface CommunityJoinFormProps extends FormComponentProps {
  me: User;
}

const CommunityJoinForm = ({ form, me }: CommunityJoinFormProps) => {
  React.useEffect(() => {
    form.setFields({ email: { value: me.email } });
  }, []);

  const [
    communityJoin,
    { loading, error },
  ] = useCommunityJoinMutation();

  const { successMessage } = useIndicators({
    key: 'community-join',
    error,
    success: { message: 'Success! Check your email inbox.' },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields(async (error, values) => {
      if (error) return;

      try {
        await communityJoin({
          variables: {
            email: values.email,
          },
        });

        form.resetFields();

        successMessage();
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
      <FormItem label="Email" hasFeedback>
        {form.getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid email!',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(<Input aria-label="community-join-email" />)}
      </FormItem>

      <FormItem wrapperCol={{ sm: 24 }}>
        <FormStretchedButton
          loading={loading}
          type="primary"
          htmlType="submit"
          aria-label="community-join-submit"
        >
          Join Community
        </FormStretchedButton>
      </FormItem>
    </Form>
  );
};

export default Form.create<CommunityJoinFormProps>({
  name: 'community-join',
})(CommunityJoinForm);
