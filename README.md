# MfeWrapper

## Hosts File Entry

Add this mapping to your hosts file to access this application in the browser.

`127.0.0.1        local.spectrum-poc.net`

## Development server

- Run `npm i` in all repos (MFE-POC, MFE-PCO-HOMEPAGE, mfe-poc-billing, mfe-poc-shared)
- Run `npm run start:all` to execute a script to run the wrapper and all other MFEs as one application
  - In order for this script to work, all MFE application need to be siblings in a directory/folder
  - Add 'prod' as an argument to run all in prod mode. `npm run start:all prod`
- Open a browser and go to http://local.spectrum-poc.net:4200 to launch the entire app
  - You can close the individual MFE blank tabs that are opened as they are not necessary
- All changes in the repos will trigger a rebuild with exception of mfe-shared
  - I am working on this but in the mean time, cd into the mfe-shared folder and run `npm run build` to see the changes in the browser

- To run only the MFE-POC wrapper application, just run `npm start`. 