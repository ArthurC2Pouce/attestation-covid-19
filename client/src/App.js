import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './App.css';

class App extends Component {
  state = {
    nom: 'Benoit',
    prenom: 'Arthur',
    dateNaissance: '07/01/1993',
    rue: '8bd de Magnan',
    ville: 'Nice',
    codePostal: '06200',
    motifDeplacement: ''
  };

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  render() {
    return (
      <div className="App">
        <h1> Formulaire Attestation de déplacement</h1>

        <input type="text" placeholder="Nom" name="nom" onChange={this.handleChange}/>
        <br/>
        <input type="text" placeholder="Prénom" name="prenom" onChange={this.handleChange}/>
        <br/>
          <input type="text" placeholder="date de naissance" name="dateNaissance" onChange={this.handleChange} />
        <br/>
        <input type="text" placeholder=" Numéro et rue" name="rue" onChange={this.handleChange}/>
        <br/>
        <input type="text" placeholder="Ville" name="ville" onChange={this.handleChange}/>
        <br/>
        <input type="text" placeholder="Code Postal" name="codePostal" onChange={this.handleChange}/>
        <br/>

          <h2>Motif de déplacement</h2>
          <input type="radio" name="motifDeplacement" onChange={this.handleChange} value="Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu’ils sont indispensables à l’exercice d’activités ne pouvant être organisées sous forme de télétravail (sur justificatif permanent) ou déplacements professionnels ne pouvant être différés."/>
          <label>Trajet travail</label>

          <input type="radio" name="motifDeplacement" onChange={this.handleChange} value="Déplacements pour effectuer des achats de première nécessité dans des établissements autorisés (liste sur gouvernement.fr)"/>
          <label>Courses</label>

          <input type="radio"  name="motifDeplacement" onChange={this.handleChange} value="Déplacements pour motif de santé."/>
          <label>Santé</label>

          <input type="radio"  name="motifDeplacement" onChange={this.handleChange} value="Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants."/>
          <label>Familial</label>

          <input type="radio"  name="motifDeplacement" onChange={this.handleChange} value="Déplacements brefs, à proximité du domicile, liés à l’activité physique individuelle des personnes, à l’exclusion de toute pratique sportive collective, et aux besoins des animaux de compagnie."/>
          <label>Sport/Chien</label>
          <br/>

           <button onClick={this.createAndDownloadPdf}>Télécharger Attestation (PDF)</button>
      </div>
    );
  }
}

export default App;
