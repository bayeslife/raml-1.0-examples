# raml-1.0-examples
Examples in RAML 1.0

One deficit with Raml 0.8 has been the limitation of a single example for method request/response status code.

With Raml 1.0 there is more flexibility with multiple examples and support for annotations.

In this repository I explore the possibilities of Raml 1.0
and the parsing of such examples using the [RAML 1.0 Parser](https://github.com/raml-org/raml-js-parser-2).

A simple 0.8 RAML was created.
Then a 1.0 RAML was created.

A typescript application which reads both RAMLs was created and all the example or examples are logged with the purpose of seeing how examples are represented within javascript (json).

Then various examples were added to the RAML 1.0 example to understand the different options available for describing and annotating examples.

Specifically I was interested to be able to represent
- samples that conform to a schema
- samples with header values
- negative as well as positive examples
- xml as well as json examples
- annotating samples so that specific requests could be related to specific responses

## Listing examples in raml files

$ node dist/list.js -h
This package contains examples of raml 0.8 and 1.0 examples and a utility to
parse and list the examples

dist/list.js

Options:
  -h, --help       Show help                                           [boolean]
  --1.0.0          version                                             [boolean]
  -d, --directory  List examples from all RAML files in a directory
  -r, --file       List examples from a specific Raml file
