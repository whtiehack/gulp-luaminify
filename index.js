/**
 * Created by Administrator on 2016/4/5.
 */

var through = require('through2');
var gutil = require('gulp-util');
var luamin = require('luamin');
var Buffer = require('buffer').Buffer;

module.exports = function () {
	'use strict';

	return through.obj(function (file, encoding, callback) {
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-luaminify', 'Streaming not supported'));
			return callback();
		}

		try {
			file.contents = new Buffer(luamin.minify(file.contents.toString()).toString());
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-luaminify', err));
		}

		this.push(file);
		callback();
	});
};