export interface coinTable{
    [x: string]: any; // 여러 속성 정보를 받을 떄 사용
    btcPrice:  string;
    change: string;
    coinrankingUrl: string; 
    color: string ;
    iconUrl: string; 
    listedAt: number; 
    lowVolume: boolean;
    marketCap: string ;
    name: string ;
    price: string ;
    rank: number;
    symbol: string;
    tier: number
    uuid: string
} 

export interface global{
    [x: string] : any;
    index?: number;
    id?:string
}

export interface grap{
    change: string;
    history: [
        {price:string, timestamp: number}
    ]
}