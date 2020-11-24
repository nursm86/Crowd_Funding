const db = require('./db');

module.exports = {

	history: function(campaign, callback){
		var sql = "select * from campaigns where uid = '"+campaign.id+"'";
		db.getResults(sql, function(results){
			console.log(campaign.id);
			callback(results);
		});
	},
	check: function(campaign, callback){
		var sql = "select * from bookmarks where cid = '"+campaign.id+"'";
		db.getResults(sql, function(results){
			if(results.length>0){
				callback(false);
			}else{
				callback(true);
			}
			
		});
	},
	checkgmail: function(campaign, callback){
		var sql = "select * from users where email = '"+campaign.email+"' or username = '"+campaign.username+"'";
		db.getResults(sql, function(results){
			if(results.length>0){
				callback(false);
			}else{
				callback(true);
			}
			
		});
	},

	checkcampaigns: function(campaign, callback){
		var sql = "select * from campaigns where title = '"+campaign.title+"'";
		db.getResults(sql, function(results){
			if(results.length>0){
				callback(false);
			}else{
				callback(true);
			}
			
		});
	},
	report: function(campaign, callback){
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours()+":" + today.getMinutes() + ":" +today.getSeconds();
		var dateTime = date+' '+time;
		console.log(dateTime);
		var sql = "insert into reports (cid, uid, description, updatedDate) values('"+campaign.id+"','"+campaign.uid+"', '"+campaign.description+"', '"+dateTime+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	bookmarks: function(campaign, callback){
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours()+":" + today.getMinutes() + ":" +today.getSeconds();
		var dateTime = date+' '+time;
		console.log(dateTime);
		var sql = "insert into bookmarks (cid, uid, updatedDate) values('"+campaign.id+"','"+campaign.uid+"', '"+dateTime+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
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
	validate: function(user, callback){
		var sql = "select * from users where username = '"+user.username+"' and password = '"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	getAll: function(callback){

		var sql = "select * from campaigns";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getAllBookmarks: function(callback){

		var sql = "select * from bookmarks";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	insert: function(campaign, callback){
		var raised_fund = 0;
		var image  = 0;
		var sql = "insert into campaigns (uid, target_fund, raised_fund, ctype, description, image, publisedDate, endDate, title) values('"+campaign.number+"','"+campaign.target_fund+"', '"+raised_fund+"', '"+campaign.campaigntype+"', '"+campaign.description+"', '"+image+"', '"+campaign.publishdDate+"', '"+campaign.enddate+"', '"+campaign.title+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertorganization: function(user, callback){
		var status = 0;
		var type = 2;
		var sql = "insert into users (username, email, password, status, type) values('"+user.username+"','"+user.email+"', '"+user.password+"', '"+status+"', '"+type+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(campaign, callback){
		var sql = "update campaigns set target_fund = '"+campaign.target_fund+"', raised_fund = '"+campaign.raisedfund+"', ctype = '"+campaign.campaigntype+"', description = '"+campaign.description+"', endDate = '"+campaign.enddate+"', title = '"+campaign.title+"'   where id = '"+campaign.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deletebookmarks: function(campaign, callback){
		var sql = "delete from bookmarks where id = '"+campaign.id+"'";
		console.log(campaign.id);
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(campaign, callback){
		var sql = "delete from campaigns where id = '"+campaign.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}

