import React, {useState,useEffect,useContext} from 'react';
import {CrowdfundingContext} from './context/ether';
import Footer from './components/footer';

import Card from './components/card';
import './App.css'

function App() {
  const fun = useContext(CrowdfundingContext);
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [amount,setAmount]=useState('');
  const [deadline,setDeadline]=useState('');
  const [Data,setData]=useState([]);

  async function getData(){
const data = await fun.getCampaigns();
  setData(data);
  }

  useEffect(()=>{
(async()=>{
  await getData();
})()
  },[fun]);

async function connect_wallet(){
  console.log('clicked');
await fun.connectWallet();
  alert("Wallet Connected");
}

  return (<>
<div className="navbar flexbox-sa">
    <span>Crowdfunding</span>
    <button onClick={()=>connect_wallet()}>Connect Wallet</button>
    </div>
    
    <div className="hero flexbox-sa">
<div>
    <h1>Empower Your Vision, Fund Your Future</h1>
    <span>Join our innovative platform to launch your crowdfunding campaign and connect with supporters worldwide. Whether you're raising funds for a project or looking to contribute, we make it easy to turn ideas into reality.</span>
</div>
    <form className="flexbox-column" onSubmit={async(e) => {
      e.preventDefault();
      await fun.createCampaign({title,description,amount,deadline});
      setTitle('');
      setDescription('');
      setDeadline('');
      setAmount('');
  await getData();
      // Handle form submission here
    }}>
      <h1>Campaign</h1>
      <label htmlFor="title">Title</label>
      <input 
        type="text" 
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <input
        type="text" 
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="target">Target Amount</label>
      <input
        type="number"
        name="target"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">Create Campaign</button>
      <span>Create Campaign for raising fund</span>
    </form>
    
    </div>

<h3>Campaigns</h3>
    <div className="card-container flexbox-sa">
    {Data.map((data,ind)=><Card key={ind} {...data}/>)}
    </div>
    <Footer/>
    </>);
}

export default App
