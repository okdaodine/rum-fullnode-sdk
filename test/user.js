const { RumFullNodeClient } = require('../dist');
const { assert } = require('chai');
const { baseURL } = require('./utils/env');
const sleep = require('./utils/sleep');

const client = RumFullNodeClient({ baseURL });

describe('User', () => {
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

  it('announce user', async () => {
    const res = await client.User.announce({
      'group_id': groupId,
      'action': 'add',
      'type': 'user',
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
  });

  it('list announced users', async () => {
    let announcedUsers = [];
    while (announcedUsers.length === 0) {
      announcedUsers = await client.User.listAnnouncedUsers(groupId);
      await sleep(1000);
    }
    const announcedUser = announcedUsers[0];
    assert.hasAllKeys(announcedUser, [
      'AnnouncedSignPubkey',
      'AnnouncedEncryptPubkey',
      'AnnouncerSign',
      'Result',
      'Memo',
      'TimeStamp',
    ]);
  });

  it('get announced user', async () => {
    const announcedUser = await client.User.getAnnouncedUser(groupId, userPubKey);
    assert.hasAllKeys(announcedUser, [
      'AnnouncedSignPubkey',
      'AnnouncedEncryptPubkey',
      'AnnouncerSign',
      'Result',
      'Memo',
      'TimeStamp',
    ]);
  });

  it('declare user', async () => {
    const res = await client.User.declare({
      'group_id': groupId,
      'user_pubkey': userPubKey,
      'action': 'add'
    });
    assert.hasAllKeys(res, [
      'group_id',
      'user_pubkey',
      'encrypt_pubkey',
      'owner_pubkey',
      'sign',
      'trx_id',
      'memo',
      'action',
    ]);
  });

  after(async () => {
    await client.Group.leave(groupId);
    await client.Group.clear(groupId);
  });
});