# rum-fullnode-sdk
SDK for rum fullnode

## Install
```
$ npm install rum-fullnode-sdk
```

## Usage

```javascript
const { RumFullNodeClient } = require('rum-fullnode-sdk');

const client = RumFullNodeClient({
  baseURL: 'http://127.0.0.1:8000',
  jwt: 'eyJhbGciOiJI....'
});

// create a group
const { group_id } = await client.Group.create({
  group_name: 'testing group',
  consensus_type: 'poa',
  encryption_type: 'public',
  app_key: 'testing',
});

// sign data and send trx to group
await client.Content.create(group_id, {
  type: "Create",
  object : {
    type: "Note",
    id: "1",
    content: "hello world",
  }
});

// get data from chain
const contents = await client.Content.list(group.groupId);
console.log(contents);
// [{
//   "Data": {
//     "type": "Create",
//     "object" : {
//       "type": "Note",
//       "id": "1",
//       "content": "hello world",
//     }
//   },
//   "TrxId": "...",
//   "GroupId": "...",
//   "TimeStamp": "...",
//   "Version": "1.0.0",
//   "Expired": 1672284016463,
//   "Nonce": 1,
//   "SenderPubkey": "...",
//   "SenderSign": "..."
// }]
```

## Test cases

```
AppConfig
  ✔ change
  ✔ get key list
  ✔ get value by key

Auth
  ✔ get auth rule
  ✔ set auth mode by updating chain config
  ✔ set alw_list by updating chain config
  ✔ get allow list
  ✔ get deny list

Content
  ✔ create content
  ✔ list contents

CURD Group
  ✔ create group
  ✔ get seed
  ✔ list groups
  ✔ leave group

Join and leave group
  ✔ join group
  ✔ leave group

Network
  ✔ get network

Node
  ✔ get node

Producer
  ✔ announce producer
  ✔ list announced producers
  ✔ declare producer
  ✔ list approved producers

PubQueue
  ✔ list pub queue
  ✔ acknowledge

Token
  ✔ create token
  ✔ refresh token

Trx
  ✔ get trx

User
  ✔ announce user
  ✔ list announced users
  ✔ get announced user
  ✔ declare user
```