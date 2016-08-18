const JasperConnetor = require('./jasper-connector');
const fs = require('fs');

function myLog (fileName, data) {
	fs.writeFile(fileName, data, function (err) {
		if (err) throw err;		
	});
}

const serverConfig = {
	url:'http://172.16.20.14:8080',
	loginPath:'/jasperserver/rest/login',
	loginTimeOut:120, //seconds
	rootPathReports:'/jasperserver/rest_v2/reports/reports/',
	credentials:{user:"jasperadmin", pass:"jasperadmin"};
}

//let report = "samples/Department.pdf";
//let report = "cartaoconvenio/rel_cartoes_ativos.pdf";
let report = "credenciados/rel_ressarcimento.pdf";
let params = {cnpj:'13669692000107', lote:11424};

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