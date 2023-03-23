/**
 * Méthode servant à créer le badge de résultat de mesure.
 * @param {String} baseUrl Url du serveur d'API.
 * @param {String} url Url de la page testée.
 * @param {Boolean} hasResult indique si la requête a réussi et qu'il y a un résultat.
 */
const createBadge = (baseUrl, url, hasResult) => {
  let badgeElement = undefined;
  if (hasResult) {
    badgeElement = document.createElement(`a`);
    badgeElement.setAttribute(`href`, `${baseUrl}/redirect/?url=${url}`);
    badgeElement.setAttribute(`target`, `_blank`);
    badgeElement.setAttribute(`rel`, `noreferrer`);
  } else {
    badgeElement = document.createElement(`div`);
  }
  badgeElement.setAttribute(`id`, `badge`);
  badgeElement.setAttribute(`title`, `Analyse ecoindex`);
  badgeElement.setAttribute(`aria-label`, `Badge ecoindex`);
  badgeElement.append(`Ecoindex`);
  return badgeElement;
};
/**
 * Methode servant à afficher la note ou des actions/informations pour déclancher une mesure.
 * @param {String} grade Note obtenu par l'API
 * @param {String} baseUrl Url du serveur d'API.
 * @param {String} url Url de la page testée.
 */
const createGrade = (grade, baseUrl, url) => {
  const gradeElement = document.createElement(`span`);
  if (grade === undefined) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const waitElement = document.createElement(`span`);
    waitElement.setAttribute(`class`, `wait`);
    waitElement.append(`Mesure en cours...`);
    /**
     * Sub Méthode servant à lancer la demande de mesure.
     * @param {HTMLElement} gradeElement Composant HTML encapsulant les actions/informations possibles.
     */
    const launchMesure = (gradeElement) => {
      gradeElement.replaceChildren(waitElement);
      fetch(`${baseUrl}/api/tasks`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          width: 1920,
          height: 1080,
        }),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              getMesureResult(data);
            });
          } else {
            const limitReachedElement = document.createElement(`span`);
            limitReachedElement.setAttribute(`class`, `limit-reached`);
            limitReachedElement.append(
              `Le nombre de mesures est limité. Veuillez réessayer demain.`
            );
            gradeElement.replaceChildren(limitReachedElement);
          }
        })
        .catch(console.error);
    };
    /**
     * Sub Méthode servant à dléncher l'actualisation du badge si la mesure est terminée ou informant que le nombre de mesures à été atteint.
     * @param {HTMLElement} gradeElement Composant HTML encapsulant les actions/informations possibles.
     */
    const getMesureResult = (data) => {
      fetch(`${baseUrl}/api/tasks/${data}`, {
        method: `GET`,
      })
        .then(async (response) => {
          if (response.ok) {
            displayBadge();
          } else {
            await delay(15000);
            getMesureResult(data);
          }
        })
        .catch(async () => {
          await delay(15000);
          getMesureResult(data);
        });
    };
    gradeElement.setAttribute(`aria-label`, `Site pas encore noté`);
    gradeElement.setAttribute(`class`, `undefined`);
    const gradeQElement = document.createElement(`span`);
    gradeQElement.setAttribute(`class`, `alert`);
    gradeQElement.append(`?`);
    const gradeCTAElement = document.createElement(`span`);
    gradeCTAElement.setAttribute(`class`, `cta`);
    gradeCTAElement.append(`Page non mesurée. Cliquez pour obtenir la note`);
    gradeElement.appendChild(gradeCTAElement);
    gradeElement.appendChild(gradeQElement);
    gradeElement.setAttribute('id', `bt`);
    gradeElement.addEventListener(`click`, (event) => {
      event.preventDefault();
      if (
        event.pointerType === `touch` &&
        event.target.getAttribute(`class`) === `cta`
      ) {
        if (event.target.getAttribute(`data-link-opened`) !== `true`) {
          event.target.setAttribute(`data-link-opened`, `true`);
          return null;
        }
      }
      if (
        event.pointerType !== `touch` ||
        (event.pointerType === `touch` &&
          event.target.getAttribute(`data-link-opened`) === `true`)
      ) {
        launchMesure(gradeElement);
      }
    });
  } else {
    gradeElement.setAttribute(`aria-label`, `Note ecoindex`);
    gradeElement.setAttribute(`class`, `defined`);
    gradeElement.append(grade);
  }
  return gradeElement;
};
/**
 * Méthode servant à générer le design du badge et ses enfants/alternatives.
 * @param {string} baseUrl
 * @param {string} url
 *
 */
