# CodePush Server [source] (https://github.com/lisong/code-push-server)

[! [NPM Version] (https://img.shields.io/npm/v/code-push-server.svg)] (https://npmjs.org/package/code-push-server)
[! [Node.js Version] (https://img.shields.io/node/v/code-push-server.svg)] (https://nodejs.org/en/download/)
[! [Linux Status] (https://img.shields.io/travis/lisong/code-push-server/master.svg?label=linux)] (https://travis-ci.org/lisong/code -push-server)
[! [Windows Status] (https://img.shields.io/appveyor/ci/lisong/code-push-server/master.svg?label=windows)] (https://ci.appveyor.com/project / Lisong / code-push-server)
[! [Coverage Status] (https://img.shields.io/coveralls/lisong/code-push-server/master.svg)] (https://coveralls.io/github/lisong/code-push-server )
[! [Dependency Status] (https://img.shields.io/david/lisong/code-push-server.svg)] (https://david-dm.org/lisong/code-push-server)
[! [Known Vulnerabilities] (https://snyk.io/test/npm/code-push-server/badge.svg)] (https://snyk.io/test/npm/code-push-server)
[! [Licenses] (https://img.shields.io/npm/l/code-push-server.svg)] (https://spdx.org/licenses/MIT)

CodePush Server is a CodePush progam server! Microsoft CodePush cloud is slow, we can use this to build our's. You can use local storage, just modify config.js file, it's simple configure.

## Use code-push hot update correctly

- Apple allows the use of hot update [Apple's developer agreement] (https://developer.apple.com/programs/ios/information/iOS_Program_Information_4_3_15.pdf), but the provisions can not be prompted to update the user, affecting the user experience. And Google Play happens to be the opposite, you must inform the user to update.
- react-native different platform bundles are not the same, in the use of code-push-server must be created when the different applications to distinguish (eg. CodePushDemo-ios and CodePushDemo-android)
- react-native-code-push only update the resource file, will not update java and Objective C, so npm upgrade depends on the package version, if dependent on the use of localized package, this time must change the application version number (ios modify Info . CFBundleShortVersionString in .plist, android modifies versionName in build.gradle) and then recompiles the app to the app store.
- recommend the use of the code-push release-react command to publish the application, which combines the package and release commands (eg. Code-push release-react CodePushDemo-ios ios -d Production)

## EXAMPLE

### shell command line

```sShell
$ Code-push login http://codepush.19910225.com:8080 # Login
```

### [web] (http://codepush-managerment.19910225.com:8080)

Visit: http://codepush-managerment.19910225.com: 8080

### client eg.

[ReactNative CodePushDemo] (https://github.com/lisong/code-push-demo-app)

[Cordova CodePushDemo] (https://github.com/lisong/code-push-cordova-demo-app)

## INSTALL FROM NPM PACKAGE

```shell
$ Npm install code-push-server -g
$ Code-push-server-db init --dbhost localhost --dbuser root --dbpassword # initialize the mysql database
$ Code-push-server # Start the service browser to open http://127.0.0.1:3000
```

## INSTALL FROM SOURCE CODE

```shell
$ Git clone https://github.com/lisong/code-push-server.git
$ Cd code-push-server
$ Npm install
$ ./bin/db init --dbhost localhost --dbuser root --dbpassword # Initialize the mysql database
$ ./bin/www # Start the service in the browser to open http://127.0.0.1:3000
```

## CONFIG
```shell
$ Vim config / config.js
```
Please check if the following configuration is consistent with your environment, especially the downloadUrl parameter

```
  Db: {
    Username: "root",
    Password: null,
    Database: "codepush",
    Host: "127.0.0.1",
    Dialect: "mysql"
  },
  The configuration is required when storageType is qiniu
  Qiniu: {
    AccessKey: "",
    SecretKey: "",
    BucketName: "",
    DownloadUrl: "" / / file download domain name address
  },
  // The file is stored locally and needs to be configured when storageType is local
  Local: {
    StorageDir: "/ Users / tablee / workspaces / storage",
    // file download address CodePush Server address + '/ download' download corresponding app.js inside the address
    DownloadUrl: "http: // localhost: 3000 / download"
  },
  Common: {
    // login jwt signature key, must be changed, otherwise there are security risks, you can use the randomly generated string
    LoginSecret: "CodePushServer",
    DataDir: "/ Users / tablee / workspaces / data",
    // select the storage type, currently supports local and qiniu configuration
    StorageType: "local"
  },
```
Read [config.js] (https://github.com/lisong/code-push-server/blob/master/config/config.js)


## Storage mode [local / qiniu]

- configure local storage, modify config / config.js storageType value for the local, configuration in the following storageDir and downloadUrl local, if not on the same machine, downloadUrl Please specify the domain name or ip address


## RUN

```shell
$ Node ./bin/www # or code-push-server
```

Or point config file and ENV

```shell
$ CONFIG_FILE = / path / to / config.js NODE_ENV = production node ./bin/www # or CONFIG_FILE = / path / to / config.js NODE_ENV = production code-push-server
```

You have to change `loginSecret` in config.js for security.

## Default listen Host / Port 0.0.0.0/3000
You can change like this

```shell
$ PORT = 3000 HOST = 127.0.0.1 NODE_ENV = production node ./bin/www # or PORT = 3000 HOST = 127.0.0.1 NODE_ENV = production code-push-server
```

## [code-push-cli] (https://github.com/Microsoft/code-push)
Use code-push-cli manager CodePushServer

```shell
$ npm install code-push-cli @ latest -g
$ Code-push login http://127.0.0.1:3000 #login in browser account: admin password: 123456
```

## [react-native-code-push] (https://github.com/Microsoft/react-native-code-push) for react-native

```shell
$ Cd / path / to / project
$ Npm install react-native-code-push @ latest
```

## config react-native project
Follow the react-native-code-push docs, addition iOS add a new entry named CodePushServerURL, whose value is the key of ourself CodePushServer URL. Andriod use the new CodePush constructor in MainApplication point CodePushServerUrl

IOS eg. In file Info.plist

```xml
...
<Key> CodePushDeploymentKey </ key>
<String> YourCodePushKey </ string>
<Key> CodePushServerURL </ key>
<String> YourCodePushServerUrl </ string>
...
```

Android eg. In file MainApplication.java

```java
@Override
Protected List <ReactPackage> getPackages () {
  Return Arrays. <ReactPackage> asList (
      New MainReactPackage (),
      New CodePush (
         "YourKey",
         MainApplication.this,
         BuildConfig.DEBUG,
         "YourCodePushServerUrl"
      )
  );
}
```


## [cordova-plugin-code-push] (https://github.com/Microsoft/cordova-plugin-code-push) for cordova

```shell
$ Cd / path / to / project
$ Cordova plugin add cordova-plugin-code-push @ latest --save
`` ``

## config cordova project

Edit config.xml. Add code below

```xml
<Platform name = "android">
    <Preference name = "CodePushDeploymentKey" value = "nVHPr6asLSusnWoLBNCSktk9FWbiqLF160UDg" />
    <Preference name = "CodePushServerUrl" value = "http://codepush.19910225.com:8080/" />
</ Platform>
<Platform name = "ios">
    <Preference name = "CodePushDeploymentKey" value = "Iw5DMZSIrCOS7hbLsY5tHAHNITFQqLF160UDg" />
    <Preference name = "CodePushServerUrl" value = "http://codepush.19910225.com:8080/" />
</ Platform>
`` ``

## Production Manage
Use [pm2] (http://pm2.keymetrics.io/) to manage process.

```shell
$ npm install pm2 -g
$ p config / config.js /path/to/production/config.js
$ vim /path/to/production/config.js #configure your env.
$ cp docs / process.yml /path/to/production/process.yml
$ vim /path/to/production/process.yml #configure your env.
$ pm2 start /path/to/production/process.yml
```

## Use [CodePush Web] (https://github.com/lisong/code-push-web) manage apps

Add codePushWebUrl config in ./config/config.js

Eg.

```json
...
"Common": {
  "LoginSecret": "CodePushServer",
  "CodePushWebUrl": "Your CodePush Web address",
}
...
```

## License
MIT License [read] (https://github.com/lisong/code-push-server/blob/master/LICENSE)
This is a clone of [lisong code push repo] (https://github.com/lisong/code-push-server)
