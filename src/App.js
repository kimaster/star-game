import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function NumberPlay(props){
return(
      <button className="number" 
            style={{
              backgroundColor:colors[props.status]
            }}
            key={props.number} 
            onClick={()=>console.log('num',props.number)} >
                {props.number}
      </button>
  )
}

function StartsDisplay(props){
  return(
      <>
      {
        utils.range(1,props.count)
              .map(starId=><div key={starId} className='star'></div>
          )
      }      
      </>
    )

  }

  

function StarMatch(){
//  const stars=utils.random(1,9);
 
  const [stars,setstars]= useState(utils.random(1,9));
  const [availableNums,setavailableNums]= useState([1,2,3,4,5]);
  const [candidateNums,setcandidateNums]= useState([2,3]);

  const candidateAreWrong=     utils.sum(candidateNums)>stars;
  const numberStatus=(number)=>{

    if (!availableNums.includes(number)){
      return 'used'
    }
    if(candidateNums.includes(number)){

     return candidateAreWrong? 'wrong' : 'candidate'
    }

    return 'available'

  }



   return(<div className='game'>
      <div className='help"'>
        Please pick 1 or more numbers that sum the number of stars
      </div>
      <div className='game-board'>
        <div className='stars-container'>
        <StartsDisplay count={stars}/>
        </div>
        <div className='nums-container'>
        {
          utils.range(1,9).map(
            Number=><NumberPlay
           status={numberStatus(Number)}
            number={Number} />
            )
 
        }  
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>)
}

const colors={
available:'gray',
used:'lightgreen',
wrong:'lightred',
candidate:'brown'

}

const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};
const helper={

}
function App() {
  return (
     <StarMatch/>
  );
}

export default App;
