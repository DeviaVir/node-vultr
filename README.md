# WARNING: project is no longer actively maintained, make sure to update any dependencies if you plan on using this in your project.

# node-vultr
Node.JS Promise-based library to communicate with the Vultr API

Test coverage is currently 100%, although some tests involving actually creating the VPS's itself are currently not tested.

This library creates a new instance of "Vultr" for you, exposing a few libraries and methods you can use to communicate.

To start a new Vultr instance:

```js
var Vultr = require('vultr');

var vultrInstance = new Vultr(apiKey);
```

`apiKey` is your Vultr API key.

## Enable the Vultr API

You can generate a Vultr API key from the `Settings` page.

## Running the integration tests

It's safe for you to run the integration tests, simply copy `config/data.example.js` to `config/data.js` and fill out your real API key. Run `npm test` to run the tests.

## Account

### vultrInstance.account.info

```js
vultrInstance.account.info().then(function(info) {
  // Returns Object with account info
})
```

## DNS

### vultrInstance.dns.list

```js
vultrInstance.dns.list().then(function(list) {
  // Returns array with DNS entries  
})
```

### vultrInstance.dns.createDomain

```js
vultrInstance.dns.createDomain('dualdev.com')
```

### vultrInstance.dns.createRecord

```js
vultrInstance.dns.createRecord({
  'domain': 'dualdev.com',
  'name': 'test',
  'type': 'A',
  'data': '127.0.0.1'
})
```

### vultrInstance.dns.records

```js
vultrInstance.dns.records('dualdev.com').then(function(list) {
  // Returns array with DNS entries
})
```

### vultrInstance.dns.deleteRecord

```js
vultrInstance.dns.deleteRecord({
  'domain': 'dualdev.com',
  'id': id
})
```

### vultrInstance.dns.deleteDomain

```js
vultrInstance.dns.deleteDomain('dualdev.com');
```

## OS

### vultrInstance.os.list

```js
vultrInstance.os.list().then(function(list) {
  // Returns array with OS objects
})
```

## ISO

### vultrInstance.iso.list

```js
vultrInstance.iso.list().then(function(list) {
  // Returns array with ISO objects
})
```

### vultrInstance.iso.createFromUrl

```js
vultrInstance.iso.createFromUrl().then(function(list) {
  // Returns Object with ISO upload status
})
```

## Backup

### vultrInstance.backup.list

```js
vultrInstance.backup.list().then(function(list) {
  // Returns array with Backup objects
})
```

## Plans

### vultrInstance.plans.list

```js
vultrInstance.plans.list().then(function(list) {
  // Returns array with PLAN objects
})
```

## Regions

### vultrInstance.regions.list

```js
vultrInstance.regions.list().then(function(list) {
  // Returns array of REGION objects
})
```

### vultrInstance.regions.availability

Retrieve a list of the VPSPLANIDs currently available in this location. (DCID can be retrieved from `vultrInstance.regions.list()`)

```js
vultrInstance.regions.availability(DCID).then(function(plans) {
  // Returns array of PLAN objects
})
```

## Server

### vultrInstance.server.list

```js
vultrInstance.server.list().then(function(list) {
  // Returns array of vps's
})
```

### vultrInstance.server.bandwidth

`SUBID` is the VPS ID

```js
vultrInstance.server.bandwidth(SUBID).then(function(bandwidth) {
  // Returns bandwidth objects
})
```

### vultrInstance.server.reboot

`SUBID` is the VPS ID

```js
vultrInstance.server.reboot(SUBID)
```

### vultrInstance.server.halt

`SUBID` is the VPS ID

```js
vultrInstance.server.halt(SUBID)
```

### vultrInstance.server.start

`SUBID` is the VPS ID. This function also RESTARTS an already running VPS.

```js
vultrInstance.server.start(SUBID)
```

### vultrInstance.server.destroy

`SUBID` is the VPS ID

```js
vultrInstance.server.destroy(SUBID)
```

### vultrInstance.server.reinstall

`SUBID` is the VPS ID

```js
vultrInstance.server.reinstall(SUBID)
```

### vultrInstance.server.restoreSnapshot

`SUBID` is the VPS ID. `SNAPSHOTID` can be retrieved from `vultrInstance.snapshot.list()`.

```js
vultrInstance.server.restoreSnapshot(SUBID, SNAPSHOTID)
```

### vultrInstance.server.restoreBackup

`SUBID` is the VPS ID. `BACKUPID` cannot be retrieved yet (asked Vultr support about this).

```js
vultrInstance.server.restoreSnapshot(SUBID, BACKUPID)
```

### vultrInstance.server.create

`create` returns `SUBID`, this is used in many other calls. PLAN, OS and REGION can be retrieved from the services offering the same name.

```js
vultrInstance.server.create({
  'plan': PLAN,
  'os': OS,
  'region': REGION
})
```

### vultrInstance.server.listIpv4

