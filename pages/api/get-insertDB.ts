const db  = require('../../db/database')
import type { NextApiRequest, NextApiResponse } from 'next'
export default function test(req: NextApiRequest, res: NextApiResponse){
    const { data } = req.query;
    // data 값이 DB에 없으면 추가
    db.query( `INSERT INTO uuid (id) VALUES(?)`, [data], function(err: string){
        // id colum에 unique index를 줘서 중복값이 되면 에러가 발생하게 구현
        if(err) {
            // data 값이 DB에 있으면 삭제
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
