import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
export default function Home({data}: any) {
  const [value, setValue] = useState('')
  const [tableData, setTableData] = useState(data)
  const [TimerM,setTimerM] = useState(4)
  const [TimerS,setTimerS] = useState(59)
  // useEffect(()=>{
  //  if(TimerM === 0 && TimerS === 2){
  //    fetch(`http://localhost:3000/api/get-coindata`)  //5분 주기로 업데이트 되는 거같다
  //    .then(res => res.json())
  //    .then(data =>{ 
  //      setTableData(data.data.coins) 
  //      console.log(data.data.coins)
  //      setTimerM(4)
  //     })
  //     .catch((err: { toString: () => any })=>{
  //       console.log(err.toString()) 
  //     })
  //   }
    
  // },[TimerM,TimerS])
  
  // 5분 타이머
  useEffect(()=>{
     const load = setInterval(()=>{
      if(TimerS !== 0)
       setTimerS((previousCount) => previousCount - 1)
      else{
        setTimerM((previousCount) => previousCount - 1)
        setTimerS(59) 
      }

      if(TimerM === 0 && TimerS === 2){
        fetch(`http://localhost:3000/api/get-coindata`)  //5분 주기로 업데이트 되는 거같다
        .then(res => res.json())
        .then(data =>{ 
          setTableData(data.data.coins) 
          console.log(data.data.coins)
          setTimerM(5)
         })
         .catch((err: { toString: () => any })=>{
           console.log(err.toString()) 
         })
       }

     },1000)
     return () =>{clearInterval(load)}
  },[TimerM, TimerS])

  const percentChange = (data: string) =>{
      if(data.toString().slice(0,1) === '-'){
        return styles.changeM
      } else return styles.changeP
  }

  return (
<div className={styles.main}>
    <Head>
        <title>Coin Rank</title>
    </Head>
    <div >
      <div style={{display: 'flex', alignItems:'center'}}>
     <div>
      <span style={{fontSize:'2rem', fontWeight:'bold', color:'darkblue'}} >COIN RANKING TOP100</span>
      <span style={{fontSize:'20px' ,marginLeft:'30px', fontWeight:'lighter'}}>
        { TimerS >= 10 ?
        `0${TimerM}:${TimerS}`:
        `0${TimerM}:0${TimerS}`
        }
        </span>
     </div>
     <div style={{marginLeft:'55%'}}>
      <input 
      type='text'
      placeholder='Search'
      onChange={(e)=> setValue(e.target.value)}
      value={value}
      />
      </div>
      </div>
    </div>

    <div>
   
    <table className="table table-hover">
    <thead className={styles.tableHead}>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col"></th>
      <th scope="col">종목</th>
      <th scope="col">기호</th>
      <th scope="col">가격</th>
      <th scope="col">총 시가</th>
      <th scope="col">거래량(24h)</th>
      <th scope="col">변동(24h)</th>
    </tr>
  </thead>
  <tbody style={{}}>
    {tableData.map((item : any)=>{
      return(
    <tr key={item.uuid}>
      <td scope="row" width={20} style={{fontWeight:'bold'}}>{item.rank}</td>
      <td scope="row" width={20} >
         <Image
             src ={`${item.iconUrl}`}
             alt='coinMark'
             height={30}
             width={30}
            />
      </td>
      <td scope="row" className="col-sm-2" style={{fontWeight:'lighter', fontSize:'20px'}}>{item.name}</td>
      <td scope="row" className={styles.symbol}>{item.symbol}</td>
      <td scope="row" className={styles.price}>${Number(item.price).toFixed(2)} </td>
      <td scope="row" className={styles.volume}>{item.marketCap / 10000000000}</td>
      <td scope="row" className={styles.volume}>{item['24hVolume'] / 10000000000}</td>
      <td scope="row" className={percentChange(item.change)}> 
     { item.change.toString().slice(0,1) === '-' ? 
      `${item.change}%` : `+${item.change}%` }
      </td>
    </tr>

      )
    })}

  </tbody>
    </table>
    </div>
  </div>
  )
}

export async function getServerSideProps(){
  const res = await axios(`http://localhost:3000/api/get-coindata`,  {responseType: 'json'})
  const data = res.data.data.coins
  return{
      props:{
        data,
      }
  }
}