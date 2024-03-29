# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/compare/v2.0.0...v2.1.0) (2023-04-11)


### ⚠ BREAKING CHANGES

* Database will show a difference in id generation

### Features

* **settings:** add create dashboard flow ([850c403](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/850c4039b5a4ab46af6c01999bfcf495257c2c60))


### Bug Fixes

* do not use Env in domain, use process.env.ORION_ROOT_USER_EMAIL instead ([c739bc1](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/c739bc1219b7b5266b8a2fb537aa13270de0fa4d))
* **frontend:** remove util javascript file ([3e5afb6](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/3e5afb6e7dfb5598fe4dadb3ffb64147a64860c0))
* **notifications:** save only once, when notification is platform ([cf3989a](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/cf3989aa51933af595e26976e5fe266ae0597336))
* routes fix ([4774eec](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/4774eec9c7bf1ecfeeab390911da3dfc0516c3d0))


* replace cuid with randomUUID from node ([47b9bb3](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/47b9bb33ccf2fc257c11808606812783a1fbb198))

## [2.0.0](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/compare/v1.2.0...v2.0.0) (2023-03-31)


### ⚠ BREAKING CHANGES

* **outbox-inbox:** Mongodb Transaction is only avaliable on mongodb replica, so, will be necessary to
convert the standalone instalation to replica mode

### Features

* **core:** add a single point of notification ([845b7b4](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/845b7b45d10b57526945c7a9a2a80effc83106cc))
* **core:** add NOTIFY contract on outbox ([f1dc0ee](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/f1dc0ee57884fbb565f878ad58066ad72046fe06))
* **core:** track all user activities ([54a7cee](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/54a7ceeb42a009f5e5a1ce9199815b57e8600d56))
* **outbox-inbox:** update outbox and inbox to use mongodb transaction ([b7bfae2](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/b7bfae2e73b86d8cbbaa722653c91f93692cf13e))
* **profile:** add latest user activity ([c7cc17e](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/c7cc17e411f9c2411ff6b010669c54dbb6641a4e))


### Bug Fixes

* get success from session when exists ([7d500a8](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/7d500a88fda3d89675bb5824df3a0996d0e945af))
* use aggragate to mount mongodb query ([a9ec1f8](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/a9ec1f85f12fb634cb56dc4f6462880d3841b7cb))

## [1.2.0](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/compare/v1.1.0...v1.2.0) (2023-03-21)


### Features

* **core:** [api] add retrieve newest user notifications via api ([ba77d3c](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/ba77d3c26888e3ed6c7c0861a1df4f545d8ffa75))
* **core:** add domain use cases for retrive notifications ([0409071](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/040907199819b080a82f8bd4cbc89cde1090d6cc))
* **core:** implement rabbitmq with outbox exchange ([b095efc](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/b095efc0f5fae568c723a0e4862dbe9fdf6854e8))
* **core:** implement rabbitmq with outbox exchange ([eaa85b3](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/eaa85b310c04839f41f3164386a53c7c44fb8d79))
* **core:** when block a user send email ([6269d58](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/6269d5853f3df31fc586074c7be02dfb16b0dd44))
* retrieve notifications in frontend ([917e52d](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/917e52ddd93a7443204747606bf12aa2a01b00b3))
* retrive notifications in frontend ([8f97220](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/8f9722044a499e2e6b3393d3a8798cdf742b35fe))


### Bug Fixes

* **admin:** when receives an message should use transaction in inbox pattern ([08fec3c](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/08fec3cfa625599e98e1b9f403961eb6202c428f))
* **auth:** add broadcastMessageRepository when do send reset password ([80c4daf](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/80c4daff39da992891d331f0ecb67510e41eb8b2))
* **consumer:** abstract consumer and re-use same base consumer implementation ([04fadfd](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/04fadfd81b9c9578eb619f5e557b9f8f0d8740ab))
* **global:** move loader of i18n files to a AppProvider ([e9c5ce6](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/e9c5ce6bd267fa5d4a04920dd2fe7823ec88a948))
* **global:** restore notificatio type entity ([332ac20](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/332ac2011137e83530c878d23df695a7c1f69cc2))
* **hash-driver:** when generate a new hash add timestamp into payload, to not duplicate ([ad76839](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/ad76839e06cc578a40d60d60e6374e1a2c7823f9))
* **i18n:** correct i18n dashboard subtitle ([0ecaa15](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/0ecaa1586f31c2615f58292e4c91d1abca06dad1))
* **i18n:** uses user default lang to send e-mail ([b7ee6b1](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/b7ee6b13ea466c87cd398dd10387acb72c69cb07))
* **outbox:** save send_email into coreSharedInboxModel ([f5b28f4](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/f5b28f414ceb9759d627fdd1e5708b709605a6f0))
* remote on changelog ([25d9068](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/25d9068e00f2ff2e5ace3bec67c7e419648bc568))
* **socket:** broadcast all should use io.sockets instead of current socket ([d6f5f36](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/d6f5f36c1c528863ca37f78a81fd9e3e8249399c))

