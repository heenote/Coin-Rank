import dynamic from 'next/dynamic'
import axios from 'axios';
import styles from '../../styles/Home.module.css'
import {useState,useEffect} from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { grap } from '../../interface/TableInterface';

// chart는 CSR에서 그려져야 함 그렇기 떄문에 SSR에서는 동작이 되면 안됨
// dynamic import로 렌더링 이후에 그래프를 가져옴 그래서 CSR에서 동작이 되는 원리
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartPage =({data}: {data: grap}) => {
  // X축 데이터 Y축 데이터가 들어갈 변수
  const [XData, setXData] = useState([])
  const [YData, setYData] = useState([])
  const router = useRouter();
  /**
   *  서버에서 오는 data 값이 바뀔 때 동작
   *  타임스탬프를 가시적으로 변경
   *  가격에 소수점 6자리에서 반올림
   */
  console.log(data)
  useEffect(()=>{
    setXData(data.history?.map((item) => {
      let date = new Date((item.timestamp) * 1000)
      return `${date.getHours()}: ${date.getMinutes()}`
    }))
    setYData(data.history?.map((item) => Number(item.price).toFixed(6)))
  },[data])  

      return (
        <div>
          <div style={{display: 'flex' ,marginBottom:'10px'}}>
            <div>
              <Image
               src = {`${router.query.img}`}
               alt='image'
               width={30}
               height={30}
              />
            </div>
            <div style={{width:'20%'}}>
          <span style={{ fontWeight:'bold', fontSize:'1.2rem'}}>{router.query.name}</span>
            </div>
          <div style={{marginTop: '10px', display: 'flex', marginLeft: '30%'}}>
            <button className={styles.timeChageButton}>3h</button>
            <button className={styles.timeChageButton}>24h</button>
            <button className={styles.timeChageButton}>7D</button>   
            <button className={styles.ChageGrpButton}>CoinList</button>   
           </div>
          </div>
          <div>
            {/**
             * 차트 그리는 컴포넌트 ApexChart 사이트가면 option 존재
             */}
          <ApexCharts
          options={{ //data on the x-axis
          chart: { id: 'bar-chart'},
          xaxis: {
          categories: XData.reverse(),
          tickAmount: 30 ,
          labels:{
            hideOverlappingLabels: true
          }
          },
          theme:{
            mode: "dark"
          },
          colors:['#0fbcf9'],
          
          dataLabels: {
            enabled: false
          },
          markers:{
            size: 0,
          },
        
          fill:{
            type: 'gradient',
            gradient:{
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops:[0,100]
            }
          }
          
          }}
        series={[ //data on the y-axis
        {
          name: "coin price",
          data: YData,
          
        }
        ]}
        type="area"
        width="1300"
        height="450"
          />
          </div>
          </div>
      )
}


/**
 * 
 * @param param0 main page에서 router를 통해서 보내는 query 값 중의 uuid 
 * @returns api 함수를 호출하며 uuid를 파라미터로 전달
 */
export async function getServerSideProps({query}: any) {
    const {uuid} = query
    const res = await axios(`http://localhost:3000/api/get-coinChartData?uuid=${uuid}`,  {responseType: 'json'})
    const data = res.data.data
    return{
        props:{
          data,
        }
    }
}

export default ChartPage
