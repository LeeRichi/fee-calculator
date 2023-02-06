import { useState } from 'react'
import './App.css'


import DeliveryFeeCalculator from './components/DeliveryFeeCalculator'


function App()
{
  return (
    <div className="container">
      <DeliveryFeeCalculator 
        cartValue={0.00} 
        deliveryDistance={0} 
        numberOfItems={0} 
        deliveryTime={new Date()} 
        fee={0} 
      />
    </div>
  )
}

export default App