`SUBID` is the VPS ID.

```js
vultrInstance.server.listIpv4(SUBID).then(function(list) {
  // Returns object of ipv4 addresses  
})
```

### vultrInstance.server.reverseSetIpv4

`SUBID` is the VPS ID.

```js
vultrInstance.server.reverseSetIpv4(SUBID, IP, ENTRY)
```

### vultrInstance.server.reverseDefaultIpv4

`SUBID` is the VPS ID.

```js
vultrInstance.server.reverseDefaultIpv4(SUBID, IP)
```

### vultrInstance.server.listIpv6

`SUBID` is the VPS ID.

```js
vultrInstance.server.listIpv6(SUBID).then(function(list) {
  // Returns object of ipv6 addresses  
})
```

### vultrInstance.server.reverseSetIpv6

`SUBID` is the VPS ID.

```js
vultrInstance.server.reverseSetIpv6(SUBID, IP, ENTRY)
```

### vultrInstance.server.reverseListIpv6

`SUBID` is the VPS ID.

```js
vultrInstance.server.reverseListIpv6(SUBID).then(function(list) {
  // Returns object of reverse ipv6 entries
})
```

### vultrInstance.server.reverseDeleteIpv6

`SUBID` is the VPS ID.

```js
vultrInstance.server.reverseDeleteIpv6(SUBID, IP)
```

### vultrInstance.server.setLabel

`SUBID` is the VPS ID. `LABEL` is a `string` of your choosing.

```js
vultrInstance.server.setLabel(SUBID, LABEL)
```

### vultrInstance.server.createIpv4

`SUBID` is the VPS ID. The second argument is "yes" or "no" to trigger a reboot.

```js
vultrInstance.server.createIpv4(SUBID, 'no')
```

### vultrInstance.server.destroyIpv4

`SUBID` is the VPS ID. The second argument is "yes" or "no" to trigger a reboot.

```js
vultrInstance.server.destroyIpv4(SUBID, 'no')
```

### vultrInstance.server.osChangeList

`SUBID` is the VPS ID.

```js
vultrInstance.server.osChangeList(SUBID).then(function(list) {
  // Returns object of available OS's
})
```

### vultrInstance.server.osChange

`SUBID` is the VPS ID.

```js
vultrInstance.server.osChange(SUBID, OSID)
```

### vultrInstance.server.upgradePlanlist

`SUBID` is the VPS ID.

```js
vultrInstance.server.upgradePlanlist(SUBID).then(function(list) {
  // Returns object of available upgrade plans
})
```

### vultrInstance.server.upgradePlan

`SUBID` is the VPS ID.

```js
vultrInstance.server.upgradePlan(SUBID, PLANID)
```

## Snapshot

### vultrInstance.snapshot.list

```js
vultrInstance.snapshot.list().then(function(list) {
  // Returns array of snapshot objects
})
```

### vultrInstance.snapshot.create

`SUBID` is the VPS ID. `DESCRIPTION` is an optional description for this snapshot.

```js
vultrInstance.snapshot.create(SUBID, DESCRIPTION)
```

### vultrInstance.snapshot.destroy

`SNAPSHOTID` can be retrieved from `vultrInstance.snapshopt.list()`.

```js
vultrInstance.snapshot.destroy(SNAPSHOTID)
```

## SSHKey

### vultrInstance.sshkey.list

```js
vultrInstance.sshkey.list().then(function(list) {
  // Returns array of sshkey objects
})
```

### vultrInstance.sshkey.create

```js
vultrInstance.sshkey.create(NAME, KEY)
```

### vultrInstance.sshkey.update

`SSHKEYID` can be retrieved from `vultrInstance.sshkey.list()` or after calling `vultrInstance.sshkey.create()`.

```js
vultrInstance.sshkey.update(NAME, KEY, SSHKEYID)
```

### vultrInstance.sshkey.destroy

`SSHKEYID` can be retrieved from `vultrInstance.sshkey.list()` or after calling `vultrInstance.sshkey.create()`.

```js
vultrInstance.sshkey.destroy(SSHKEYID)
```

## StartupScript

### vultrInstance.startupscript.list

```js
vultrInstance.startupscript.list().then(function(list) {
  // Returns array of startupscript objects
})
```

### vultrInstance.startupscript.create

```js
vultrInstance.startupscript.create(NAME, KEY)
```

### vultrInstance.startupscript.update

`SCRIPTID` can be retrieved from `vultrInstance.startupscript.list()` or after calling `vultrInstance.startupscript.create()`.

```js
vultrInstance.startupscript.update(NAME, KEY, SCRIPTID)
```

### vultrInstance.startupscript.destroy

`SCRIPTID` can be retrieved from `vultrInstance.startupscript.list()` or after calling `vultrInstance.startupscript.create()`.

```js
vultrInstance.startupscript.destroy(SCRIPTID)
```
