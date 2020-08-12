/**
 * External dependencies
 */
const request = require('request-promise-native');
const path = require('path');

/**
 * Internal dependencies
 */
const { writeFileSync, unlinkSync, existsSync, mkdirSync } = require('fs');

/**
 * Google analytics root url
 */
const GA_SCRIPT_URL = 'https://www.googletagmanager.com/gtag/js';

const ANALYTICS_FILE_NAME = 'analytics.js';
const ANALYTICS_SCRIPT_URL = `https://www.google-analytics.com/${ANALYTICS_FILE_NAME}`;

const saveFile = (file, data) => {
	if (existsSync(file)) {
		unlinkSync(file);
	}

	mkdirSync(path.dirname(file), {recursive: true});

	writeFileSync(file, data);
};

const saveAnalyticsFile = folder => {
	const file = path.join(folder, ANALYTICS_FILE_NAME);

	return request(ANALYTICS_SCRIPT_URL)
		.then(data => saveFile(file, data))
		.catch(console.error);
};

/**
 * Generate local version of google analytics script
 *
 * @param  {Object} options
 *
 * @return {Void}
 */
const localga = options => {
	const { id, filename, outputdir } = options;
	const filePath = path.join(outputdir, filename);

	if (!id) {
		throw new Error('No google analytics ID supplied.');
	}

	return request(`${GA_SCRIPT_URL}?id=${id}`)
		.then(async data => {
			data = data.replace(ANALYTICS_SCRIPT_URL, path.join(path.dirname(filename), ANALYTICS_FILE_NAME));

			saveFile(filePath, data);

			await saveAnalyticsFile(path.dirname(filePath));
		})
		.catch(console.error);
};

module.exports = localga;
module.exports.localga = localga;

module.exports.ANALYTICS_FILE_NAME = ANALYTICS_FILE_NAME;
