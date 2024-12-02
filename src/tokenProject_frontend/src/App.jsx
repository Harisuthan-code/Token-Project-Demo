import { tokenProject_backend } from 'declarations/tokenProject_backend';
import { useState } from 'react';
import {Principal} from '@dfinity/principal'

function App(){


  const [claim_button , setclaimbutton ] = useState("Claim")
  const [disable , setdisable] = useState(false)
  const [id , setid] = useState("")
  const [account_balance , setaccount_balance] = useState()
  const [hide , sethide] = useState(true)
  const [account , setaccount] = useState("")
  const [sendamount , setsendamount] = useState("")
  const [msg , setmsg] = useState()
  const [check_btn , setcheckbtn] = useState(false)
  const [transferbtn , settransferbtn] = useState(false)



  async function handlechaneg(){

  setdisable(true)

  const result = await tokenProject_backend.claim()

  setclaimbutton(result);


  }


  async function check_balance() {


    setcheckbtn(true)


    if (!id || id.trim() === "") {
      console.log("ID is invalid, showing alert");
      alert("Please enter a valid Principal ID");
      return;
    }


  const ownerId = Principal.fromText(id)

  const result = await tokenProject_backend.check_balance(ownerId)

  setaccount_balance(Number(result))
  sethide(false)
  setcheckbtn(false)
  setid("")
   
    
  }


  async function transfer_Amount(e) {

    e.preventDefault()

    settransferbtn(true)


    if (!account || account.trim() === "") {
      alert("Please enter a valid Principal ID");
      return;
    }

    const sendaccount = Principal.fromText(account)
    const amount = Number(sendamount)

    const result = await tokenProject_backend.transfer_amount(sendaccount , amount)

    setmsg(result)
    settransferbtn(false)
  

  
  }


  return(

    <div className='porject-head'>


      <img src='./public/logo.webp' alt='logo-image' className='img-logo'></img>

      <div className='sub-head'>

        <div className='claim'>

        <p>Claim the free tokens 5000</p> 
        <button onClick={handlechaneg} disabled = {disable}>{claim_button}</button>

        </div>


        <div className='balance-class'>

          <p>Check the Balance</p>
          <div className='in'>
          <input type='text' placeholder='enter the principal id' onChange={(e)=>setid(e.target.value)} value={id}></input>
          <button onClick={check_balance} disabled = {check_btn}>Check</button>
          </div>
          <p className='result' hidden = {hide}>your current balance {account_balance}</p>



        </div>


        <form className='transfer-cls' onSubmit={transfer_Amount} >

          <p>Transfer the Amount</p>
          <input type='text' className='tranfer-account' placeholder='enter the tranfer account' onChange={(e)=>setaccount(e.target.value)}></input>
          <input type='number' className='amount' placeholder='enter the amount' onChange={(e) => setsendamount(e.target.value)}></input>

          <button disabled = {transferbtn}>Transfer</button>
          <p className='result'>{msg}</p>




        </form>






      </div>






    </div>




  )



}

export default App;