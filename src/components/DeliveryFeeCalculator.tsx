import React, { useState } from 'react';
import Props from '../App'
 

interface Props {
    cartValue: number;
    deliveryDistance: number;
    numberOfItems: number;
    deliveryTime: Date;
    fee: number;
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void =>
{
    e.preventDefault()
}

  
const DeliveryFeeCalculator: React.FC<Props> = (props) =>
{
  const [cartValue, setCartValue] = useState(props.cartValue);
  const [deliveryDistance, setDeliveryDistance] = useState(props.deliveryDistance);
  const [numberOfItems, setNumberOfItems] = useState(props.numberOfItems);
  const [deliveryTime, setDeliveryTime] = useState(props.deliveryTime);
  const [fee, setFee] = useState(props.fee);

  const calculateFee = () => {
    
    //initial value
    let baseFee = 2;
    let additionalDistanceFee = 0;
    let itemFee = 0;

    //If the delivery distance is longer than 1000m, 1€ is added for every additional 500 meters.
    if (deliveryDistance > 1000) {
      additionalDistanceFee = Math.ceil((deliveryDistance - 1000) / 500) * 1;
    }
    
    //If the number of items is five or more, an additional 50 cent surcharge is added
    if (numberOfItems >= 5) {
        itemFee = (numberOfItems - 4) * 0.5;

      // An extra "bulk" fee applies for more than 12 items of 1,20€
      if (numberOfItems > 12) {
        itemFee += 1.2;
      }
    }

    let totalFee = baseFee + additionalDistanceFee + itemFee;
      
    //surcharge if cart value is less than 10€
    if (cartValue < 10 && cartValue >= 1) {
      totalFee += 10 - cartValue;
    }

    //check if the input is Friday
    if (deliveryTime.getUTCDay() === 5) {
        // rush hour between '3 pm = 900 min' and '7 pm = 1140 min'
        const rushHourStartingMinutes: number = 15 * 60
        const rushHoursEndingMinutes: number = 19 * 60
            
        const selectedTime = deliveryTime.getHours() * 60 + deliveryTime.getMinutes()
        
        if (rushHourStartingMinutes <= selectedTime &&
            selectedTime <= rushHoursEndingMinutes
        ) {
            totalFee *= 1.2;
        }
    }
      
    //The delivery fee can never be more than 15€, including possible surcharges.
    if (totalFee > 15) {
      totalFee = 15;
    }

    //The delivery is free (0€) when the cart value is equal or more than 100€.
    if (cartValue >= 100) {
      totalFee = 0;
    }

    setFee(totalFee);
  };
 

  return (
    <div>
      <h3>Delivery fee Calculator</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Cart Value:
          <input type="number" step="any" value={cartValue} onChange={e => setCartValue(parseFloat(e.target.value))} />
        </label>
        <br />
        <label>
          Delivery Distance:
          <input required type="number" value={deliveryDistance} onChange={e => setDeliveryDistance(parseInt(e.target.value))} />
        </label>
        <br />
        <label>
          Number of Items:
          <input required type="number" value={numberOfItems} onChange={e => setNumberOfItems(parseInt(e.target.value))} />
        </label>
        <br />
        <label>
          Delivery Time:
          <input required type="datetime-local" value={deliveryTime.toISOString().slice(0, 16)} onChange={e => setDeliveryTime(new Date(e.target.value))} />
        </label>
        <br />
        <button onClick={calculateFee} className='button'>Calculate Delivery Fee</button>
      </form>
      <p>Delivery Price: {fee.toFixed(2)} €</p>
    </div>
  );
};

export default DeliveryFeeCalculator;