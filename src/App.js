import React, { Component } from 'react';
import MapContainer from './components/map';
import Api from './components/api';

const api_keyId='e2bafdcd4dc6d0f7bf6e48ad7a72e08f';
const api_info = {
  method: 'GET',
  headers: {
    'user-key':api_keyId,
    'Content-Type':'application/json'
  },
  credentials:'same-origin'
};
export class App extends Component {
  state = {
        restaurant:[],
        x:23.2536762920,   
        y:77.4126080051,
        name:"No location",
        error:"",
  };
  
  
  findres = async(e) =>{
    e.preventDefault();
    const city=e.target.elements.city.value;
    if(city===""){
      this.setState({
        error:"please enter city.",
      })
    }
    else{

    
    const api_call = await fetch(`https://developers.zomato.com/api/v2.1/cities?q=${city}`,api_info);
    const data =await api_call.json();
    console.log(data);
    console.log(data.location_suggestions[0].id)
    const cityid=data.location_suggestions[0].id;
    
    
    console.log(city);
    console.log(cityid);

    const api_call2 = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityid}&entity_type=city&q=${city}`,api_info);
    const searchdata =await api_call2.json();
    console.log(searchdata);
    console.log(searchdata.restaurants);
    this.setState({
      restaurant:searchdata.restaurants,
      error:"",
    });
  }
  }

  loadValueIntoMap(e) {

    console.log(e);
    let x= e.target.getAttribute("data-x");
    let y= e.target.getAttribute("data-y");
    let name= e.target.getAttribute("data-name");
    console.log(x);
    console.log(y);
    this.setState({
      x:x,
      y:y,
      name:name,
    })
  } 

  render() {
     var goright={
       marginLeft:"600px", 
       height:"630px",
       width:"1300px",
       position:"fixed",
       marginTop:"10px",
     }
     var img={
       height:"200px",
       width:"195px",
       marginRight:"20px",
      float:"left",
      borderRadius:"7px 0 0 7px",
    }
    var div={
      height:"200px",
      width:"500px",
      border:"3px solid #3366ff",
      borderRadius:"7px",
      margin:"30px",
    }
    var a={
      textDecoration:"none",
      border:"2px solid #3366ff",
      fontWeight:"bold",
      color:"#3366ff",
      margin:"20px 20px 20px 0",
      padding:"20px",
    }
    
    var showid={
      display:"none",
    }
    var error={
      
      fontSize:"15px",
      fontWeight:"bold",
      color:"red",
      marginLeft:"20px"
    }
    return (
      
      <div >
        <div><Api findres={this.findres}/></div>
        <p style={error}>{this.state.error}</p>
        <div style={goright}><MapContainer lat={this.state.x} long={this.state.y} name={this.state.name}/></div>
         <div>{this.state.restaurant.map((resdata)=>{
           return (
             <div style={div} key={resdata.restaurant.id}>
              <img style={img} src={resdata.restaurant.thumb} alt="food pic" />
              <h3>{resdata.restaurant.name}</h3>
              <a style={a} href={resdata.restaurant.menu_url}>MENU</a>
              <button style={a} onClick={this.loadValueIntoMap.bind(this) }
               data-x={resdata.restaurant.location.latitude} 
               data-y={resdata.restaurant.location.longitude} 
               data-name={resdata.restaurant.name}
               >LOCATION</button>
              <p style={showid}>{resdata.restaurant.id}</p>
             </div>
           );
         }
          )}</div>     
      </div>
    );
  }
}

export default App;