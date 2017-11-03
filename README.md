This is a little application based on  [Ionic](http://ionicframework.com/docs/) framework.

## Json server

The application need a little REST server which expose some data.
```bash
$ cd db
$ json-server --watch db.json
```

You can also add some delay with the option -d 2000.

## Deploying to an ios device

### Install tools

Install Xcode, found in app store.

Install some cli tools:
```bash
$ xcode-select --install
```

Install ios-deploy:
```bash
$ npm install -g ios-deploy
```

### Provisionning a profile:

* Open Xcode preferences
* Click account tab
* Login with your Appli ID (+ -> add Apple ID)

### Installing platform in your project

```bash
$ ionic cordova platform add ios
```
### Some configuration

Open config.xml:
* change widget id with your project id
* change name with your project name
* change the description
* change the author

To take into account these modifications :
```bash
$ ionic cordova plugin save
$ ionic cordova platform rm ios
$ ionic cordova platform add ios
```

Change icon:
* in resources, change icon.png and splash
* regenerate the icon files
```bash
$ ionic cordova resources
```

In src/shared you must change the baseurl.ts file. Replace the IP address with the one where the json-server application is running.

### Running your application

Build the application:
```bash
$ ionic cordova build ionic
```

Run the application using Xcode:
* Open the project with Xcode, file: platforms/ios/conFusion.xcodeproj
* change in general section / signing the team to yours
* connect your ios device with the USB cable
* select your phone as the run target in Xcode
* click the play button

Or run the application with the command line:
```bash
$ ionic cordova run ios --livereload --consolelogs
```

### Give rights to your application in your phone

* open Settings
* go to General / Device management
* tap on your email and trust it
