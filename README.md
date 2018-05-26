Mongoose-erd-generator
===============================

a tool that extracts  information from mongoose schemas and turns them to an ERD diagram.


[![Build Status](https://travis-ci.org/jodevsa/node-bitview.svg?branch=master)](https://travis-ci.org/jodevsa/node-bitview)
[![bitHound Dependencies](https://www.bithound.io/github/jodevsa/node-bitview/badges/dependencies.svg)](https://www.bithound.io/github/jodevsa/node-bitview/master/dependencies/npm)
![bitHound Overall Score](https://www.bithound.io/github/jodevsa/node-bitview/badges/score.svg)
![issues](https://img.shields.io/github/issues/jodevsa/node-bitview.svg)
![stars](https://img.shields.io/github/stars/jodevsa/node-bitview.svg)
![license](https://img.shields.io/github/license/jodevsa/node-bitview.svg)

Installation
-----

`npm install mongoose-erd-generator -g`

Running the script
-----
  mongoose-erd-generator -o modelsPath

##### options:
Usage: mongoose-erd-generator [options]

Options:

    -V, --version                                                 output the version number
    -p, --path <path>                                             set models path wanted to generate an ERD from.
    -o, --output <path>                                           set output path
    -f, --format [svg,dot,xdot,plain,plan-ext,ps,ps2,json,json0]  
    -c, --color <color>                                           
    -h, --help                                         