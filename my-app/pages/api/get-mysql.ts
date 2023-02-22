const db  = require('../../db/database')
import type { NextApiRequest, NextApiResponse } from 'next'

export default function test(req:NextApiRequest , res: NextApiResponse){
    
    const search =`SELECT * FROM uuid` 

    db.query( search , function(err: string, result: {index: number; id: string}){
        if(err) {
            console.log(err)
        } else {
              if(result){
                  res.send(result);
              } else res.send(false)
         
        }
    })
}