#!/usr/bin/env node
'use strict';

var spawn = require( 'child_process' ).spawn
  , path = require( 'path' );

if ( module === require.main ) {
  var args = process.argv.slice( 2 )
    , type = args.shift();

  process.env.NODE_ENV = process.env.NODE_ENV || 'test';

  switch( type ) {
    case 'unit':
      mocha( 'unit.*.js', args );
      break;
    case 'integration':
    case 'int':
      mocha( 'int.*.js', args );
      break;
    case 'single':
    case 'one':
    case 'only':
    case 'grep':
      var glob = args.shift();
      mocha( '*.js', args, glob );
      break;
    default:
      mocha( '*.js' );
      break;
  }
}

function mocha( glob, args, grep ) {
  var basePath = path.resolve( __dirname )
    , mochaPath = path.resolve( basePath, '..', 'node_modules', '.bin', 'mocha')
    , opts = [
      path.join( basePath, glob ),
      '--require', path.join( basePath, 'common.js' ),
      '--reporter', 'nyan', //'spec',
      '--ui', 'bdd',
    ];

  if( args ) {
    opts = opts.concat( args );
  }
  if( grep ) {
    opts.push( '--grep', grep );
  }

  var child = spawn( mochaPath, opts, { stdio: 'inherit' });
  child.on( 'exit', function( code, signal ) {
    // code should be 0 and signal should null (instead of a string)
    var failing = ( code !== 0 || signal );
    process.exit( (failing ? 1 : 0) );
  });
}
