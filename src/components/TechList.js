import React, { Component } from 'react';
import TechItem from '../components/TechItem';

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  };

  //  Executado assim que o componente aparece em tela -> ele pode fazer qualquer tipo de alteração ou execução de código JS.
  componentDidMount() {
    const techs = localStorage.getItem('techs');
    
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  // Executado sempre que houver alterações nas props ou estado -> incluse ele recebe essas props e estados antes de serem alteradas, como parametro.
  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  // Função de manipulação: INPUT
  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  }

  // Função de manipulação: SUBMIT
  handleSubmit = e => {
    e.preventDefault();

    this.setState({ 
      techs: [...this.state.techs, this.state.newTech],
      newTech: '',
    });
  }
  
  // Função de manipulação: DELETE
  handleDelete = (tech) => {
    this.setState ({ techs: this.state.techs.filter(t => t!== tech) })
  }

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{this.state.newTech}</h1>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem 
              key={tech} 
              tech={tech} 
              onDelete={() => this.handleDelete(tech)} 
            />
          ))}
        </ul>
        <input 
          type="text" 
          onChange={this.handleInputChange} 
          value={this.state.newTech} 
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;