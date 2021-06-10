
module.exports ={
    HOST: "ec2-23-20-124-77.compute-1.amazonaws.com", //antes: localhost
    USER:"jpkiutoahforpr", //antes "root"
    PASSWORD: "483ab95b7fe55d572db1649c128868302ff6b5b3c8175e9ce7b9c891e33172cd",    //"root"
    logging: true, //false
    DB: "d63uaj44tp8ddq", //antes: subastapp
    dialect: "postgres", //antes: mysql
    dialectOptions: {
      ssl: true
      },
    PORT: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };