import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function App() {
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [marketplace, setMarketplace] = useState("");

  const [companyList, setCompanyList] = useState([]);

  const addCompany = () => {
    console.log("Trying to add", companyName);
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
        <Button variant="contained" onClick={addCompany}>
          Add Stock
        </Button>
      </div>
      <div className="companies">
        <Button variant="contained" onClick={getCompanies}>
          Display Companies
        </Button>
        {/* <button onClick={getCompanies}>Display Companies</button> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Company Revenue (millions)</TableCell>
                <TableCell>Marketplace</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companyList.map((company) => {
                return (
                  <TableRow key={company.name}>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.country}</TableCell>
                    <TableCell>{company.revenue}</TableCell>
                    <TableCell>{company.marketplace}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
