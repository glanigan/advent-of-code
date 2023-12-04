import { getInput } from "../../lib/getInput";

const lines = getInput(2023,4);

const result = lines.reduce((total,card)=>{
    const [winningNumbers,cardNumbers] = card.replace(/Card\s+\d+:/,'').replace(/\s\s/,' ').split('|').map(n=>n.trim().split(' '));
    
    const matchScore:number = cardNumbers?.reduce((matchScore,num)=>{
        if(!parseInt(num)) return matchScore;
        if(!winningNumbers?.includes(num)){
            return matchScore;
        }
        if(matchScore===0){ 
            return 1;
        }
        return matchScore*2;
    },0) ?? 0;

    return total+matchScore;
},0);

console.log(result);


//Part 2
let copies = lines.map(()=>1);

lines.forEach((card,cardIndex)=>{
    const [winningNumbers,cardNumbers] = card.replace(/Card\s+\d+:/,'').replace(/\s\s/,' ').split('|').map(n=>n.trim().split(' '));
    
    let matchScore = cardNumbers?.reduce((matchScore,num)=>{
        if(!parseInt(num)) return matchScore;
        if(!winningNumbers?.includes(num)){
            return matchScore;
        }
        return matchScore+1;
    },0);

    if(!matchScore)return;
    while(matchScore){
        matchScore--;
        const copyPosition = cardIndex + matchScore;
        // @ts-ignore
        copies[copyPosition] += copies[cardIndex];
    };
},0);

console.log(copies.reduce((t,v)=>t+v,0));