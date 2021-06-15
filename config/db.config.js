

const prod ={
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
}

const test = {
    HOST: "ec2-54-158-232-223.compute-1.amazonaws.com", //antes: localhost
    USER:"blddtzpvlqwprp", //antes "root"
    PASSWORD: "a89aef3138dcbe3cd599f0b5c2483c5adc98b25451c12ab889e443932417d7b8",    //"root"
    logging: true, //false
    DB: "dfdj41tecgciji", //antes: subastapp
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
    }


module.exports= test