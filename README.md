Magic Emblems [![Build Status](https://travis-ci.org/pdgwien/mtg-emblems.svg?branch=master)](https://travis-ci.org/pdgwien/mtg-emblems) [![Code Climate](https://codeclimate.com/github/pdgwien/mtg-emblems/badges/gpa.svg)](https://codeclimate.com/github/pdgwien/mtg-emblems)
=============

If you are searching for a way to spice up your old boring Magic: The Gathering game, then look no further. 
Magic Emblems is quick and easy way to add excitement, fun and a lot of tide turning to every game you play.

If you want to run it yourself, `cd` in the root directory and execute the following commands. Make sure you have [npm](http://nodejs.org) and [grunt-cli](http://gruntjs.com) installed.
```bash
npm install #installs all the dependencies
grunt serve #provides you with a built-in server with live-reload
grunt build #minfies all the js and css and puts the files in to dist/
grunt gh-pages #takes everything from dist/ and pushes it to your gh-pages branch
```
If you can't or don't want to compile it, then you can use the precompiled version [here](https://pdgwien.github.io/mtg-emblems/).

Also, you are going to need a [Firebase](https://firebase.com) account. Please update the URLs accordingly in the source code.

How to Play
===========
If you play with a local group, one of you opens Magic Emblems on his phone. Then you request an emblem every turn, discarding the effects of the older emblems (unless it is stated differently) and have fun!

Contributing
============

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
