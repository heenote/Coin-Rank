import styles from '../styles/Home.module.css'
import React, { useRef, useEffect ,useState} from 'react';
import {coinTable, global} from '../interface/TableInterface'
import Card from './intersetTable';
export default function Interest({ isOpen, setIsOpen, sqlData, tableData }: { isOpen: boolean; setIsOpen: any; sqlData: global[]; tableData: coinTable}) {
  const [ary, setAry] = useState([])
  const toggleSide = () =>{
    setIsOpen(false)
  }
  const outside = useRef<any>();
  useEffect(() => {
    document.addEventListener('mousedown', handlerOutsie);
    return () => {
      document.removeEventListener('mousedown', handlerOutsie);
    };
  });
 
  useEffect(()=>{
    const newArray = tableData.filter((item: coinTable)=> sqlData.some((i:global)=> i.id === item.uuid))
    // some()은 배열의 각 요소에 대해서 단 하나라도 조건을 만족하는 경우 true를 반환 
    setAry(newArray)
    console.log(ary)
  },[sqlData])

  // 관심종목 사이드바를 닫아주는 함수
  const handlerOutsie = (e: { target: any; }) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };
  return (
    <>
    <div id="sidebar" ref={outside} className={isOpen ? styles.sideWrapopen : styles.sideWrap}>
       
       <div style={{marginTop:'40px'}}>
        {
          ary.map((item)=>{
            return(
              <Card  key={item.uuid} ary = {item}/>
            )
          })
        }
       </div>
    </div>
    </>
  )
}

