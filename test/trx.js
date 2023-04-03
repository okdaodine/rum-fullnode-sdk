const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');
const sleep = require('./utils/sleep');

const client = RumFullNodeClient({ baseURL });

describe('Trx', () => {
  let groupId = '';
  let trxId = '';
  
  before(async () => {
    const { group_id } = await client.Group.create({
      group_name: 'testing group',
      consensus_type: 'poa',
      encryption_type: 'public',
      app_key: 'testing',
    });
    groupId = group_id;
    const { trx_id } = await client.Content.create(groupId, {});
    trxId = trx_id;
  });

  it('get trx', async () => {
    await sleep(5000);
    const trx = await client.Trx.get(groupId, trxId);
    assert.hasAllKeys(trx, [
      'TrxId',
      'GroupId',
      'SenderPubkey',
      'Data',
      'TimeStamp',
      'Version',
      'SenderSign',
    ]);
  });

  after(async () => {
    await client.Group.leave(groupId);
    await client.Group.clear(groupId);
  });
});