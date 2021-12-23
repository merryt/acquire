# acquire

A digital version of the board game acquire https://boardgamegeek.com/boardgame/5/acquire

## To get dev setup

- Clone project
- Install node (I am using 14.17.6)
- Install nodemon globally `npm install -g nodemon`
- `npm install`
- `npm run dev`

For todos check out the [project board](https://github.com/merryt/acquire/projects/1)

## To run test

- If on windows follow the tutorials below. I highly recomend mac or linux for running tests.
- I need to make sure I have VcXsrv Windows X Server running programname is XLaunch
- MAKE SURE when launching `XLaunch` to disable access control on the third screen. It is in `extra settings`
- `npm run test`, or `npm t`

Two tutorials I followed:

- https://wilcovanes.ch/articles/setting-up-the-cypress-gui-in-wsl2-ubuntu-for-windows-10/
- https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress
