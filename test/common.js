var moment = require( 'moment' )
  , chai = require( 'chai' );

moment.suppressDeprecationWarnings = true;

chai.use( require( 'sinon-chai') );
chai.config.includeStack = true;

global.should = chai.should();
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;