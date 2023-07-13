const db  = require('../../db/database')
import type { NextApiRequest, NextApiResponse } from 'next'
export default function test(req: NextApiRequest, res: NextApiResponse){
    const { data } = req.query;
    console.log(data)
    // db.query( `INSERT INTO uuid (id, pass, userName) VALUES(${data})`, function(err: string){
    //     if(err) {
          
    //     } else {
    //               res.send('success');
    //           } 
         
    //     }
    // )
}