## 1.1.0 (2023-03-06)


### Features

* add a new domain use case ([7b96470](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/7b96470376ea346b95f66553af2f0acde62ddd33))
* add create user (contains error) ([157a817](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/157a817c916aae38694dd67abc7ee6fa5b3bef90))
* add create user modal ([03dceb1](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/03dceb17f19c4f68fb4e9a8c9ae8454d04376a74))
* add dokcer to dev envirement ([e08ed51](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/e08ed5153b5a9761e107fff1e7082a5a3101a383))
* add edit-role with latest data ([6bd58c2](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/6bd58c2331b505a4a7f9a858e1ad34c3c09efc4d))
* add feat to create user using role ([e2a54b5](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/e2a54b50687a275972c7405eeafbd8213551f8e2))
* add list roles ([d078ade](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/d078ade7e90ec188765ac49acc8aebb1a91b2ad2))
* add list-users use case contract ([53cc509](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/53cc5097684ec97e9393fb8686d9670f5d962da4))
* add our transaction implementation ([64984b3](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/64984b3f8ac71d1b9250b8cba802add231d1f025))
* add reset password route and factory ([81c115b](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/81c115b31b20187130b790081b9b6ec770144e0b))
* add reset user password ([e5a010a](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/e5a010a0366fc291e13111a7c79a63a03e1d8a83))
* add update role ([74146e0](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/74146e022dab0d60e42e6003a49f3d96ccff282d))
* all assets should be outside of project folder ([438f7f7](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/438f7f703d30cf043d974e4a8580f6c0645f0e3e))
* allow to delete multi-lines with validation ([1a7a5fd](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/1a7a5fd211b905cb878d4b1bc786d57d0094a9e0))
* allow to update a user ([8e6b05d](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/8e6b05d7d9c96c5013a1cc996f0d11ab3caf8916))
* block and unblock user ([1c56874](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/1c56874f63d180f6127ded85d3530189fb0ff2dd))
* can delete a role ([5b6e30b](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/5b6e30b93ee2ec1dea59291880d77848650f718f))
* create role ([0a7cde4](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/0a7cde428887fcc4b94d4d247be6831d62714c7e))
* create role and use alert ([30fdff8](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/30fdff869c13422e792442b83d41269769cb4132))
* implement all usecases ([71f39e0](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/71f39e0d9d0365f24443bce145d947e5c9dbff1f))
* implement all user-management usecases ([58def8b](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/58def8bc52e143b1c65ec264a645f9ebdb13348a))
* implement use cases ([f73fa51](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/f73fa51a7a9abb29af9ea2ec96b18c7a199e065c))
* install packages using ui ([0f3a40f](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/0f3a40f903108b52a107bc713e84a85148f0a139))
* make update user info ([8aca406](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/8aca40672b3f97c6eb0cb661f258701766f9124a))
* normal user cannot edit or create a root user ([13e6414](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/13e641494d70d40941e8b312462b60672127c617))
* notifications returning from db ([7e3881e](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/7e3881ef937acc849af21983bf4a67ccc0558d89))
* **real-time:** trigger an alert when a role was updated ([f5d3d3f](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/f5d3d3faa6af92f8047d177b10d8baaea0ed3bb2))
* recovery password ([05e83d7](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/05e83d746ffaeec8364d06765681d46fe3381abe))
* update password ([937c350](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/937c350a501fd53e989f4c8361589d232fb15c20))
* update user info with upload ([c834f28](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/c834f28e2541164ecd84cb5d5f2ed5fe6bdc3cc4))
* use permission basead layout ([eab611a](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/eab611ae1315b186e08aaf1ae6572148c915ba99))
* view others users profile ([a7e6735](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/a7e6735bcdd8809a0e8492947d9442c7e1d30207))
* when block send notification ([085ed8e](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/085ed8eefb37847bd31308b79aafe232866f51b8))


### Bug Fixes

