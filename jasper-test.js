const JasperConnetor = require('./jasper-connector');
const fs = require('fs');

function myLog (fileName, data) {
	fs.writeFile(fileName, data, function (err) {
		if (err) throw err;		
	});
}

const serverConfig = {
	url:'http://127.0.0.1:8080',
	loginPath:'/jasperserver/rest/login',
	loginTimeOut:120, //seconds
	rootPathReports:'/jasperserver/rest_v2/reports/reports/',
	credentials:{user:"jasperadmin", pass:"jasperadmin"};
}

let report = "category/report_name.pdf";
let params = {cnpj:'00000000000000', lote:11424};

const 

const jasperConnector = new JasperConnetor(serverConfig);

jasperConnector.login()
.then( cookie => {
	console.log('Login Cookie', cookie);
	jasperConnector.getReport(report, params, fs.createWriteStream('./report_teste.pdf') )
})
.catch( err => {
	console.log('Login Error', err);
});