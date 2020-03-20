module.exports = ({ nom, prenom, dateNaissance, rue, ville, codePostal, motifDeplacement,}) => {
    const today = new Date();
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Attestation Covid-19</title>
          <style>
             #page {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 10px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             },
             #header {
             text-align: center;
             },
             h1 {
             font-family: 'distressed';
             font-size: 15px;
             }

          </style>
       </head>
       <body>
          <div id="page">
            <div id="header">
                <h1>ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</h1>
                <p>En application de l’article 1er du décret du 16 mars 2020 portant réglementation des déplacements dans le cadre de la lutte contre la propagation du virus Covid-19 :</p>
            </div>
            <div id="personal">
                <p>Je soussigné(e)</p>
                <p>Mme / M. ${nom} ${prenom} </p>
                <p>Né(e) le : ${dateNaissance}</p>
                <p>Demeurant : ${rue} ${ville} ${codePostal} </p>
            </div>
            <div id="motivation">
                <p>Certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par l’article 1er du décret du 16 mars 2020 portant réglementation des déplacements dans le cadre de la lutte contre la propagation du virus Covid-19 :</p>
                <br/>
                <p>${motifDeplacement}</p>
            </div>
            <div id="footer">
                <p> Fait à ${ville}, le XXX</p>
                <p> Signature</p>
                <p id="signature"> ${nom} ${prenom}</p>
            </div>
          </div>

       </body>
    </html>
    `;
};
