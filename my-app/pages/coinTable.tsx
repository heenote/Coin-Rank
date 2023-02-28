import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import {useEffect, useState, useCallback} from 'react'
import { useRouter } from 'next/router'
import {AiTwotoneStar} from 'react-icons/ai'
import {Data} from '../interface/atom'
import {useRecoilState} from 'recoil'
import {coinTable, global} from '../interface/TableInterface'
import Interest from '../InterestItem/Interest'

export default function Home({data} : {data: coinTable}) {
  const [change, setChange] = useState<boolean>(false)
  const [itemCoin, setItem] = useState([])
  const [tableData, setTableData] = useState<coinTable>(data)
  const [value, setValue] = useState<string>('')
  const [TimerM,setTimerM] = useState<number>(4)
  const [TimerS,setTimerS] = useState<number>(59)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [sqlData, setSqlData] = useRecoilState<global[]>(Data)
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

  if(TimerM === 0 && TimerS === 2){
    fetch(`http://localhost:3000/api/get-coindata`)  //5분 주기로 업데이트
    .then(res => res.json())
    .then(data =>{ 
      setTableData(data.data.coins) 
      setTimerM(5)
     })
     .catch((err: { toString: () => string })=>{
       console.log(err.toString()) 
      })
    }

  // 코인 검색
  const onSubmit = (e: { preventDefault: () => void; }) =>{
    e.preventDefault();
    const searchData  = data?.filter((item : coinTable)=> item.name == value || item.symbol == value)
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
    const newList = data?.sort((a: { change: string; rank: number },b: { change: string; rank: number }) =>{
      if(change){
        return Number(a.change) < Number(b.change)  ? 1 : -1
      }else{
        return Number(a.rank) > Number(b.rank)  ? 1 : -1
      }
  }) 
    setTableData(newList)
  }

  // 변화율의 앞자리를 확인해서 color를 바꾸어주는 함수
  const percentChange = (data: string) =>{
      if(data.toString().slice(0,1) === '-'){
        return styles.changeM
      } else return styles.changeP
  }

  // DB에서 받아온 요쇼로 Staricon의 색을 변경하는 함수
  const changeiconColor = useCallback( (id: string) =>{
     const iconColor = sqlData.filter((item :global) => item.id === id)
     if(iconColor.length === 0){
      return styles.star
     } else return styles.star2
  } ,[sqlData])
  
  // itemCoin 배열의 요소가 변경될 때마다 실행
  useEffect(()=>{
    async function fetchDB(){
    await fetch(`http://localhost:3000/api/get-mysql`)
      .then(res => res.json())
      .then(data2 =>{
        setSqlData(data2)
      } )
    }
    fetchDB()
  },[itemCoin])

  // 파라미터를 DB에 INSERT하는 함수
  const sql = (data: String) =>{
    fetch(`http://localhost:3000/api/get-insertDB?data=${data}`)
    .then(res => res.json())
  }

  // 햄버거 버튼 오픈 함수
  const toggleSide = () =>{
    setIsOpen(true)
  }

  return (
<div className={styles.coinmain}>
    <Head>
        <title>Coin Rank</title>
    </Head>
    
    {/** 헤더 & 변경시간*/}
    <div >
      <div style={{display: 'flex', flexDirection:'row' ,alignItems:'center'}}>
     <div >
      <span style={{fontSize:'1.5rem', fontWeight:'bold', color:'darkblue'}} >COIN RANKING TOP100</span>
      <span style={{fontSize:'20px' ,marginLeft:'30px', fontWeight:'lighter', width:'20%'}}>
        { TimerS >= 10 ?
        `0${TimerM}:${TimerS}`:
        `0${TimerM}:0${TimerS}`
        }
        </span>

     {/* 검색기능*/}
     </div>
     <div style={{marginLeft:'60%'}}>
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
   
    {/*코인 테이블 */}
    <table className="table ">
    <thead className={styles.tableHead}>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col"></th>
      <th scope="col">종목</th>
      <th scope="col">기호</th>
      <th scope="col">가격</th>
      <th scope="col">총 시가</th>
      <th scope="col">거래량(24h)</th>
      <th scope="col"  onClick={changeUpDown} style={{cursor:'pointer'}}>변동(24h) </th>
      <th colSpan ="2" onClick={toggleSide} style={{cursor:'pointer'}}>
    {/* 관심종목 */}
       <button className={styles.intersBtn}>관심종목</button>
      { 
        <Interest isOpen={isOpen} setIsOpen = {setIsOpen} sqlData = {sqlData} tableData = {tableData}/>
      }</th>
      <th></th>
      </tr>
      </thead>
     <tbody >
    {tableData.map((item : coinTable, index: number)=>{
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
      <td scope="row" className={styles.volume}>{ Number(item.marketCap) / 10000000000}</td>
      <td scope="row" className={styles.volume}>{item['24hVolume']}</td>
      <td scope="row" className={percentChange(item.change)}> 
     { item.change.toString().slice(0,1) === '-' ? 
      `${item.change}%` : `+${item.change}%` } 
      </td>
      
      {/* 관심아이콘 */}
      <td scope="row" >
      <div>
      <AiTwotoneStar 
      size={18}
      key={item.uuid}
      className={changeiconColor(item.uuid)}
      onClick={()=>{
        const select = tableData.filter((data: coinTable) => data.uuid === item.uuid)
        setItem(
          [select, ...itemCoin]
          )
          sql(select[0].uuid) 
        }}
      />
      </div>
      
      </td>
      { /* 그래프 */}
      <td scope="row" className={styles.grp} onClick={()=>{
      router.push({
        pathname: `/coinChart/${item.uuid}`,
        query:{
          uuid:item.uuid,
          name: item.name,
          img: item.iconUrl,
          price: item.price,
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