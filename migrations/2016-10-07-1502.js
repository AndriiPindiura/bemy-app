'use strict';

exports.up = function (next) {
	console.log('    --> This is migration 2016-10-07-1502.js being applied');
	next();
};


exports.down = function (next) {
	console.log('    --> This is migration 2016-10-07-1502.js being rollbacked');
	next();
};
