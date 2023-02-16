import styles from '../../styles/Home.module.css'
import React, { useRef, useEffect } from 'react';
import Card from './intersetTable';
export default function Interest({ isOpen, setIsOpen, sqlData }: { isOpen: boolean; setIsOpen: any; sqlData: string[] }) {
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
 
  const handlerOutsie = (e: { target: any; }) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };
  return (
    <>
    <div id="sidebar" ref={outside} className={isOpen ? styles.sideWrapopen : styles.sideWrap}>
       <div className={styles.sideCloseBtn} onClick ={toggleSide}>
        X
       </div>
       <div>
         <Card sqlData = {sqlData}/>
       </div>
    </div>
    </>
  )
}

