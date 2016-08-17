#!/usr/bin/env node

var debug = require('debug')('example');
let ramlparser = require('raml-1-parser');

let pkg = require('../package.json');

let fs = require('fs');
import pathModule = require('path');

import yargs  = require('yargs')

var argv = process.argv;

let args: any = yargs
    .usage(pkg.description + "\n\n$0")
    .version(pkg.version, 'version')
    .describe('d', 'Directory')
    .alias('d', 'directory')
    .parse(argv);

let directory: string  = <string> args['d'];

fs.readdir(directory,function(err: string, files: string []){
    for(var file in files){
      debug(files[file]);

      var raml_path  = pathModule.join(directory,files[file]);

      if(pathModule.extname(raml_path)=='.raml'){
        console.log(pathModule.extname(raml_path));
        var api = ramlparser.loadApiSync(raml_path, args.include || [], { rejectOnErrors: true }).expand().toJSON();

        var responses = api.resources[0].methods[0].responses;
        for(var response in responses){
            var body = responses[response].body;
            for(var bodytype in body){
                var example: any = body[bodytype].example;
                if(example)
                  console.log(example);
                var examples: any = body[bodytype].examples;
                for(var ex in examples){
                  console.log(JSON.stringify(examples[ex],null,2));
                }
            }
        }
        debug("API Loaded and Expanded");
      }
    }

});