const createStyle = (theme, color) => {
  const styleElement = document.createElement(`style`);
  styleElement.append(`
    #ecoindex-badge {
      position: fixed;
      left: 10px;
      bottom: 10px;
    }
    #ecoindex-badge #badge {
      background-color: ${theme === `light` ? `#EEE` : `#0F2E39`};
      color: ${theme === `light` ? `#0F2E39` : `#FFF`};
      border-radius: 1.3em;
      padding: .5em .5em .5em .8em;
      font-size: 14px;
      font-family: Verdana;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.41em;
    }
    #ecoindex-badge #badge span.defined,
    #ecoindex-badge #badge span.undefined {
      height: 1.5em;
      line-height: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #ecoindex-badge #badge span.defined {
      background-color: ${color ? color : `#808080`};
      color: ${
        color === `#CADB2A` || color === `#F6EB17` || color === `#FECD06`
          ? `#000`
          : `#FFF`
      };
      border-radius: 50%;
      width: 1.5em;
      font-weight: 500;
    }
    #ecoindex-badge #badge span.undefined {
      background-color: #808080;
      border-radius: 1em;
      min-width: 1.5em;
      cursor: pointer;
    }
    #ecoindex-badge #badge span.undefined span.cta,
    #ecoindex-badge #badge span.undefined span.alert {
      color: #FFF;
      display: inline-block;
    }
    #ecoindex-badge #badge span.undefined span.cta {
      display:none;
    }
    #ecoindex-badge:hover #badge span.undefined span.alert {
      display: none;
    }
    #ecoindex-badge:hover #badge span.undefined span.cta {
      display: inline-block;
      padding-left: .5em;
      padding-right: .5em;
      width: auto;
    }
    #ecoindex-badge #badge span.undefined span.wait,
    #ecoindex-badge #badge span.undefined span.limit-reached {
      padding-left: .5em;
      padding-right: .5em;
    }
    #ecoindex-badge #badge span.undefined span.limit-reached {
      font-weight: bold;
    }
  `);
  return styleElement;
};
/**
 * Méthode servant à reset le badge.
 */
const resetResultBadge = () => {
  const innerBadge = document.getElementById(`badge`);
  if (innerBadge) innerBadge.remove();
};
/**
 * Méthode appelée lorsque le script se charge. Il ajoute à la balise div#ecoindex-badge le badge de ecoindex.
 */
const displayBadge = () => {
  resetResultBadge();
  const baseUrl = `https://bff.ecoindex.fr`;
  const url = window.location.href;
  const badge = document.getElementById(`ecoindex-badge`);
  const theme = badge.getAttribute(`data-ecoindex-theme`) ?? `light`;
  const undefinedResult = () => {
    console.log(`Page non mesurée, proposition...`);
    const a = createBadge(baseUrl, url, false);
    const grade = createGrade(undefined, baseUrl, url);
    const style = createStyle(theme, undefined);
    a.appendChild(grade);
    badge.appendChild(style);
    badge.appendChild(a);
  };
  fetch(`${baseUrl}/api/results/?url=${url}`, { method: `GET` })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const lastResult = data[`latest-result`];
          const style = createStyle(theme, lastResult.color);
          const grade = createGrade(lastResult.grade);
          if (lastResult.grade !== '') {
            const a = createBadge(baseUrl, url, true);
            a.appendChild(grade);
            badge.appendChild(style);
            badge.appendChild(a);
          } else undefinedResult();
        });
      } else {
        undefinedResult();
      }
    })
    .catch(console.error);
};
displayBadge();
