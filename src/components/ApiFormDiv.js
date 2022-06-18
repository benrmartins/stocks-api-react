import React, { useState } from 'react'
import axios from 'axios'
import { useApiDataContext } from '../providers/ApiDataProvider'

export const ApiFormDiv = (props) => {
  
  const BASE_URL = "http://localhost:4000/api/overview/"


  const [formData, setFormData] = useState({query: '', selectedQuery: 'all', uploadInput: ''})

  const {setData} = useApiDataContext()

  const {selectedQuery, query, uploadInput} = formData

  const noQueryOptions = ['all']

  const requestData = () => {
    const url = BASE_URL + (noQueryOptions.includes(selectedQuery) ? selectedQuery : selectedQuery + "/" + query)
    console.log("Requesting Data");
    axios.get(url).then( res => {
      setData(res.data)
      setFormData({...formData, query: ''})
      console.log(res.data);
    }).catch(err => {
      alert("error \n" + (err.response.data || err.message))
    })
  }

  const deleteData = () => {
    const url = BASE_URL + (noQueryOptions.includes(selectedQuery) ? selectedQuery : selectedQuery + "/" + query)
    console.log("Requesting Data");
    axios.delete(url).then( res => {
      setData(res.data)
      setFormData({...formData, query: ''})
      console.log(res.data);
    }).catch(err => {
      alert("error \n" + (err.response.data || err.message))
    })
  }


  const deleteAllResources = () => {
    console.log("Requesting Data");
    axios.delete(BASE_URL + 'all').then( res => {
      setData(res.data)
      alert("Delete All Resources")
      console.log(res.data);
    }).catch(err => {
      alert("error \n" + (err.response.data || err.message))
    })
  }

  const uploadTestResources = () => {
    console.log("Requesting Data");
    axios.post(BASE_URL + "all").then( res => {
      setData(res.data)
      alert("Uploaded Test Resources")
      console.log(res.data);
    }).catch(err => {
      alert("error \n" + (err.response.data || err.message))
    })
  }


  const uploadResources = () => {
    console.log("Requesting Data");
    axios.post(BASE_URL + uploadInput).then( res => {
      setData([res.data])
      setFormData({...formData, uploadInput: ''})
      alert("Uploaded Test Resources")
      console.log(res.data);
    }).catch(err => {
      alert("error \n" + (err.response.data || err.message))
    })
  }

  const selectedQueryOptions = [
    {value: 'all', innerText: 'All'},
    {value: 'exchange', innerText: 'By Exchange'},
    {value: 'symbol', innerText: 'By Symbol'},
    {value: 'assettype', innerText: 'By Asset Type'},
    {value: 'sector', innerText: 'By Sector'},
    {value: 'name', innerText: 'By Name'},
    {value: 'currency', innerText: 'By Currency'},
    {value: 'country', innerText: 'By Country'},
    {value: 'marketcapgt', innerText: 'Market Cap Less Than'},
    {value: 'marketcaplt', innerText: 'Market Cap Greater Than'},
    {value: 'yearhighlt', innerText: 'Year High Less Than'},
    {value: 'yearhighgt', innerText: 'Year High Greater Than'},
    {value: 'ddbefore', innerText: 'Divindend Date Before yyyy-mm-dd'},
    {value: 'ddafter', innerText: 'Divindend Date After yyyy-mm-dd'}
  ]

  const renderOptions = (optionsArray) => {
    return optionsArray.map( optionData => {
      const { value, innerText} = optionData
      return (<option value={value}>{innerText}</option>)
    })
  }


  return (
    <div style={{...props.style}}>
        <h2>API Form</h2>
        <select value={selectedQuery} onChange={e=>{setFormData({...formData, selectedQuery: e.target.value})}}>
          {renderOptions(selectedQueryOptions)}
        </select>

        <input
          style={{textAlign: 'center', display: noQueryOptions.includes(selectedQuery) ? 'none' : 'initial'}}
          type='text'
          id='text-input'
          placeholder='Search Data'
          value={query}
          onChange={e=>{setFormData({...formData, query: e.target.value})}}
        />
        <button
          style={{marginTop: 10}}
          onClick={requestData}
        >Request Query Data</button>

        <button
          style={{marginTop: 10}}
          onClick={deleteData}
        >Delete Query Data</button>

        <button
          style={{marginTop: 50}}
          onClick={deleteAllResources}
        >Delete All Data</button>

        <button
          style={{marginTop: 10}}
          onClick={uploadTestResources}
        >Upload Test data</button>

        <input
          style={{textAlign: 'center', marginTop: 50}}
          type='text'
          id='text-input'
          placeholder='Upload Input'
          value={uploadInput}
          onChange={e=>{setFormData({...formData, uploadInput: e.target.value})}}
        />
        <button
          style={{marginTop: 10}}
          onClick={uploadResources}
        >Upload Resource by Input</button>
          
    </div>
  )
}

export default ApiFormDiv
