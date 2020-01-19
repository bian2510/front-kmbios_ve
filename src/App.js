import React, {useState, useEffect} from 'react';
import Navigation from './Components/Header/Navigation'
import './App.css';
import AccountTable from './Components/Table/Table';
import FormSignIn from './Components/Form/SignIn'
import FormCreateBeneficiary  from './Components/Form/beneficiaryForm'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { beneficiaryData } from './Services/Calls'

function App() {
  const [user, setUser] = useState({})
  const [data, setData] = useState([]);
  const [temporalData, filterTemporalData] = useState(data)
  useEffect(() => {
    const fetchData = async () => {
      const { data: responseData } = await beneficiaryData(user, setUser);
      setData(responseData);
      setTimeout(() => { return; }, 500);
    };
    fetchData();
  }, [user]);
  return (

    <div className="App">
        <Navigation data={data} 
                    temporalData={temporalData}
                    filterTemporalData={filterTemporalData}
                    user={user}
                    setUser={setUser}
        />
        <AccountTable temporalData={temporalData}/>
        <FormSignIn setUser={setUser}/>                
        <FormCreateBeneficiary setUser={setUser} 
                               user={user}
        />
    </div>
  );
}

export default App;
