import React, { Component } from 'react';


export class Api extends Component {
  render() {
    var m={
      width:"400px",
      height:"20px",
      padding:"10px",
      border:"1px solid grey",
      borderRadius:"5px",
      margin:"20px",
  } 
  var c={
      height:"40px",
      borderRadius:"5px",
      border:"none",
      fontSize:"18px",
      fontWeight:"bold",
      backgroundColor:"#008cba",
      
  }
    return (
      <form onSubmit={this.props.findres}>
          <input style={m}type="text" name="city" placeholer="City"/>
          <button style={c}>Find Restaurent</button>
      </form>
    );
  }
}

export default Api;