import axios from 'axios';

import { inviteToSlack } from '.';

jest.mock('axios');

describe('inviteToSlack', () => {
  beforeEach(() => {
    process.env.SLACK_TOKEN = 'token';
  });

  afterEach(() => {
    delete process.env.SLACK_TOKEN;
  });

  it('signs up for the slack community', async () => {
    const get = jest.spyOn(axios, 'get');
    get.mockImplementationOnce(() => Promise.resolve(true));

    await expect(
      inviteToSlack('example@example.com')
    ).resolves.toEqual(true);

    expect(axios.get).toHaveBeenCalledWith(
      'https://slack.com/api/users.admin.invite?email=example@example.com&token=token&set_active=true'
    );
  });

  it('does not sign up for the slack community, if no token', async () => {
    delete process.env.SLACK_TOKEN;

    const get = jest.spyOn(axios, 'get');
    get.mockImplementationOnce(() => Promise.resolve(true));

    await inviteToSlack('example@example.com');

    expect(axios.get).toHaveBeenCalledTimes(0);
  });
});