* .el-dialog in dark-mode ([355c494](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/355c4944601e5ba22dee1eca7c39c58011702607))
* **acl:** refactor unblock message ([3e86b0d](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/3e86b0dead163c0cf9ce718aff95fa012a26356d))
* add close button on alert ([1770d82](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/1770d82bef82cc723a2e19e24e828108e19a4288))
* add event-dispatcher ([b6bed3a](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/b6bed3af27941bcb9133fc21d6df55981a3a2903))
* add prevents on internal roles ([e9b61e9](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/e9b61e9cb12e0c9021af12ac4a0758ad3d125582))
* add slug ([f013dd2](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/f013dd247bfeff3f8d8aefb3660524d243f50eae))
* avatar fallback on user initial ([9c28025](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/9c280257547b1de87a305ef1a565820b278f4b3f))
* bug [#1](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/issues/1) in role mapper ([d4dfab0](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/d4dfab0f353fe6114bebc4a6fa70991af7fd9909))
* build bugs ([bdaf8c2](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/bdaf8c26f88c983dc0341d030f6a1def810d7eab))
* can only have one root user and cannot be edited ([f836eec](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/f836eec0e070cdeb6b3d9c79745d9cd112512438))
* cannot ([2bb1e78](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/2bb1e784f37d09b2570cda40604ea9643cccf97d))
* cannot load plugin and fix statusId ([6cf6049](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/6cf6049584838962328c297f6236966b6ea27d62))
* **common:** update password ([44b7ff1](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/44b7ff144c760f44b54b364a3c4fa37b0770eaf7))
* dark mode ([f29e051](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/f29e0517a799edcebf35017b76c9d1a1782b7145))
* date can be null ([7ca6635](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/7ca663567c310b7741dbfd3e386071aa358e3371))
* delete all role permission and then add again ([d71ad35](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/d71ad35b0e28f7e53123baf605892d99b6370c37))
* delete when users are deleted ([fe4302a](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/fe4302a83be80e9d968ba189b5942a9e841c22b2))
* do not update username, this drops socket ([214b249](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/214b249b0f30897ade3b80e739bfabb63fe8f20a))
* **global:** issue when webpack updates lost i18n refs ([993a91a](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/993a91ac38986fb3f4a8f81971e925969c81e33b))
* load menu from database ([3587b3a](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/3587b3a513399348b8ae09daf56edb8438a1f9a6))
* load seeder using replace instead of split ([53ce619](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/53ce61914ceb5dbb55798d68fa933bcadc67b338))
* logout on settings ([8c5c888](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/8c5c888f1ec8c4b6fcf5571c7580ac15c5b566e9))
* menu should return with isGroup prop ([c71079f](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/c71079f93f59309d451fba6d73955d677a832b50))
* non-root cannot edit internal roles ([636deef](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/636deef55986eb837f46b05e344f4be3857509c0))
* order ([0cec36c](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/0cec36cdc477ddd083833c66f5976de085610b61))
* pivot permission table ([3daa863](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/3daa863ff816ec29a41bedca188cb97bfa37e54b))
* prevent not update name and description for sys roles ([344a2ee](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/344a2ee42d0f874dc8c242c6979dec7e64f121ae))
* regex to support js ([577df2f](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/577df2f4e2f43abaf19ad70f3c80bbce6a7aaa7d))
* remove insert user on auth ([11f6263](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/11f6263aad00a82615cebf8f94f863909de11ed8))
* session key in acl-middleware ([25de000](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/25de000c752306000e94a93ea271e913cb26750c))
* sistemic error fix ([2f57a7a](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/2f57a7ae8da48978b9215a9252a3d1d6d23e9000))
* socket duplicated events ([af6dcee](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/af6dcee02d6022529bfd24fbf463e4cd0f5be770))
* **socket:** load all sockets when a user connect ([7c792e2](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/7c792e252905652305161ce5810ea33d3507d4ab))
* use cors on same url ([9f288e5](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/9f288e5a8c1f0a28c515d0b5f4fd37816146be53))
* use for..of loop instead of foreach ([60d61c5](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/60d61c579cb88f9850fe6e625b280bbe34135f28))
* use i18n in frontend too ([b9f76d1](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/b9f76d1b67e8850864c83d61d71372b4b33732ec))
* use only one i18n folder ([6a80a09](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/6a80a0939173507a27cfc5f9b92bfde27fd0579a))
* use our i18n rules instead of yup rules ([bb9f20e](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/bb9f20e8e4722660711e09c2aff11f7405f5ef15))
* user-logged-listener use UserModel ([d5792f2](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/d5792f2698ed761bf6f7dbddf0190c3aa0d173ec))
* when close clear alert ([0255557](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/0255557dab97ed06cbe3703f4be14e3940aa9ddd))
* when data type is error, dont close notification ([f3b5e51](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/f3b5e51b642b7240c86bd7c99db1001066447b8c))
* when session expires redirect to login ([c56b61d](https://gitlab.itgest.pt/itgest-ao-dev/umape/next-lotus-ao/commit/c56b61d35c8200cbc8dfc5235aaf2f950684e4fa))
