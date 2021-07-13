module.exports = {
    name: 'dbconnection',
    async execute(isTesting) {
      var mysql=require('mysql');
      
      if (isTesting == true) {

        var connection=mysql.createConnection({
          host: "127.0.0.1", //process.env.DB_HOST
          user: "root",  //process.env.DB_USER
          password: "rooting", //process.env.DB_PASS
          database: require("../DB_URL") //process.env.DATABASE
      });

      connection.connect(function(error){
        if(!!error){
          console.log(error);
        }else{
          console.log('Connected!:)');
        }
      });
  
      return connection;

      } else{

        var connection=mysql.createConnection({
          host: process.env.db_host, //../DB_HOST  process.env.DB_HOST
          user: process.env.db_user,  //../DB_USER  process.env.DB_USER
          password: process.env.db_pass, //../DB_PASS  process.env.DB_PASS
          database: process.env.database //../DB_URL  process.env.DATABASE
      });
      
      connection.connect(function(error){
        if(!!error){
          console.log(error);
        }else{
          console.log('Connected!:)');
        }
      });
  
      return connection;

      }
    }
  }