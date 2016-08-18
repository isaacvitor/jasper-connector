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
}

//var report = "samples/Department.pdf";
//let report = "cartaoconvenio/rel_cartoes_ativos.pdf";
let report = "credenciados/rel_ressarcimento.pdf";
let params = {cnpj:'13669692000107', lote:11424};
/*parameters:{
				 "reportParameter":[
						 {"name":"cnpj","value":["13669692000107"]},
						 {"name":"lote","value":[11424]}
					]
			}*/
const credentials = {user:"jasperadmin", pass:"jasperadmin"};

const jasperConnector = new JasperConnetor(serverConfig, credentials);

jasperConnector.login()
.then( cookie => {
	console.log('Login Cookie', cookie);
	jasperConnector.getReport(report, params, fs.createWriteStream('./reports/teste01.pdf') )
})
.catch( err => {
	console.log('Login Error', err);
});


 /*


http.createServer(function(req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query);
	
	reportBridge.login()
	.then( () => reportBridge.getReport(report, null, res) )
	//.then( () => reportBridge.getReport('interactive/CustomersReport.pdf', null, res) )
	.catch( (err) => console.log("Error", err) );


	/*
		.getReport('samples/StandardChartsAegeanReport.pdf')
		.then(res)
	*/
	/*
		rb.getReport('samples/StandardChartsAegeanReport.pdf', res)
		.then(function(data) {
			console.log("DONE");
			//res.write();
			//res.end();
		})
	*/

	
		//res.write(err);
		//res.end();
	
/*})
.listen(3000);*/