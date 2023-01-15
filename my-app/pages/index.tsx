import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

export default function Home({data}: any) {
  const [change, setChange] = useState(false)
  const [tableData, setTableData] = useState(data)
  const [value, setValue] = useState('')
  const [TimerM,setTimerM] = useState(4)
  const [TimerS,setTimerS] = useState(59)
  const router = useRouter();
  /**
   * setInterval로 인해서 5분 주기로 데이터가 바뀜 
   * 분이 0이 되고 초가 2가 되면 새로운 데이터를 받아옴
   * 받아서 setTableData에 넘기면 table이 리렌더링되면서
   * CRS 환경에서 데이터가 변하기 떄문에 업데이트된 값만 바뀐다 
   */
  useEffect(()=>{
     const load = setInterval(()=>{
      if(TimerS !== 0)
       setTimerS((previousCount) => previousCount - 1)
      else{
        setTimerM((previousCount) => previousCount - 1)
        setTimerS(59) 
      }
     },1000)
     return () =>{clearInterval(load)}
  },[TimerM, TimerS])

  if(TimerM === 0 && TimerS === 1){
    fetch(`http://localhost:3000/api/get-coindata`)  //5분 주기로 업데이트
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

  // 코인 검색
  const onSubmit = (e: { preventDefault: () => void; }) =>{
    e.preventDefault();
    const searchData  = data?.filter((item : any)=> item.name == value || item.symbol == value)
    console.log(searchData)
    if(searchData[0]){
      router.push({
        pathname: `/coinChart/${searchData[0].uuid}`,
        query:{ 
          uuid: searchData[0].uuid,
          name: searchData[0].name,
          img: searchData[0].iconUrl
        }
      })
    } else alert('존재하지 않습니다.')

  }

  // 변동률을 오름차순으로 정렬하는 함수
  const changeUpDown = () =>{
    setChange(!change)
    const newList = data?.sort((a: any,b: any) =>{
      if(change){
        return Number(a.change) < Number(b.change)  ? 1 : -1
      }else{
        return Number(a.rank) > Number(b.rank)  ? 1 : -1
      }
  }) 
    setTableData(newList)
    console.log(newList)
  }

  // 변화율의 앞자리를 확인해서 color를 바꾸어주는 함수
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
    <div>
      {/** 관심종목 파트 */}
    </div>

    <div >
      <div style={{display: 'flex', alignItems:'center'}}>
     <div style={{}}>
      <span style={{fontSize:'2rem', fontWeight:'bold', color:'darkblue'}} >COIN RANKING TOP100</span>
      <span style={{fontSize:'20px' ,marginLeft:'30px', fontWeight:'lighter'}}>
        { TimerS >= 10 ?
        `0${TimerM}:${TimerS}`:
        `0${TimerM}:0${TimerS}`
        }
        </span>
     </div>
     <div style={{marginLeft:'55%'}}>
     <form onSubmit={onSubmit}>
     <input 
      type='text'
      placeholder='코인검색 (명칭/기호)'
      onChange={(e)=> setValue(e.target.value)}
      value={value}
      />
      </form>
      </div>
      </div>
    </div>

    <div>
   
    <table className="table ">
    <thead className={styles.tableHead}>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col"></th>
      <th scope="col">종목</th>
      <th scope="col">기호</th>
      <th scope="col">가격</th>
      <th scope="col">총 시가</th>
      <th scope="col" >거래량(24h)</th>
      <th scope="col" onClick={changeUpDown} style={{cursor:'pointer'}}>변동(24h) </th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody style={{}}>
    {tableData.map((item : any, index: number)=>{
      return(
    <tr key={item.uuid} >
      <td scope="row" width={20} style={{fontWeight:'bold'}}>{index+1}</td>
      <td scope="row" width={20} >
         <Image
             src ={`${item.iconUrl}`}
             alt='coinMark'
             height={30}
             width={30}
            />
      </td>
      <td scope="row" className="col-sm-2" style={{fontWeight:'lighter', fontSize:'20px', color:`${item.color}`}}>{item.name}</td>
      <td scope="row" className={styles.symbol}>{item.symbol}</td>
      <td scope="row" className={styles.price}>${Number(item.price).toFixed(2)} </td>
      <td scope="row" className={styles.volume}>{item.marketCap / 10000000000}</td>
      <td scope="row" className={styles.volume}>{item['24hVolume']}</td>
      <td scope="row" className={percentChange(item.change)}> 
     { item.change.toString().slice(0,1) === '-' ? 
      `${item.change}%` : `+${item.change}%` } 
      </td>
      <td scope="row" >
      <div className={styles.star}>
      { 
      
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
      </svg>
      
      // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
      // <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      // </svg>
      }  
      </div>
      </td>
      <td scope="row" className={styles.symbol} style={{cursor:'pointer'}} onClick={()=>{
      router.push({
        pathname: `/coinChart/${item.uuid}`,
        query:{
          uuid:item.uuid,
          name: item.name,
          img: item.iconUrl
        }
      })
      
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart" viewBox="0 0 16 16">
       <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
</svg>
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

// 주기적으로 업데이트가 되어야 하기 때문에 getServerSideProps 사용 
export async function getServerSideProps(){
  const res = await axios(`http://localhost:3000/api/get-coindata`,  {responseType: 'json'})
  const data = res.data.data.coins
  return{
      props:{
        data,
      }
  }
}