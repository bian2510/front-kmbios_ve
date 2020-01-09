import React, {useState} from 'react';
import Navigation from './Components/Header/Navigation'
import './App.css';
import AccountTable from './Components/Table/Table';
import FormSignIn from './Components/Form/SignIn'
import FormCreateBeneficiary  from './Components/Form/CreateBeneficiary'

const beneficiaryData = [
  {account_number: 142134213421, name: 'Fabian', lastName: 'Hernandez', bank: 'Banesco', personal_id: "23654217", telephone_number: 12313123, mobile_pay: 12312321},
  {account_number: 142134213421, name: 'Fabian', lastName: 'Hernandez', bank: 'Banesco', personal_id: "11941233", telephone_number: 12313123, mobile_pay: 12312321},
  {account_number: 142134213421, name: 'Carlos', lastName: 'Hernandez', bank: 'Banesco', personal_id: "20372123", telephone_number: 12313123, mobile_pay: 12312321},
  {account_number: 142134213421, name: 'Carlos', lastName: 'Hernandez', bank: 'Banesco', personal_id: "4876123", telephone_number: 12313123, mobile_pay: 12312321}
]

function App() {
  const [data, filterData] = useState(beneficiaryData)
  const [temporalData, filterTemporalData] = useState(data)
  return (
    <div className="App">
      <Navigation data={data} temporalData={temporalData} filterTemporalData={filterTemporalData}/>
      <AccountTable temporalData={temporalData}/>
    </div>
  );
}

export default App;
