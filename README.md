# VRCrowdExperiments

Data &amp; Software Accompanying WWW 2018 paper

```
@article{ma2018web,
  title={Web-Based VR Experiments Powered by the Crowd},
  author={Ma, Xiao and Cackett, Megan and Park, Leslie and Chien, Eric and Naaman, Mor},
  journal={Proceedings of The Web Conference (WWW) 2018},
  year={2018}
}
```

## Software for Running WebVR Experiments Powered by the Crowd

We open source three experiments described in the paper, built using [React VR, v1.4.0](https://github.com/facebook/react-360/tree/v1.4.0) and [Node.js](https://nodejs.org/en/), which can be accessed using browsers that support [WebVR standards](https://webvr.info/).

After building the apps, they were hosted on [Heroku](https://www.heroku.com/), using the mongodb ([mongoose](http://mongoosejs.com/)) database.

## Folder structure

We nested three studies into the same source folder (client) so that we could share common screens, such as welcome screen and the exit screen that contains verification code.

One can only develop / build one study at a time, the way to switch studies is by searching for `STUDY SWITCH POINT` and change the config variables at four places, including:

```
./client/ExperimentConfigs.js: export default Study1Config;
./client/index.vr.js: import App from './Study1/index.vr';
./client/redux/Misc.js: import type { KnownActions } from '../Study1/redux/RootReduxStore';
./client/redux/Misc.js: import RootReduxStore from '../Study1/redux/RootReduxStore';
```

### Views

Common screens were defined in `./client/views`, such as Welcome and Exit screens, keyboards, generic UI styles, etc.

Study specific screens were defined in `./client/Study*/views`. The texts were all configured at `./client/Study*/StandardLanguage.js`, and states managed by [redux](https://redux.js.org/).

Most of our files were static typed with [Flow](https://flow.org/en/), if you are not familiar with it or not a fan, feel free to ignore them.

## Develop - Client Side

Change the working directory to `./client`, then `npm i` to update the required packages, and `npm start`.

The VR app will be running at `http://localhost:8081/vr/`.

## Develop -- Server Side

We used a simple [Express framework](https://expressjs.com/) for our server, for logging the data into databases. However, you can do whatever suits you best for this part. Our code is in `./server` for your reference.

## Deploying to Heroku

1. Set the study to the one needs to be deployed by searching for `STUDY SWITCH POINT` (should be four places)
2. Update the `Configs.js` file under the target study folder. Set:
3. `DEV = false; LOG_VRSTATUS = true; SERVER_DOMAIN = 'http://xxx.herokuapp.com';`
4. Initiate a new folder with the following file structure:

```
.
├── Procfile: "web: node index.js"
├── api (copied from the compiled server/dist/ folder)
│   ├── controllers
│   │   └── Controllers.js
│   ├── models
│   │   └── Models.js
│   └── routes
│       └── index.js
├── index.js (copied from the compiled server/dist/ folder, needs to add one line at bottom)
│            (append `app.use(_express2.default.static('public'));` at the end of file)
├── package.json (copied from the compiled server folder)
└── public
    ├── build (copied from the bundled react-vr app, from /client/vr/ folder)
    │   ├── client.bundle.js
    │   ├── client.bundle.js.meta
    │   ├── index.bundle.js
    │   └── index.bundle.js.meta
    ├── client.js (need to change the study name to the one deployed in `new VRInstance(..`)
    ├── index.html (use the one in the template)
    └── static_assets
        ├── browser-logo.jpg
        ├── home.jpg
        ├── nav-selection.png
        ├── ...
        └── ...
```

1. Can also use the `template_heroku` folder to start
2. Then [create a Heroku remote to push to](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote)
3. Deploy to Heroku by `git push heroku master`

## Data for Previous experiments

Previous experiment data coming soon.
