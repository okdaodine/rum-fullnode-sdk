const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');

const client = RumFullNodeClient({ baseURL });

describe('Node', () => {
  it('get node', async () => {
    const node = await client.Node.get();
    assert.hasAllKeys(node, [
      'node_id',
      'node_publickey',
      'node_status',
      'node_type',
      'node_version',
      'peers',
    ]);
  });
});