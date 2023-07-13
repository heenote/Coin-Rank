const db  = require('../../db/database')
import type { NextApiRequest, NextApiResponse } from 'next'
export default function test(req: NextApiRequest, res: NextApiResponse){
    const { data } = req.query;
    db.query( `INSERT INTO uuid (id) VALUES(?)`, [data], function(err: string){
        if(err) {
            db.query('DELETE FROM uuid WHERE id = ?',[data], function(err: string){
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
