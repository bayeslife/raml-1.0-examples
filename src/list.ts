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
    .help('h')
    .alias('h','help')
    .version(pkg.version, 'version')
    .describe('d', 'List examples from all RAML files in a directory')
    .alias('d', 'directory')
    .describe('r', 'List examples from a specific Raml file')
    .alias('r', 'file')
    .parse(argv);

let raml_file: string  = <string> args['r'];

if(raml_file){
  load_raml(raml_file)
}else{
  let directory: string  = <string> args['d'];
  fs.readdir(directory,function(err: string, files: string []){
      for(var file in files){

          var raml_path  = pathModule.join(directory,files[file]);
          if(pathModule.extname(raml_path)=='.raml'){
            load_raml(raml_path);
          }
        }
  });
}

function load_raml(raml_path: string){
    debug("Loading Raml:"+ raml_path);
    //console.log(pathModule.extname(raml_path));
    var raml = ramlparser.loadApiSync(raml_path, args.include || [], { rejectOnErrors: true });

    let api: any=null;
    if(raml)
     api = raml.expand().toJSON();
    //console.log(api);
     if(api){
       logexample_resources(api.resources);
      }
    debug("API Loaded and Expanded");
}

function logexample_resources(resources : any[]){
  if(resources){
    for(var resource  of resources){
      logexample_resource(resource);
      var rs  = resource.resources ;
      logexample_resources(rs);
    }
  }
}

function logexample_resource(resource: any){
  if(!resource)
    return;
  var methods = resource.methods;
  if(methods){
     let responses : any[] = methods[0].responses;
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
   }
}
