const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');
const sleep = require('./utils/sleep');

const client = RumFullNodeClient({ baseURL });

describe('Producer', () => {
  let groupId = '';
  let producerPubKey = '';
  
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
    producerPubKey = group.owner_pubkey;
  });

  it('announce producer', async () => {
    try {
      const res = await client.Producer.announce({
        'group_id': groupId,
        'action': 'add',
        'type': 'producer',
        'memo': ''
      });
      assert.hasAllKeys(res, [
        'group_id',
        'sign_pubkey',
        'encrypt_pubkey',
        'type',
        'action',
        'sign',
        'trx_id',
      ]);
    } catch (err) {
      console.log(err);
    }
  });

  it('list announced producers', async () => {
    let announcedProducers = [];
    while (announcedProducers.length === 0) {
      announcedProducers = await client.Producer.listAnnouncedProducers(groupId);
      await sleep(1000);
    }
    const announcedProducer = announcedProducers[0];
    assert.hasAllKeys(announcedProducer, [
      'Action',
      'AnnouncedPubkey',
      'AnnouncerSign',
      'Result',
      'Memo',
      'TimeStamp',
    ]);
  });

  it('declare producer', async () => {
    const res = await client.Producer.declare({
      'group_id': groupId,
      'producer_pubkey': producerPubKey,
      'action': 'add'
    });
    assert.hasAllKeys(res, [
      'group_id',
      'producer_pubkey',
      'owner_pubkey',
      'signature',
      'trx_id',
      'memo',
      'action',
    ]);
  });

  it('list approved producers', async () => {
    let approvedProducers = [];
    while (approvedProducers.length === 0) {
      approvedProducers = await client.Producer.listApprovedProducers(groupId, producerPubKey);
      await sleep(1000);
    }
    const approvedProducer = approvedProducers[0];
    assert.hasAllKeys(approvedProducer, [
      'ProducerPubkey',
      'OwnerPubkey',
      'OwnerSign',
      'TimeStamp',
      'BlockProduced',
    ]);
  });

  after(async () => {
    await client.Group.leave(groupId);
  });
});