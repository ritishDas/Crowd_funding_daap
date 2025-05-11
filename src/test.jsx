
import { useEffect, useState } from "react";
import { getEthereumContract } from "./connectwallet";

function App() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const contract = getEthereumContract();
        const campaignsData = await contract.getCampaigns();
        setCampaigns(campaignsData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div>
      <h1>CF DApp</h1>
      {campaigns.length > 0 ? (
        campaigns.map((c, index) => (
          <div key={index}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
          </div>
        ))
      ) : (
        <p>No campaigns found.</p>
      )}
    </div>
  );
}

export default App;
