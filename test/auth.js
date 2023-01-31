const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');

const client = RumFullNodeClient({ baseURL });

describe('Auth', () => {
  let groupId = '';
  let userPubKey = '';

  before(async () => {
    const { group_id } = await client.Group.create({
      group_name: 'testing group',
      consensus_type: 'poa',
      encryption_type: 'public',
      app_key: 'testing',
    });
    groupId = group_id;
    const { groups } = await client.Group.list();
    const group = groups.find(group => group.group_id === groupId);
    userPubKey = group.owner_pubkey;
  });
  
  it('get auth rule', async () => {
    const authRule = await client.Auth.getAuthRule(groupId, 'POST');
    assert.hasAllKeys(authRule, ['TrxType', 'AuthType']);
  });

  it('set auth mode by updating chain config', async () => {
    const res = await client.Auth.updateChainConfig({
      group_id: groupId,
      type: 'set_trx_auth_mode',
      config: {
        trx_type: 'POST',
        trx_auth_mode: 'follow_alw_list',
        memo: ''
      }
    });
    assert.hasAllKeys(res, [
      'group_id',
      'owner_pubkey',
      'signature',
      'trx_id',
    ])
  });

  it('set alw_list by updating chain config', async () => {
    const res = await client.Auth.updateChainConfig({
      group_id: groupId,
      type: 'upd_alw_list',
      config: {
        action: 'add',
        pubkey: userPubKey,
        trx_type: ['post'],
        memo: ''
      }
    });
    assert.hasAllKeys(res, [
      'group_id',
      'owner_pubkey',
      'signature',
      'trx_id',
    ])
  });

  it('get allow list', async () => {
    await client.Auth.getAllowList(groupId);
  });

  it('get deny list', async () => {
    await client.Auth.getDenyList(groupId);
  });

  after(async () => {
    await client.Group.leave(groupId);
  });
});