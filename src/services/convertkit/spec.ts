import axios from 'axios';

import { inviteToConvertkit } from '.';

jest.mock('axios');

describe('inviteToConvertkit', () => {
  beforeEach(() => {
    process.env.CONVERTKIT_API_KEY = 'apikey';
    process.env.CONVERTKIT_FORM_ID = 'myformid';
  });

  afterEach(() => {
    delete process.env.CONVERTKIT_API_KEY;
    delete process.env.CONVERTKIT_FORM_ID;
  });

  it('signs up for the conversion', async () => {
    const post = jest.spyOn(axios, 'post');
    post.mockImplementationOnce(() => Promise.resolve(true));

    await expect(
      inviteToConvertkit('example@example.com', 'Example')
    ).resolves.toEqual(true);

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.convertkit.com/v3/forms/#myformid/subscribe',
      {
        api_key: 'apikey',
        email: 'example@example.com',
        first_name: 'Example',
      }
    );
  });

  it('does not sign up for the conversion, if no api key', async () => {
    delete process.env.CONVERTKIT_API_KEY;

    const post = jest.spyOn(axios, 'post');
    post.mockImplementationOnce(() => Promise.resolve(true));

    await inviteToConvertkit('example@example.com', 'Example');

    expect(axios.post).toHaveBeenCalledTimes(0);
  });

  it('does not sign up for the conversion, if no form id', async () => {
    delete process.env.CONVERTKIT_FORM_ID;

    const post = jest.spyOn(axios, 'post');
    post.mockImplementationOnce(() => Promise.resolve(true));

    await inviteToConvertkit('example@example.com', 'Example');

    expect(axios.post).toHaveBeenCalledTimes(0);
  });
});
