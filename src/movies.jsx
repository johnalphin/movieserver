
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import img1 from "./imgs/1.jpg"
import img2 from "./imgs/2.jpg"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Navs from './navbar';
import { useEffect, useState } from 'react';
function Movies() {
    const [moviedata,setmoviedata]=useState();



    const getdet = () => {
      console.log("api calls")
        try {
           fetch('http://localhost:8080/data', {
              method: 'GET',
              headers: {
                 'Content-Type': 'application/json',

              },

           })
              .then((response) => {
  
                 const json = response.json();
                 console.log("response data", json)
                 return json;
              })
  
              .then(data => {
                 console.log(data)
                 setmoviedata(data)
              })
              .catch(error => console.error(error));
        }
        catch (error) {
           console.log(error, "error");
        }
    
     }

     const updateData =(currentid) =>
     {
   
      try {
         fetch('http://localhost:8080/update', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',

            },
            body:JSON.stringify({
              _id:currentid,
              name:"samplename"
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
                getdet();
            })
            .catch(error => console.error(error));
      }
      catch (error) {
         console.log(error, "error");
      }
  
     }
     
     const deleteData =(currentid) =>
     {
   
      try {
         fetch(`http://localhost:8080/deleteEntry/${currentid}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',

            },
            body: JSON.stringify({ entryId: currentid })

         })
            .then((response) => {

               const json = response.json();
               console.log("response data", json)
               return json;
           
            })

            .then(data => {
               console.log(data)
              //  setmoviedata(data)
                getdet();
            })
            .catch(error => console.error(error));
      }
      catch (error) {
         console.log(error, "error");
      }
  
     }


     useEffect(() => {
        getdet();
      }, []);

  return (
    <>
  <Navs></Navs>
    <div className='container'>



    <div style={{display:"flex",justifyContent:"center"}}>

    
    <div style={{width:"100%",backgroundColor:"white",height:"600px"}}>
<Carousel>
      <Carousel.Item>
        <img
        style={{width:"100%",height:"600px"}}
          className="d-block w-100"
          src={img2}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
        style={{width:"100%",height:"600px"}}
          className="d-block w-100"
          src={img1}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
  
    </Carousel>
    </div>
    </div>



    <div>
        <div className='row mt-5'>




{
                              moviedata?.data.length > 0 &&
                              moviedata?.data.map((i, index) => (

                                <div className='col'>    
                                <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={img1} />
                          <Card.Body>
                            <Card.Title>{i?.name}</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title and make up the
                              bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" onClick={()=>updateData(i?._id)}>Update</Button>
                            <Button variant="primary" onClick={()=>deleteData(i?._id)}>Delete</Button>
                          </Card.Body>
                        </Card></div>
                              ))
                           }

            



    
        </div>

    </div>
    </div>
    
    
    
    
    </>
    
  );
}

export default Movies;
