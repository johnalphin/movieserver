
import './App.css';
import Movies from './movies';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navs from './navbar';
import { useState } from 'react';
function Admin() {

const[movieName,setmovieName]=useState("");
const[movieDesc,setmovieDesc]=useState("");





  const add = () => {
    console.log("api calls",movieName,movieDesc)

      try {
         fetch('http://localhost:8080/data', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',

            },
            body:JSON.stringify({
              movieName:movieName,
              movieDesc:movieDesc
            })

         })
            .then((response) => {

               const json = response.json();
               console.log("response data", json)
               return json;
            })

            .then(data => {
               console.log(data)
              //  setmoviedata(data)
            })
            .catch(error => console.error(error));
      }
      catch (error) {
         console.log(error, "error");
      }
  
   }


  return (
    <div className="admin">
     
   <Navs></Navs>
   <div className='row'>
    <div className='col'>
    <form>
  <label >Movie name:</label><br></br>
  <input type="text" onChange={(e)=>{setmovieName(e.target.value)}}></input><br></br>
  <label >Movie Description</label><br></br>
  <input type="text" onChange={(e)=>{setmovieDesc(e.target.value)}}></input>
</form>
     
    </div>
    <div className='col'>
    <form>
  <label for="fname">First language:</label><br></br>
  <input type="text" id="fname" name="fname"></input><br></br>

</form>
     
    </div>

  

   </div>
   <button  style={{width:"100px"}} type='button' onClick={add}>Add</button>

    </div>
  );
}

export default Admin;
