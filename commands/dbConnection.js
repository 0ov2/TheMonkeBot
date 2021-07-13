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
          host: require(process.env.DB_HOST), //../DB_HOST
          user: require(process.env.DB_USER),  //../DB_USER
          password: require(process.env.DB_PASS), //../DB_PASS
          database: require(process.env.DATABASE) //../DB_URL
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