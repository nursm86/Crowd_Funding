const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='" +user.username+ "' and password='"+ user.password +"'";
		db.getResults(sql, function(results){
			//console.log(results.username);

			if(results.length >0 ){

				callback(results);
			}
			else{
			 	callback(results);
			 }
		});
	},
	getByIdCampaigns: function(id, callback){
		var sql = "select * from campaigns where id='"+id.c_id+"'";
		db.getResults(sql,function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from campaigns";
		db.getResults(sql,function(results){
			callback(results);
		});
	},
	insert: function(campaign, callback){
	var sql	="INSERT INTO campaigns(uid,target_fund,raised_fund, ctype,description,image,publisedDate,endDate,status,title) VALUES ('"+campaign.uid+"','"+campaign.target_fund+"','"+campaign.raised_fund+"','"+campaign.ctype+"','"+campaign.description+"','"+campaign.image+"','"+campaign.Publish_date+"','"+campaign.endDate+"','"+campaign.status+"','"+campaign.title+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});

		

	},
	insertReport: function(report, callback){
	var sql	="INSERT INTO reports(cid,uid,description,updatedDate) VALUES ('"+report.cid+"','"+report.uid+"','"+report.description+"','"+report.u_date+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});
	},

	insertContract: function(contract, callback){
	var sql	="INSERT INTO contactadmin(uid,description,UpdatedDate) VALUES ('"+contract.uid+"','"+contract.description+"','"+contract.u_date+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});
	},
	search: function(title, callback){

		var sql = "select * from campaigns where title like '%"+title.name+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},

	insertbookmarks: function(book, callback){
	var sql	="INSERT INTO bookmarks(cid,uid,UpdatedDate) VALUES ('"+book.cid+"','"+book.uid+"','"+book.u_date+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});
	},
	registration: function(user, callback){
	var sql	="INSERT INTO users(username,email,password,type,status) VALUES ('"+user.username+"','"+user.email+"','"+user.password+"','"+user.type+"','"+user.status+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});
	},
	getbyName: function(user,callback){
		var sql = "select * from users where username='" +user.username+ "' and password='"+ user.password +"'";
		db.getResults(sql,function(results){
			callback(results);
		});
	},
	update:function(user, callback){
		var sql="update campaigns set uid='"+user.uid+"', target_fund='"+user.target_fund+"', raised_fund='"+ user.raised_fund +"',ctype='"+ user.ctype +"',description='"+ user.description +"',image='"+ user.image +"',publisedDate='"+ user.Publish_date+ "',endDate='"+user.endDate+"',status='"+user.status+"',title='"+user.title+"' where id= '"+ user.c_id +"'  ";
		db.execute(sql,function(status){
				callback(status);
			
		});
	},
	delete: function(user, callback){
		var sql="delete from campaigns where id ='"+user.c_id+"' ";
			db.execute(sql,function(status){
				callback(status);
			
		});
	}
}