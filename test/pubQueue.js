const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');
const sleep = require('./utils/sleep');

const client = RumFullNodeClient({ baseURL });

describe('PubQueue', () => {
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

  it('list pub queue', async () => {
    let data = [];
    while (data.length === 0) {
      const pubQueue = await client.PubQueue.list(groupId);
      assert(pubQueue, ['GroupId', 'Data']);
      data = pubQueue.Data;
      await sleep(1000);
    }
    const item = data[0];
    assert.hasAllKeys(item, [
      'GroupId',
      'RetryCount',
      'State',
      'StorageType',
      'UpdateAt',
      'Trx',
    ])
  });

  it('acknowledge', async () => {
    const res = await client.PubQueue.acknowledge([trxId]);
    assert.isNotEmpty(res);
  });
});