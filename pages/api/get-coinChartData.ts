import type { NextApiRequest, NextApiResponse } from 'next'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.API_KEY,
		'X-RapidAPI-Host': process.env.API_LINK
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