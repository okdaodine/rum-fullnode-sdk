const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');
const moment = require('moment');

const client = RumFullNodeClient({ baseURL });

describe('Token', () => {
  let createdToken = null;
  let refreshedToken = null;
  
  it('create token', async () => {
    const res = await client.Token.create({
      expires_at: moment().add(10, 'year').toISOString(),
      name: 'testing-token',
      role: 'chain'
    });
    createdToken = res.token;
    assert.exists(createdToken);
  });

  it('list token', async () => {
    const res = await client.Token.list();
    assert.hasAllKeys(res, ['key', 'chain', 'node']);
    assert.exists((res.chain.normal || []).find(item => createdToken === item.token));
  });

  it('refresh token', async () => {
    const res = await client.Token.refresh(createdToken);
    refreshedToken = res.token;
    assert.exists(refreshedToken);
  });

  it('revoke token', async () => {
    const res = await client.Token.revoke({
      token: createdToken,
      role: 'chain'
    });
    assert.hasAllKeys(res, ['success']);
  });

  it('remove token', async () => {
    await client.Token.remove({
      token: createdToken,
      role: 'chain'
    });
    await client.Token.remove({
      token: refreshedToken,
      role: 'chain'
    });
  });
});
