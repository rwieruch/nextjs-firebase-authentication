import React from 'react';
import styled from 'styled-components';

import { User } from '@generated/client';
import { PARTNER_PERCENTAGE } from '@constants/partner';

const UnstyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

interface FaqProps {
  me: User;
}

const Faq = ({ me }: FaqProps) => (
  <UnstyledList>
    <li>
      <strong>What's the partner program?</strong>
      <p>
        Partners of this website earn a commission whenever they send
        traffic to this website that results in a payment.
      </p>
    </li>
    <li>
      <strong>How much does a partner earn?</strong>
      <p>
        Partners earn {PARTNER_PERCENTAGE}% of the amount of each
        succesful payment.
      </p>
    </li>
    <li>
      <strong>Can everyone become a partner?</strong>
      <p>
        The seats for partners are limited. If you have an audience
        (e.g. social media) or platform (e.g. blog) for people
        interested in the topics taught on this website, you are
        welcome to apply for the partner program.
      </p>
    </li>
    <li>
      <strong>How do I apply as partner?</strong>
      <p>
        If the above applies to you, please{' '}
        <a href="mailto:hello@rwieruch.com">contact me</a> with your
        details which should include some words about yourself, your
        email <em>{me.email}</em>, estimated traffic, and one or more
        URL(s) to your website, blog, newsletter, social media or
        anything else related to it.
      </p>
    </li>
  </UnstyledList>
);

export default Faq;
