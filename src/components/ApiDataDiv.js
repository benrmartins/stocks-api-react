import React from 'react'
import { useApiDataContext } from '../providers/ApiDataProvider'
import StockOverview from './StockOverview';

export const ApiDataDiv = (props) => {

    const {data} = useApiDataContext();


  return (
    <div style={{...props.style}}>
        <h2>Api Data</h2>  
        {/* {JSON.stringify(data, null, 2)} */}
        {Array.isArray(data) ? data.map(stock => {return (
            <StockOverview data={stock}/>
        )}) : JSON.stringify(data, null, 2)}
    </div>
  )
}

export default ApiDataDiv

