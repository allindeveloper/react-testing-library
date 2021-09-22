import React, { useState } from 'react';
import "./Counter.css"
function Counter() {
    const [counterValue, setcounterValue] = useState(0)

    const [inputValue, setinputValue] = useState<number>(1)

    const addToCounter = ()=>{
        setcounterValue(counterValue+inputValue)
    }

    const subTractFromCounter = ()=>{
        setcounterValue(counterValue - inputValue)
    }
    return (
        <div>
            <h3 data-testid="header">My Counter</h3>
            <h2 
                data-testid="counter"
                className={`${counterValue >= 100 ? 'green':''}${counterValue <= -100 ? 'red':''}`}
                >{counterValue}</h2>
            <button 
            data-testid="subtract-btn"
            onClick={subTractFromCounter}
            >-</button>
            <input 
             className="text-center"
             data-testid="input" 
             type="number"
             onChange={(e)=>setinputValue(parseInt(e.target.value))}
             value={inputValue} />
            <button 
            data-testid="add-btn"
            onClick={addToCounter}
            >+</button>
        </div>
    );
}

export default Counter;
