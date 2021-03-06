import { describe } from 'mocha';
import { expect } from 'chai';
import { parseDate, parseMethod, parseStatusCode } from './log.js';

describe('log.js', function() {
	it('should correctly parse dates', function() {
		const parsedDate = parseDate(new Date(1642659898791));
		expect(parsedDate).to.equal(' 2022/01/19 - 22:24:58 ');
	});

	it('should correctly parse methods', function() {
		expect(parseMethod('GET')).to.equal('\x1b[42m\x1b[37m GET     \x1b[0m');
		expect(parseMethod('POST')).to.equal('\x1b[44m\x1b[37m POST    \x1b[0m');
		expect(parseMethod('PUT')).to.equal('\x1b[46m\x1b[37m PUT     \x1b[0m');
		expect(parseMethod('PATCH')).to.equal('\x1b[45m\x1b[37m PATCH   \x1b[0m');
		expect(parseMethod('DELETE')).to.equal('\x1b[41m\x1b[37m DELETE  \x1b[0m');
		expect(parseMethod('HEAD')).to.equal('\x1b[47m\x1b[30m HEAD    \x1b[0m');
		expect(parseMethod('OPTIONS')).to.equal('\x1b[43m\x1b[30m OPTIONS \x1b[0m');
	});

	it('should correctly parse status codes', function() {
		expect(parseStatusCode(100)).to.equal('\x1b[44m\x1b[37m 100 \x1b[0m');
		expect(parseStatusCode(200)).to.equal('\x1b[42m\x1b[37m 200 \x1b[0m');
		expect(parseStatusCode(300)).to.equal('\x1b[45m\x1b[37m 300 \x1b[0m');
		expect(parseStatusCode(400)).to.equal('\x1b[43m\x1b[37m 400 \x1b[0m');
		expect(parseStatusCode(500)).to.equal('\x1b[41m\x1b[37m 500 \x1b[0m');
	});

	it('should not color invalid methods', function() {
		expect(parseMethod('BAZINGA')).to.equal(' BAZINGA \x1b[0m');
	});

	it('should not color invalid status codes', function() {
		expect(parseStatusCode(600)).to.equal(' 600 \x1b[0m');
	});

	it('should pad status codes shorter than 3 digits', function() {
		expect(parseStatusCode(69)).to.equal(' 69  \x1b[0m');
	})
});
