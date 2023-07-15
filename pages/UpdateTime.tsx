import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {coinTableData} from '../interface/atom'
import { useSetRecoilState} from 'recoil'
import { coinTable } from '../interface/TableInterface'
export const UpdateTime = ({data} : {data: coinTable}) => {
    const setList = useSetRecoilState(coinTableData) //
    const [TimerM,setTimerM] = useState<number>(4) //
    const [TimerS,setTimerS] = useState<number>(59) // 
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
     setList(data.data.coins) 
     setTimerM(5)
    })
    .catch((err: { toString: () => string })=>{
      console.log(err.toString()) 
     })
   }

  useEffect(()=>{
    setList(data)   
  },[]) 
  return (
    <div >
      <span style={{fontSize:'1.5rem', fontWeight:'bold', color:'darkblue'}} >COIN RANKING TOP100</span>
      <span style={{fontSize:'20px' ,marginLeft:'30px', fontWeight:'lighter', width:'20%'}}>
        { TimerS >= 10 ?
        `0${TimerM}:${TimerS}`:
        `0${TimerM}:0${TimerS}`
        }
        </span>
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
