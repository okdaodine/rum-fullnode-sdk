const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');

const client = RumFullNodeClient({ baseURL });

describe('Network', () => {
  it('get network', async () => {
    const network = await client.Network.get();
    assert.hasAllKeys(network, [
      'peer_id',
      'eth_addr',
      'nat_type',
      'nat_enabled',
      'addrs',
      'groups',
      'node',
    ]);
  });
});