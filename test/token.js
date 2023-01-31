const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');
const moment = require('moment');

const client = RumFullNodeClient({ baseURL });

describe('Token', () => {
  let token = '';
  
  it('create token', async () => {
    const res = await client.Token.create({
      expires_at: moment().add(10, 'year').toISOString(),
      name: 'testing-token',
      role: 'chain'
    });
    assert.hasAllKeys(res, ['token']);
    token = res.token;
  });

  it('refresh token', async () => {
    const res = await client.Token.refresh(token);
    assert.hasAllKeys(res, ['token']);
  });
});
