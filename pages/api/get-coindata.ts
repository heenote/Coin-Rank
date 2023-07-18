import type { NextApiRequest, NextApiResponse } from 'next'

const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=100&offset=0';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    'X-RapidAPI-Host': `${process.env.NEXT_PUBLIC_API_LINK}`
  }
};
export default async function handler(req: NextApiRequest, res: NextApiResponse){
   return new Promise<void>((resolve, rejects)=>{
       
    fetch(url, options)
       .then(res => res.json())
       .then(data => { res.json(data)
        resolve();
    })
       .catch(err =>{
           console.error('error:' + err)
           res.json('error')
           resolve() 
       } 
       )
   })

    }