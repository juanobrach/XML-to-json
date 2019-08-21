import React, { Component } from "react";



class Form extends Component {
    render(){
        return(
            <form>
                <select>
                    {
                     this.props.models.map( ( model, key)=>{
                       return <option key={key}  value={key}> {model} </option>
                     })
                    }
                </select>
            </form>
        )
    }
}


export default Form