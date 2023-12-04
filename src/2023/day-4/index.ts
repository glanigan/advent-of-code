import { getInput } from "../../lib/getInput";

const lines = getInput(2023,4);

const result = lines.reduce((total,line)=>{
    const [winningNumbers,cardNumbers] = line.replace(/Card\s+\d+:/,'').replace(/\s\s/,' ').split('|').map(n=>n.trim().split(' '));
    
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