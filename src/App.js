import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("")
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("")
  function addNewTransaction(){
    
  }
  return (
    <main>
      <h1>$400<span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" 
          value = {name}
          onChange={e => setName(e.target.value)}
          placeholder={'+200 new samsung tv'}/>
          <input 
          value={datetime}
          onChange={e=>setDatetime(e.target.value)}
          type="datetime-local"/>
        </div>
        <div className="description">
          <input type="text" 
          value = {description}
          onChange={e => setDescription(e.target.value)}
          placeholder={'description'}/>
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">it was time for new tv
            </div>
          </div>
          <div className="right">
            <div className="price red">$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>

        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">it was time for new tv
            </div>
          </div>
          <div className="right">
            <div className="price red">$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>

        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">it was time for new tv
            </div>
          </div>
          <div className="right">
            <div className="price red">$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>

        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">it was time for new tv
            </div>
          </div>
          <div className="right">
            <div className="price red">$500</div>
            <div className="datetime">2022-12-18 15:45</div>
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default App;
