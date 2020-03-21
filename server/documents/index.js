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
	             max-width: 600px;
	             margin: auto;
	             padding: 45px;
	             font-size: 12px;
	             line-height: 24px;
	             font-family: Arial;
             }
             #header {
				text-align: center;
				padding: auto;

             }
             h1 {
             padding-top: 20px;
             font-size: 16px;
             color: black;
             }

             #personal {
             	padding-top: 30px;
             }

             #motivation {
             	padding-top: 10px;
             }

             #italic {
             	margin-top: 50px;
             	margin-bottom: 50px;
             	font-style: italic;
             }

             #footer {
             	padding-top: 10px;
             	text-align: right;
             }

             #signature {
             	font-family: "Times New Roman";
             	font-style: italic;
             	font-size: 16px;

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
                <p>Certifie que mon déplacement est lié au motif suivant autorisé par l’article 1er du décret du 16 mars 2020 portant réglementation des déplacements dans le cadre de la lutte contre la propagation du virus Covid-19 :</p>
                <p id="italic">"${motifDeplacement}"</p>
            </div>
            <div id="footer">
                <p> Fait à ${ville}, le ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</p>
                <p> Signature</p>
                <p id="signature"> ${nom} ${prenom}</p>
            </div>
          </div>

       </body>
    </html>
    `;
};
