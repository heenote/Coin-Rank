import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {coinTable} from '../interface/TableInterface'
export default function Card({ary}: {ary: coinTable}){
  const router = useRouter()
  const percentChange = (data: string) =>{
    if(data.toString().slice(0,1) === '-'){
      return styles.changeM
    } else return styles.changeP
}
    return(
        <>
        <div className="card" style={{marginBottom:'10px'}} onClick={()=>{
           router.push({
            pathname: `/coinChart/${ary.uuid}`,
            query:{
              uuid:ary.uuid,
              name: ary.name,
              img: ary.iconUrl,
              price: ary.price,
            }
          })
        }}>
       <div className="card-header">
        <b>{ary.name}</b>
       </div>
       <div className="card-body">
       <div style={{display: 'flex', padding: '10px'}}>
       <Image
             src ={`${ary.iconUrl}`}
             alt='coinMark'
             height={60}
             width={60}
            />
         <div style={{marginLeft: '40px'}}>
         <p className="card-text">가격: ${Number(ary.price).toFixed(2)} </p>
         <p className={percentChange(ary.change)}>변동: 
         { ary.change.toString().slice(0,1) === '-' ? 
         `${ary.change}%` : `+${ary.change}%` } </p>
         </div>
       </div>
       </div>
      </div>

        </>
    )
}