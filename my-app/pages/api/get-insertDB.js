import db from '../../db/database';

export default function test(req, res){
    
    const { data } = req.query;

    db.query( `INSERT INTO uuid (id) VALUES(?)` ,[data], function(err){
        if(err) {
            db.query('DELETE FROM uuid WHERE id = ?',[data], function(err){
                if(err){
                    console.log('DELETE error', err)
                }
                res.send('success')
            })
        } else {
                  res.send('success');
              } 
         
        }
    )
}