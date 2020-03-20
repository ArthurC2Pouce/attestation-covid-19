import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

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

  createAndDownloadPdf = (e) => {
    e.preventDefault();
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'Attestation-deplacement.pdf');
      })
      alert("L'attestation sera disponible dans votre dossier 'téléchargements' dans quelques secondes")
  }

  render() {
    return (
        <div className="App container">

            <form>
                <h1 className="h1 pb-3 pt-5 font-weight-normal"> Formulaire d'attestation de déplacement</h1>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Nom" name="nom"
                           onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control " placeholder="Prénom" name="prenom"
                           onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="date de naissance" name="dateNaissance"
                           onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder=" Numéro et rue" name="rue"
                           onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Ville" name="ville"
                           onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Code Postal" name="codePostal"
                           onChange={this.handleChange}/>
                </div>

                <h2 className="h2 pb-3 font-weight-normal" >Motif de déplacement</h2>

                <div className="form-check">
                    <input type="radio" className="form-check-input" name="motifDeplacement"
                           onChange={this.handleChange}
                           value="Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu’ils sont indispensables à l’exercice d’activités ne pouvant être organisées sous forme de télétravail (sur justificatif permanent) ou déplacements professionnels ne pouvant être différés."/>
                    <label>Trajet travail</label>
                </div>

                <div className="form-check">
                    <input type="radio" className="form-check-input" name="motifDeplacement"
                           onChange={this.handleChange}
                           value="Déplacements pour effectuer des achats de première nécessité dans des établissements autorisés (liste sur gouvernement.fr)"/>
                    <label>Courses</label>
                </div>

                <div className="form-check">
                    <input type="radio" className="form-check-input" name="motifDeplacement"
                           onChange={this.handleChange} value="Déplacements pour motif de santé."/>
                    <label>Santé</label>
                </div>

                <div className="form-check">
                    <input type="radio" className="form-check-input" name="motifDeplacement"
                           onChange={this.handleChange}
                           value="Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants."/>
                    <label>Familial</label>
                </div>

                <div className="form-check">
                    <input type="radio" className="form-check-input" name="motifDeplacement"
                           onChange={this.handleChange}
                           value="Déplacements brefs, à proximité du domicile, liés à l’activité physique individuelle des personnes, à l’exclusion de toute pratique sportive collective, et aux besoins des animaux de compagnie."/>
                    <label>Sport/Chien</label>
                </div>

                <button className="btn btn-primary mb-5 mt-3" onClick={this.createAndDownloadPdf}>
                    Télécharger votre attestation (PDF)
                </button>
            </form>
        </div>
    );
  }
}

export default App;
