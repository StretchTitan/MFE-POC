/* TODO LIST */
/* 1. Add logging to mark when certain applications are rebuild and the rebuild is done */

var fs = require("fs");
var cp = require("child_process");

var env = process.argv[2];
var prodExt = env === "prod" ? ":prod" : "";
var buildsComplete = {
  homepage: false,
  billing: false,
  wrapper: false,
  shared: false,
  homepageWC: false,
  library: false,
};

var outputHandler = (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
};

var readOutput = (filename, mfe) => {
  var stream = fs.createReadStream(filename);

  return stream.on("data", (data) => {
    if (!buildsComplete.library && data.indexOf("Built mfe-services-pipes") > -1) {
      buildsComplete[mfe] = true;
      console.log(`${mfe} build finished`);
      stream.destroy();
    }

    if (buildsComplete.homepage && mfe === 'homepageWC' && data.indexOf("built all components") > -1 && !buildsComplete[mfe]) {
      buildsComplete[mfe] = true;
      console.log(`${mfe} build finished`);
      stream.destroy();
    }
    if (mfe === 'shared' && data.indexOf("built all components") > -1 && !buildsComplete[mfe]) {
      buildsComplete[mfe] = true;
      console.log(`${mfe} build finished`);
      stream.destroy();
    }
    if (mfe !== 'shared' && data.indexOf("100%") > -1 && !buildsComplete[mfe]) {
      buildsComplete[mfe] = true;
      console.log(`${mfe} build finished`);
      stream.destroy();
    }
  });
};

var buildMFE = () => {
  console.log("Building all MFEs!");

  cp.exec(`cd ../MFE-POC-HOMEPAGE && rm -rf node_modules && rm homepage-build-log.txt && touch homepage-build-log.txt && npm i && npm run build${prodExt} 2>&1 | tee homepage-build-log.txt`, outputHandler);
  console.log("Building homepage...");

  cp.exec(`cd ../mfe-poc-billing && rm billing-build-log.txt && touch billing-build-log.txt && npm run build${prodExt} 2>&1 | tee billing-build-log.txt`, outputHandler);
  console.log("Building billing...");

  cp.exec(`cd ../mfe-shared && rm shared-build-log.txt && touch shared-build-log.txt && npm run build${prodExt} 2>&1 | tee shared-build-log.txt`, outputHandler);
  console.log("Building shared...");

  cp.exec(`cd ../MFE-POC && rm -rf node_modules && rm wrapper-log.txt && touch wrapper-log.txt && npm i && npm run start${prodExt} 2>&1 | tee wrapper-log.txt`, outputHandler);
  console.log("Building wrapper...");
}

var mfeServer = () => {
  cp.exec("cd ../MFE-POC-HOMEPAGE && npm start 2>&1 | tee homepage-server-log.txt", outputHandler);
  cp.exec("cd ../mfe-poc-billing && npm start 2>&1 | tee billing-server-log.txt", outputHandler);
  cp.exec("cd ../mfe-shared && npm start 2>&1 | tee shared-server-log.txt", outputHandler);
  cp.exec("cd ../MFE-POC-HOMEPAGE && npm run start:comp 2>&1 | tee homepage-wc-server-log.txt", outputHandler);
}

console.log("Building MFE libraries!");
cp.exec('cd ../mfe-libraries && ng build mfe-services-pipes --prod 2>&1 | tee mfe-libraries-build-log.txt')

var runningHomepageWC = false;
var runningMFEBuild = false;
var counter = 0;
var reader = setInterval(() => {
  var { homepage, billing, wrapper, shared, homepageWC, library } = buildsComplete;

  readOutput(__dirname + "/../mfe-libraries/mfe-libraries-build-log.txt", "library");

  if (library && !runningMFEBuild) {
    runningMFEBuild = true;
    buildMFE();

    setTimeout(() => {
      readOutput(__dirname + "/../MFE-POC-HOMEPAGE/homepage-build-log.txt", "homepage");
      readOutput(__dirname + "/../MFE-POC-HOMEPAGE/homepage-wc-build-log.txt", "homepageWC");
      readOutput(__dirname + "/../mfe-poc-billing/billing-build-log.txt", "billing");
      readOutput(__dirname + "/../mfe-shared/shared-build-log.txt", "shared");
      readOutput(__dirname + "/../MFE-POC/wrapper-log.txt", "wrapper");
    }, 10000);
  }

  if (homepage && !runningHomepageWC) {
    runningHomepageWC = true;
    cp.exec(`cd ../MFE-POC-HOMEPAGE && npm run build-comps${prodExt} 2>&1 | tee homepage-wc-build-log.txt`, outputHandler);
    console.log("Building homepage sharable wc...");
  }

  if ((homepage && billing && wrapper && shared && homepageWC) || counter > 120) {
    console.log("Starting MFE servers");
    clearInterval(reader);
    mfeServer();
    console.log("all mfes have been built");
  } else if (!(homepage || billing || wrapper || shared || homepageWC)) {
    console.log("...");
  }

  counter++;
}, 1000);
