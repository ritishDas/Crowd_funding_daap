import {useState,useContext} from 'react';
import {CrowdfundingContext} from '../context/ether';

export default function(props){
  const fun=useContext(CrowdfundingContext);

  const [donate,setDonate]=useState(true);
  const [amount,setAmount]=useState(0);
  const expiry = Math.floor((props.deadline-Date.now())/1000/60/60/24);
  console.log(props);
return(

<div className="camp_card flexbox-column">
<img src="./campaign.jpg" alt="campposter"/>
<span>{expiry>0?`expires in: ${expiry}${expiry===1?'day':'days'}`:'expired'} </span>
<h2>{props.title}</h2>
  <p>{props.description}</p>
  <div className='flexbox-sa'>
<p>Target: {props.target}ETH</p>
  <p>Collected: {props.amountCollected}ETH</p>
  </div>
  {donate?  <button onClick={()=>setDonate(false)}>Donate</button>
  :<div className='flexbox-column'>
    <input type='number' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
    <button onClick={async()=>{
      await fun.donate(props.pid,amount);
      alert('Donation successful');
      setDonate(true)}}>
        Confirm Donation</button>
  <button onClick={()=>setDonate(true)}>Cancel</button>
  </div>
  }
  </div>
);
}
