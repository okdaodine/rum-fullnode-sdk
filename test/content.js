const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');
const sleep = require('./utils/sleep');

const client = RumFullNodeClient({ baseURL });

describe('Content', () => {
  let groupId = '';
  let trxId = '';
  let data = {
    type: 'Create',
    object: {
      type: 'Note',
      content: 'hello world'
    }
  };
  
  before(async () => {
    const { group_id } = await client.Group.create({
      group_name: 'testing group',
      consensus_type: 'poa',
      encryption_type: 'public',
      app_key: 'testing',
    });
    groupId = group_id;
  });

  it('create content', async () => {
    const res = await client.Content.create(groupId, data);
    assert.hasAllKeys(res, ['trx_id']);
    trxId = res.trx_id;
  });

  it('list contents', async () => {
    let contents = [];
    while (contents.length === 0) {
      contents = await client.Content.list(groupId);
      await sleep(1000);
    }
    const content = contents[0];
    assert.equal(content.TrxId, trxId);
    assert.hasAllKeys(content, ['Data', 'GroupId', 'SenderPubkey', 'SenderSign', 'TimeStamp', 'TrxId', 'Version']);
    assert.deepEqual(content.Data, data);
  });

  after(async () => {
    await client.Group.leave(groupId);
  });
});