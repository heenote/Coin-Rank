import type { NextApiRequest, NextApiResponse } from 'next'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ffce325afdmsh9e248ab07376ee9p1a9a7bjsn226c76f00513',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {uuid} = req.query
   return new Promise<void>((resolve, rejects)=>{
    fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=3h`, options)
       .then(res => res.json())
       .then(data => { res.json(data)
        resolve();
    })
       .catch(err =>{
           console.error('error:' + err)
           resolve() 
       } 
       )
   })

    }