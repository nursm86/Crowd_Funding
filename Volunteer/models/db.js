const mysql 	= require('mysql');

var getConnection = function(callback){
	var connection = mysql.createConnection({
		  host     : '127.0.0.1',
		  database : 'crowd_funding',
		  user     : 'root',
		  password : ''
		});
	 
	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }
	  console.log('connected as id ' + connection.threadId);

	});

	callback(connection);

}

module.exports = {
	getResults: function (sql,callback){
		
		getConnection(function(connection){

		//	if(params != null){
				connection.query(sql, function (error, results) {
					//alert('params not null');
					
					callback(results);
				});
				
				connection.end(function(err) {
				  console.log('connection end...1');
				});

		//	}else{
		/*		connection.query(sql, function (error, results) {
					callback(results);
				});
				
				connection.end(function(err) {
				  console.log('connection end...2');
				}); */
			//}
		});

	},
	// execute: function (sql, params, callback){
	// 	getConnection(function(connection){
	// 		console.log(sql);
	// 	//	if(params != null){
	// 			connection.query(sql, [params], function (error, status) {
	// 				if(status){
	// 					callback(true);
	// 				}else{
	// 					callback(false);
	// 				}
	// 			});
				
	// 			connection.end(function(err) {
	// 			  console.log('connection end...3');
	// 			});
	// 	//	}else{
	// 			// connection.query(sql, function (error, status) {
	// 			// 	if(status){
	// 			// 		callback(true);
	// 			// 	}else{
	// 			// 		callback(false);
	// 			// 	}
	// 			// });
				
	// 			// connection.end(function(err) {
	// 			//   console.log('connection end...4');
	// 			// });
	// 	//	}
		
	// 	});
	// }
		execute: function (sql, callback){
		getConnection(function(connection){
			//console.log(sql);
		//	if(params != null){
				connection.query(sql,function (error, status) {
					console.log(error);
					if(status){
						callback(true);
					}else{
						callback(false);
					}
				});
				
				connection.end(function(err) {
				  console.log('connection end...3');
				});
		//	}else{
				// connection.query(sql, function (error, status) {
				// 	if(status){
				// 		callback(true);
				// 	}else{
				// 		callback(false);
				// 	}
				// });
				
				// connection.end(function(err) {
				//   console.log('connection end...4');
				// });
		//	}
		
		});
	}
}




