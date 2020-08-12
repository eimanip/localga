#!/usr/bin/env node

/**
 * External dependencies
 */
const meow = require('meow');

/**
 * Internal dependencies
 */
const localga = require('./');

/**
 * CLI settings
 */
const cli = meow(
	`
Options
  --id			Your Google Analytics ID
  --filename	File name of the gtag.js script file
  --outputdir	Output directory of where the files are created

Usage Examples
  $ localga --id UA-XXXXXXX-Y --file-name ./src/js/google-analytics-local.js --output-dir ./dist
`,
	{
		flags: {
			id: {
				type: 'string'
			},
			filename: {
				type: 'string',
				default: 'google-analytics-local.js'
			},
			outputdir: {
				type: 'string',
				default: './'
			},
		}
	}
);

localga(cli.flags);
