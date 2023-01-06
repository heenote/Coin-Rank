import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Table } from "@nextui-org/react";
export default function Home({data}: any) {
  console.log(data)
  
  return (
    <div style={{}}>
      <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "80%",
      }}
    >
      <Table.Header>
        <Table.Column>Rank</Table.Column>
        <Table.Column> </Table.Column>
        <Table.Column>종목</Table.Column>
        <Table.Column>기호</Table.Column>
        <Table.Column>가격</Table.Column>
        <Table.Column>총 시가</Table.Column>
        <Table.Column>BTC가격</Table.Column>
        <Table.Column>변동(24h)</Table.Column>
      </Table.Header>
      <Table.Body>
        { data.map((item : any)=>{
          return(
        <Table.Row key={item.uuid}>
          <Table.Cell>{item.rank}</Table.Cell>
          <Table.Cell>
            <Image
             src ={`${item.iconUrl}`}
             alt='coinMark'
             height={30}
             width={30}
            />
              
          </Table.Cell>
          <Table.Cell>{item.name.toString()}</Table.Cell>
          <Table.Cell>{item.symbol.toString()}</Table.Cell>
          <Table.Cell>{item.price}</Table.Cell>
          <Table.Cell>{item.marketCap}</Table.Cell>
          <Table.Cell>{item.btcPrice}</Table.Cell>
          <Table.Cell>{item.change}%</Table.Cell>
        </Table.Row>
          )
        })
}
      </Table.Body>
    </Table>
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