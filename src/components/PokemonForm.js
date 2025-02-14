import React from 'react'
import { Form } from 'semantic-ui-react'
import PokemonCard from './PokemonCard.js'

class PokemonForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  updateState = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = () => {
    const newPokeData = {
      "name": this.state.name,
      "stats": [
        {
          "value": this.state.hp,
          "name": "hp"
        }
      ],
      "sprites": {
        "front": this.state.frontUrl,
        "back": this.state.backUrl
      }
    }
    const contentObj = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPokeData)
    }
    fetch("http://localhost:3000/pokemon", contentObj)
    .then(resp => resp.json())
    .then(this.props.createPokemon)
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.updateState} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.updateState} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={this.updateState} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={this.updateState} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
