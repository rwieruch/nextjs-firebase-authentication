import axios from 'axios';

import { inviteToRevue } from '.';

jest.mock('axios');

describe('inviteToRevue', () => {
  beforeEach(() => {
    process.env.REVUE_TOKEN = 'token';
  });

  afterEach(() => {
    delete process.env.REVUE_TOKEN;
  });

  it('signs up for the newsletter', async () => {
    const post = jest.spyOn(axios, 'post');
    post.mockImplementationOnce(() => Promise.resolve(true));

    await expect(
      inviteToRevue('example@example.com', 'Example User')
    ).resolves.toEqual(true);

    expect(axios.post).toHaveBeenCalledWith(
      'https://www.getrevue.co/api/v2/subscribers',
      {
        double_opt_in: false,
        email: 'example@example.com',
        first_name: 'Example User',
      },
      { headers: { Authorization: 'Token token="token"' } }
    );
  });

  it('does not sign up for the newsletter, if no token', async () => {
    delete process.env.REVUE_TOKEN;

    const post = jest.spyOn(axios, 'post');
    post.mockImplementationOnce(() => Promise.resolve(true));

    await inviteToRevue('example@example.com', 'Example User');

    expect(axios.post).toHaveBeenCalledTimes(0);
  });
});
