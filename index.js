'use strict';

const request = require( 'request' );

class JasperConnetor {

	constructor( serverConfig ) {
		this.serverConfig = serverConfig;
		this.credentials = serverConfig.credentials;
		this.loginPath = this.serverConfig.url + this.serverConfig.loginPath;
		this.reportsPath = this.serverConfig.url + this.serverConfig.rootPathReports;
		this.lastLogin;
		this.cookie;
	}

	login() {
		let isCookieValid = false;

		if ( this.lastLogin ) {
			let now = new Date();
			let diff = Math.ceil( ( now.getTime() - this.lastLogin.getTime() ) / 1000 );
			console.log( diff );
			isCookieValid = diff < this.serverConfig.loginTimeOut ? true : false; // If the difference between date1 and date2 is 2 minuts
		}

		return new Promise( ( resolve, reject ) => {
			let options = {
				url: this.loginPath,
				method: 'post',
				Accept: 'application/json',
				form: {
					j_username: this.credentials.user,
					j_password: this.credentials.pass
				}
			};
			if ( !isCookieValid ) {
				request( options, ( err, resp, body ) => {
					if ( err ) {
						reject( err );
					}else{
						this.cookie = resp.headers[ 'set-cookie' ];
						this.lastLogin = new Date();
						resolve( this.cookie );
					}
					
				} );
			} else {
				this.lastLogin = new Date();
				resolve( this.cookie );
			}
		} );
	}

	getReport( reportName, params = null, streamWritable ) {
		let fullPath = this.reportsPath + reportName;
		console.log(fullPath);
		let options = {
			url: fullPath,
			headers: {
				Accept: 'application/json',
				'Cookie': this.cookie
			},
			qs:params			
		};

		request( options )
			.on( 'response', function( resp ) {
				console.log( 'RESP', resp.statusCode );
			} )
			.pipe( streamWritable );
	}
}

module.exports = JasperConnetor;