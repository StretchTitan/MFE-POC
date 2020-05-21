/* TODO LIST */
/* 1. Add logging to mark when certain applications are rebuild and the rebuild is done */

var fs = require("fs");
var cp = require("child_process");

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
    if (mfe === 'shared' && data.indexOf("built all components") > -1 && !buildsComplete[mfe]) {
      console.log('in shared complete');
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

var env = process.argv[2];
var prodExt = env === "prod" ? ":prod" : "";
var buildsComplete = {
  homepage: false,
  billing: false,
  wrapper: false,
  shared: false,
};

console.log("Building all MFEs!");

cp.exec(`cd ../MFE-POC-HOMEPAGE && npm run build${prodExt} 2>&1 | tee homepage-build-log.txt`, outputHandler);
cp.exec("cd ../MFE-POC-HOMEPAGE && npm start 2>&1 | tee homepage-server-log.txt", outputHandler);
console.log("Building homepage...");

cp.exec(`cd ../mfe-poc-billing && npm run build${prodExt} 2>&1 | tee billing-build-log.txt`, outputHandler);
cp.exec("cd ../mfe-poc-billing && npm start 2>&1 | tee billing-server-log.txt", outputHandler);
console.log("Building billing...");

cp.exec(`cd ../mfe-shared && npm run build${prodExt} 2>&1 | tee shared-build-log.txt`, outputHandler);
cp.exec("cd ../mfe-shared && npm start 2>&1 | tee shared-server-log.txt", outputHandler);
console.log("Building shared...");

cp.exec(`cd ../MFE-POC && npm run start${prodExt} 2>&1 | tee wrapper-log.txt`, outputHandler);
console.log("Building wrapper...");

var counter = 0;
var reader = setInterval(() => {
  var { homepage, billing, wrapper, shared } = buildsComplete;

  readOutput(__dirname + "/../MFE-POC-HOMEPAGE/homepage-build-log.txt", "homepage");
  readOutput(__dirname + "/../mfe-poc-billing/billing-build-log.txt", "billing");
  readOutput(__dirname + "/../mfe-shared/shared-build-log.txt", "shared");
  readOutput(__dirname + "/../MFE-POC/wrapper-log.txt", "wrapper");

  if ((homepage && billing && wrapper && shared) || counter > 60) {
    clearInterval(reader);
    console.log("all mfes have been built");
  } else if (!(homepage || billing || wrapper || shared)) {
    console.log("...");
  }

  counter++;
}, 1000);
