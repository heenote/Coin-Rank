import db from '../../db/database';

export default function test(req, res){
    
    const search =`SELECT * FROM uuid` 

    db.query( search , function(err,result){
        if(err) {
            console.log(err)
        } else {
              if(result){
                  res.send(result);
              } else res.send(false)
         
        }
    })
}