/**
 * Node dependencies
 */
const path = require('path');
const { existsSync, mkdirSync } = require('fs');

/**
 * Test environment
 */
const OUTPUTDIR = './tmp';
const FILENAME = 'ga/google-analytics-local.js';
const tape = require('tape');
const { localga, ANALYTICS_FILE_NAME } = require('./');

/**
 * Init
 */
if (!existsSync(OUTPUTDIR)) {
	mkdirSync(OUTPUTDIR);
}

localga({
	id: 'UA-83446952-1',
	filename: FILENAME,
	outputdir: OUTPUTDIR,
}).then(() => {
	/**
	 * Test if a master file is created
	 */
	tape('Should have a master file', t => {
		const file = path.resolve(__dirname, path.join(OUTPUTDIR, FILENAME));
		const fileExists = existsSync(file);

		t.ok(fileExists, `${path.basename(FILENAME)} exists`);
		t.end();
	});

	/**
	 * Test if a helper file is created
	 */
	tape('Should have a helper file', t => {
		const file = path.resolve(__dirname, path.join(OUTPUTDIR, path.join(path.dirname(FILENAME), ANALYTICS_FILE_NAME)));
		const fileExists = existsSync(file);

		t.ok(fileExists, `${ANALYTICS_FILE_NAME} exists`);
		t.end();
	});
});
