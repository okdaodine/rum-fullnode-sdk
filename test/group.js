const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL, baseURL2 } = require('./utils/env');

const client = RumFullNodeClient({ baseURL });
const client2 = RumFullNodeClient({ baseURL: baseURL2 });

describe('CURD Group', () => {
  let groupId = '';

  it('create group', async () => {
    const res = await client.Group.create({
      group_name: 'testing group',
      consensus_type: 'poa',
      encryption_type: 'public',
      app_key: 'testing',
    });
    assert.hasAllKeys(res, ['seed', 'group_id']);
    groupId = res.group_id;
    seed = res.seed;
  });

  it('get seed', async () => {
    const { seed } = await client.Group.getSeed(groupId);
    assert.exists(seed)
  });

  it('list groups', async () => {
    const { groups } = await client.Group.list();
    const group = groups.find(group => group.group_id === groupId);
    assert.hasAllKeys(group, [
      'group_id',
      'group_name',
      'owner_pubkey',
      'user_pubkey',
      'user_eth_addr',
      'consensus_type',
      'encryption_type',
      'cipher_key',
      'app_key',
      'last_updated',
      'highest_height',
      'highest_block_id',
      'group_status',
      'snapshot_info',
    ]);
  });

  it('leave group', async () => {
    const res = await client.Group.leave(groupId);
    assert.exists(res.group_id)
  });
});

describe('Join and leave group', () => {
  let groupId = '';
  let seed = '';

  before(async () => {
    const res = await client.Group.create({
      group_name: 'testing group',
      consensus_type: 'poa',
      encryption_type: 'public',
      app_key: 'testing',
    });
    groupId = res.group_id;
    seed = res.seed;
  });

  it('join group', async () => {
    const res = await client2.Group.join(seed);
    assert.hasAllKeys(res, [
      'group_id',
      'group_name',
      'owner_pubkey',
      'user_pubkey',
      'user_encryptpubkey',
      'consensus_type',
      'encryption_type',
      'cipher_key',
      'app_key',
      'signature',
    ]);
  });

  it('leave group', async () => {
    await client.Group.leave(groupId);
    await client2.Group.leave(groupId);
  });
});
