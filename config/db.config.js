
module.exports ={
    HOST: "ec2-52-0-114-209.compute-1.amazonaws.com", //antes: localhost
    USER:"dybwkjkwmjemli", //antes "root"
    PASSWORD: "9b41420f0cff2dbae8937c081677cf7a5104e521e860d8ecfcaabdfd8e5e5bb4",    //"root"
    logging: true, //false
    DB: "d2ihqdtofehdjl", //antes: subastapp
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