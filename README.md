proreq
======

Namespacing organization library

Provides very simple and powerful API that allows to handle namespacing in your app.
Does not have any dependencies

Author
------
Pavlo Yuriychuk, 2012

API
------

##Proreq
Methods:
* `Require($path)` - obtain entity from global namespace by given path. Path is Java/ActionScript like package fully qualified name
* `Provide($path, $entity)` - put entity into the namespace by given path
* `Package($path)` - initiate package under given name, old entry will be deleted
* `isPackage($entity)` - check if given entity is package
* `fqn($entity)` - compose fully qualified name for given entity

In order to obtain global namespace use `require("")` call

##Stub

`p = new Stub('Person').`
`   method('say').`
`       when('hi').`
`           returns('Goedemorgen!')`
`       otherwise().`
`           returns('Mm-mm-m-mm').`
`       done();`

`p.iterator('i').`
`   always().`
`       yields(3).`
`   done();`

`p.say('hi');`
`p.say('dsdsdsdsd');`
`p.say();`

`p.i.next();// == 3`
`p.i.next();// == 3`


Acknowledgements
-----------------
Library was inspired by [Google Closure Library](https://developers.google.com/closure/library/) namespacing system and ActionScript

TODO:
-----
* Add strict path validation mode, not he path is handled as is
* Improve caching system
* Possibly Add OOP features (doubting)
