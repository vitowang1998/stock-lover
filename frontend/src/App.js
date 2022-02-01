import "./App.css";
import { useState } from "react";
import Axios from "axios";
function App() {
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [marketplace, setMarketplace] = useState("");

  const [companyList, setCompanyList] = useState([]);

  const addCompany = () => {
    console.log(companyName);
    Axios.post("http://localhost:3001/create", {
      name: companyName,
      country: country,
      revenue: revenue,
      marketplace: marketplace,
    }).then(() => {
      console.log("Successfully added a new company to database");
    });
  };

  const getCompanies = () => {
    Axios.get("http://localhost:3001/companies").then((response) => {
      setCompanyList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Company Name: </label>
        <input
          type="text"
          onChange={(event) => {
            setCompanyName(event.target.value);
          }}
        ></input>
        <label>Country: </label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        ></input>
        <label>Company Revenue: </label>
        <input
          type="number"
          onChange={(event) => {
            setRevenue(event.target.value);
          }}
        ></input>
        <label>Marketplace: </label>
        <input
          type="text"
          onChange={(event) => {
            setMarketplace(event.target.value);
          }}
        ></input>
        <button onClick={addCompany}>Add Stock</button>
      </div>
      <div className="companies">
        <button onClick={getCompanies}>Display Companies</button>
        {companyList.map((val, key) => {
          return <div>{val.name}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
