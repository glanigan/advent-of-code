import { getInput } from "../../lib/getInput";

const lines = getInput(2023,3);

function checkForSymbol(char: string){
    return ['?','*','$','+','@','%','/','=','&','-','#'].includes(char);
}

const result = lines.reduce((total, line,lineIndex)=>{
    console.log('----NEW LINE-----')
    function findNextNumber(line:string, lineIndex:number, currentPosition:number){
     
        const sub = line.substring(currentPosition);
        const subDigI = sub.search(/\d+/g);
        const hasNumber = subDigI !== -1;
        const numberIndex = subDigI+currentPosition;

        if(!hasNumber){
            console.log('   No more numbers');
            return;
        }
        
        const nonDig = line.substring(numberIndex).search(/\D/);
        const hasNonDigit = nonDig!==-1;
        const nonDigI = numberIndex+nonDig;
        
        const value = line.substring(numberIndex,hasNonDigit ? nonDigI: undefined);
        const valueEndI = hasNonDigit ? nonDigI : numberIndex+value.length;

        if(!parseInt(value)){
            console.log('Invalid');
            return;
        }

        let match = false;
        //check before
        if(numberIndex>0 && checkForSymbol(line.charAt(numberIndex-1))){
            console.log('before')
            match=true;
        }
        //check after
        if(hasNonDigit && checkForSymbol(line.charAt(nonDigI))){
            match=true;
        }
        //check above
        if(lineIndex>0){
            const aboveLine = lines[lineIndex-1] ?? '';
            const first = numberIndex===0 ? 0 : numberIndex-1;
            const second = valueEndI+1>aboveLine.length ? valueEndI : valueEndI+1;
            const aboveMatch = aboveLine.substring(first,second).split('').some(v=>checkForSymbol(v));
            if(aboveMatch){
                match=true
            }
        }
        //check below
        if(lineIndex<lines.length-1){
            const belowLine = lines[lineIndex+1] ?? '';
            const first = numberIndex===0 ? 0 : numberIndex-1;
            const second = valueEndI+1 > belowLine.length ? valueEndI : valueEndI+1;
            const belowMatch = belowLine.substring(first,second).split('').some(v=>checkForSymbol(v));
            if(belowMatch){
                match=true
            }
        }

        if(match){
            console.log(`Match:${value}`)
            total+=parseInt(value);
        }else{
            console.log(`No Match:${value}`)
        }

        if(hasNonDigit && nonDigI<line.length){
            console.log('.......GOING DEEPER', value, nonDigI)
            return findNextNumber(line,lineIndex,nonDigI);
        }

        return;
    }
    findNextNumber(line,lineIndex,0);
    
    return total;
},0);

console.log(result)