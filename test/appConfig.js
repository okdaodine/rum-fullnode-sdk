const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');
const sleep = require('./utils/sleep');

const client = RumFullNodeClient({ baseURL });

describe('AppConfig', () => {
  let groupId = '';
  let key = 'repoName'

  before(async () => {
    const res = await client.Group.create({
      group_name: 'testing group',
      consensus_type: 'poa',
      encryption_type: 'public',
      app_key: 'testing',
    });
    groupId = res.group_id;
  });

  it('change', async () => {
    const res = await client.AppConfig.change({
      action: 'add',
      group_id: groupId,
      name: key,
      type: 'string',
      value: 'rum-fullnode-sdk',
      memo: ''
    });
    assert.hasAllKeys(res, ['group_id', 'signature', 'trx_id']);
  });

  it('getKeyList', async () => {
    let res = [];
    while (res.length === 0) {
      res = await client.AppConfig.getKeyList(groupId);
      await sleep(1000);
    }
    const key = res[0];
    assert.hasAllKeys(key, ['Name', 'Type']);
  });

  it('getValueByKey', async () => {
    const res = await client.AppConfig.getValueByKey(groupId, key);
    assert.hasAllKeys(res, [
      'Name',
      'Type',
      'Value',
      'OwnerPubkey',
      'OwnerSign',
      'Memo',
      'TimeStamp',
    ]);
  });

  after(async () => {
    await client.Group.leave(groupId);
  });
});
