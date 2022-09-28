/******************************************/
//              Consigne                  //
/******************************************/

/**
 * Etape
 *
 * 1. Enregistrer les bonnes reponses dans un tableau
 * 2. Créer 2 tableaux vide pour avoir les réponses de l'utilisateur & pour verifier si c'est les bonnes
 * 3. Faire un querySelector du formulaire
 * 4. Ecouter l'evenement "Submit" du *formulaire* (n'oubliez pas de faire attention au refresh de la page avec 'event')
 * doc : https://developer.mozilla.org/fr/docs/Web/API/HTMLFormElement/submit_event_
 *
 * Suite
 *
 * 1. Faire une boucle for sur la longeur du tableau des réponses juste.
 * 2. *Push* les informations récuperer dans le tableau RESPONSE_USER.
 * 3. Fonction ' checkIsTrue' qui prend en paramètre le tableau de RESPONSE_USER
 *
 * La fonction 'checkIsTrue' va comparer dans une boucle for si les reponses sont juste ou fausse.
 * Si oui, push 'true' sinon push 'false
 */

/********************** Exercice **********************/

// Tableau pour consigner toutes les bonnes réponses.
//                R1,   R2,  R3,  R4,  R5
const RESPONSES = ["c", "a", "c", "b", "c"];

// J'initialise mes variables globals
let response_user = [];
// je créer un tableau qui va contenir les valeurs booléennes
let tabValBool = [];

// Je récupère des informations depuis le DOM grâce à 'querySelector()'
const FORM = document.querySelector(".form-quiz");
const TITLE = document.querySelector(".resultats h2");
const NOTE = document.querySelector(".note");
const AIDE = document.querySelector(".aide");

// Je récupère toutes les questions
const ALL_QUESTIONS = document.querySelectorAll(".question-block");

// Dès que l'utilisateur soumet le formulaire grâce à l'EventListener
FORM.addEventListener("submit", (event) => {
  // Permet de prevenir le refresh de la page
  event.preventDefault();
  // Je boucle sur le tableau des réponses
  for (let i = 1; i <= RESPONSES.length; i++) {
    // Je push dans le tableau response_user
    response_user.push(
      document.querySelector(`input[name="q${i}"]:checked`).value
    );
  }

  // J'appel la fonction checkIsTrue qui prend en paramètre le tableau
  checkIsTrue(response_user);

  // Je réinitialise le tableau pour pas cumuler les resultats
  response_user = [];
});

// CheckIsTrue vérifie si les valeurs reçu en paramètres sont juste ou fausse
function checkIsTrue(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === RESPONSES[i]) {
      tabValBool.push(true);
    } else {
      tabValBool.push(false);
    }
  }

  // la fonction displayInfo permet d'afficher les informations en bas de page
  displayInfo(tabValBool.filter((el) => el === true).length);
  addColors(tabValBool, ALL_QUESTIONS);
  // je réinitialise le tableau pour pas cumuler les resultats
  tabValBool = [];
}

function displayInfo(compteur) {
  const tailleQuestion = RESPONSES.length;
  console.log({ tailleQuestion, compteur });
  // Si compteur = la taille du tableau de réponse alors
  if (compteur === tailleQuestion) {
    TITLE.innerText = "✅ Bravo t'es le boss";
    AIDE.innerText = "";
    NOTE.innerText = `${tailleQuestion}/${tailleQuestion}`;
  } // sinon si compteur = 0 alors
  else if (compteur === 0) {
    TITLE.innerHTML = "<strong>Tu as joué à la PS4 ?</strong>";
    AIDE.innerText =
      "Retentez une autre réponse dans les cases rouges, puis re-validez !";
    NOTE.innerText = `${compteur}/${tailleQuestion}`;
  } // sinon faire ça
  else {
    TITLE.innerHTML = "<strong> Tu y es presque!Réessaye! </strong>";
    AIDE.innerText =
      "Retentez une autre réponse dans la case rouge, puis re-validez !";
    NOTE.innerText = `${compteur}/${tailleQuestion}`;
  }
}

function addColors(tabValBool, allQuestions) {
  for (let j = 0; j < tabValBool.length; j++) {
    if (tabValBool[j] === true) {
      allQuestions[j].style.background = "lightgreen";
    } else {
      allQuestions[j].style.background = "#ffb8b8";
      allQuestions[j].classList.add("echec");

      setTimeout(() => {
        allQuestions[j].classList.remove("echec");
      }, 500);
    }
  }
}

ALL_QUESTIONS.forEach((item) => {
  item.addEventListener("click", () => {
    item.style.background = "white";
  });
});
