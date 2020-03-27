import React from 'react';
import styled from 'styled-components';

import { User } from '@generated/client';

const UnstyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

interface GetStartedProps {
  me: User;
  isPartner: boolean;
}

const GetStarted = ({ me, isPartner }: GetStartedProps) => {
  const generalPartnerLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}?partnerId=${me.uid}`
      : '';

  return (
    <UnstyledList>
      <li>
        <strong>Am I a partner?</strong>
        <p>
          {isPartner
            ? 'Yes. You can get started here.'
            : 'Not yet, please check the FAQ if you want to apply.'}
        </p>
      </li>

      {isPartner && (
        <>
          <li>
            <strong>What's my partner ID?</strong>
            <p>{me.uid}</p>
          </li>

          <li>
            <strong>
              How do I refer to this website as a partner?
            </strong>
            <p>
              If you want to refer to this website, use{' '}
              <em>{generalPartnerLink}</em> as referral link. It's
              important that your partner ID is set as{' '}
              <em>partnerId</em> query parameter in the URL.
            </p>
          </li>

          <li>
            <strong>How does it work?</strong>
            <p>
              Every time a user visits this website via your referral
              link and happens to buy something, it will be recorded
              as a referral payment on your Dashboard. If the user
              allows the usage of the browser's storage, the first
              referral link will work with more than one browser
              session.
            </p>
          </li>
          <li>
            <strong>
              How can I verify that my referral link works?
            </strong>
            <p>
              Check your Dashboard for the <em>Times Visited</em>{' '}
              property.
            </p>
          </li>
          <li>
            <strong>When can I expect my payment?</strong>
            <p>The payment will happen at the end of every month.</p>
          </li>
        </>
      )}
    </UnstyledList>
  );
};

export default GetStarted;
