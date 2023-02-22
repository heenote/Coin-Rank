import styles from '../styles/Home.module.css'
import img from '../public/CoinMain.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
export default function Home() {
  const router = useRouter();

  const ClickLogin = () => {
    router.push('./Login')
  }

  return (
    <>
        <div className={styles.section}>
        <Image  src={img} alt="img" fill />
          <div className={styles.main}>
            <h1 className={styles.subtexth1}><b>Coin API를 사용하여 100가지 코인을 보여줍니다.</b></h1>
            <span className={styles.subtextspan}>5분마다 갱신되며 로그인 후 관심종목을 추가할 수 있습니다.</span>
            <hr/>
            <div className={styles.btnmain}>
              <button className={styles.btn1} onClick={()=>{
                router.push('./coinTable')
              }}>거래소 이동</button>
              <button className={styles.btn2} onClick={ClickLogin}>로그인</button>  
            </div>
          </div>
        </div>
        

    </>
  );
}
