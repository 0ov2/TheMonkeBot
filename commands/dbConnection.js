module.exports = {
    name: 'dbconnection',
    async execute(isTesting) {
      var mysql=require('mysql');
      require('dotenv').config();
      
      if (isTesting == 'true') {

        var connection=mysql.createConnection({
          host: process.env.DB_HOST, //process.env.DB_HOST
          user: process.env.DB_USER,  //process.env.DB_USER
          password: process.env.DB_PASS, //process.env.DB_PASS
          database: process.env.DATABASE //process.env.DATABASE
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