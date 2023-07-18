import dynamic from 'next/dynamic'
import { HydrationProvider, Client } from 'react-hydration-provider';
import {useState,useEffect} from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { grap } from '../../interface/TableInterface';
 
// chart는 CSR에서 그려져야 함 그렇기 떄문에 SSR에서는 동작이 되면 안됨
// dynamic import로 렌더링 이후에 그래프를 가져옴 그래서 CSR에서 동작이 되는 원리
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

/*
 새로고침시 서버와 클라이언트에서 렌더링하는 시간이 달라서 react-hydration-error가 발생
 초기 렌더링 후 useEffect를 통해서 브라우저의 시간대로 바꾼다.
 이 방법은 첫번째 요청에만 허락해주고 새로고침 시에는 에러가 발생

 - react-hydration-provider 라이브러리를 사용해서 서버와 클라이언트에서 다른 콘텐츠를 쉽게 렌더링시켰다.
*/
function App({data}: {data: grap}){
  return(
    <HydrationProvider>
      <Client>
         <ChartPage data={data} />
      </Client>
    </HydrationProvider>
  )
}

const ChartPage =({data}: {data: grap}) => {
  // X축 데이터 Y축 데이터가 들어갈 변수
  const router = useRouter();
  const [XData, setXData] = useState([])
  const [YData, setYData] = useState([])

  const newTime = (item :number) =>{
    let date = new Date((item) * 1000)
      return `${date.getHours()}: ${date.getMinutes()}`
  }

  const newDay = (day: number) =>{
    let date = new Date((day) * 1000)
    return date
  }
  /**
   *  서버에서 오는 data 값이 바뀔 때 동작
   *  타임스탬프를 가시적으로 변경
   *  가격에 소수점 6자리에서 반올림
   */
  useEffect(()=>{
    setXData(data.history?.map((item) => newTime(item.timestamp)))
    setYData(data.history?.map((item) => Number(item.price).toFixed(2)))
  },[data])  
      return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', marginTop:'80px'}}>
          <div style={{display: 'flex' ,marginBottom:'10px'}}>
            <div>
              {
                router.query.img.toString().slice(-3) == 'svg' ||
                router.query.img.toString().slice(-3) == 'png' ||
                router.query.img.toString().slice(-3) == 'PNG' 
                ?
                <Image
                src = {`${router.query.img}`}
                alt='image'
                width={50}
                height={50}
                />
                :
                <Image
                src = {`${router.query.img}`}
                alt='image'
                width={50}
                height={50}
                />
              }
            </div>
            <div style={{width:'50%', paddingLeft:'10px'}}>
          <span style={{ fontWeight:'bold', fontSize:'2.2rem' , paddingRight:'5px'}}>{router.query.name}</span>
          <span style={{ fontWeight:'bold' }}>{Number(router.query.price).toFixed(2)}</span>
          <span style={{fontSize:'0.7rem',fontWeight:'bold'}}>USD</span>
          <p style={{color:'gray', fontSize:'0.6rem'}}>{`${newDay(data.history[0].timestamp)}`}</p>
            </div>
     
          </div>

          <div>
            {/**
             * 차트 그리는 컴포넌트 ApexChart 사이트가면 option 존재
             */}
          <ApexCharts
          options={{ //data on the x-axis
          chart: {
            type: 'line',
            stacked: false,
            zoom: {
              type: 'x',
              enabled: true,
              autoScaleYaxis: true
            },
            toolbar: {
              autoSelected: 'zoom'
            }
          },
          xaxis: {
          categories: XData.reverse(),
          tickAmount: 35 ,
          title: {
            text: 'Three-Hour-time Cycle '
          },
          labels:{
            hideOverlappingLabels: true
          }
          },
          stroke: {
            width: 3
          },
          title: {
            text: 'Stock Price Movement',
            align: 'left'
          },
          
          dataLabels: {
            enabled: false
          },
          markers:{
            size: 0,
          },
         
          yaxis: {
            title: {
              text: 'Price'
            },
          },
          
          }}
        series={[ //data on the y-axis
        {
          name: "coin price",
          data: YData,
          
        }
        ]}
        width="1300"
        height="550"
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
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
        'X-RapidAPI-Host': `${process.env.NEXT_PUBLIC_API_LINK}`
      }
    };
    const res = await fetch(`https://coinranking1.p.rapidapi.com/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=3h`, options)
    const result = await res.json()
    
    return{
        props:{
          data: result.data
        }
    }
}

export default App
