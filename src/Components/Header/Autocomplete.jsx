/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SearchBar(props) {
  const { data, filterTemporalData, temporalData} = props;
  function filterResult(event, data) {
    filterTemporalData(data.filter((el) => {
      return el.personal_id.toString().startsWith(event.target.value)
          }))   
  }  
  return (
    <Autocomplete
      id="combo-box-demo"
      options={temporalData}
      getOptionLabel={option => option.personal_id}
      style={{ width: 200 }}
      renderInput={params => (
        <TextField {...params} label="Buscar por cedula" variant="outlined"
                               fullWidth onChange={(event)=> filterResult(event, data)}
        />
        )}
    />
  );
}