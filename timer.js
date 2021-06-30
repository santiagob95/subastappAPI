var later = require('later');
const { pujas } = require('./models/index');
const db = require("./models/index");
const puja = db.pujas
// later.date.localTime();

var later = require('later'),
     sched = later.parse.recur().every(3).second(),
      t = later.setInterval(test,sched);

function diff_hours(dt2, dt1) 
{
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}
function test(){
  pujas.findAll({
      where:{},
      limit:1,
      order: [[ 'createdAt','DESC']]

  }).then(puja=>{
      //puja[0].dataValues.createdAt
      console.log("la ultima puja fue el "+puja[0].dataValues.createdAt )
      
  })



  if(false){ //Condicion de cierre. Sin esto sigue infinitamente. ¿Que pare al no quedar subastas disponibles?
    t.clear()
    console.log("fin!")
  }
}

