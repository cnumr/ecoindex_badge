const createBadge = (theme, baseUrl, url, hasResult) => {
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
    const createGrade = (grade, baseUrl, url) => {
      const gradeElement = document.createElement(`span`);
      if (grade === undefined) {
        gradeElement.setAttribute(`aria-label`, `Note inconnue`);
        gradeElement.setAttribute(`class`, `undefined`);
        const gradeQElement = document.createElement(`span`);
        gradeQElement.setAttribute(`class`, `alert`);
        gradeQElement.append(`?`);
        const gradeCTAElement = document.createElement(`span`);
        gradeCTAElement.setAttribute(`class`, `cta`);
        gradeCTAElement.append(
          `Page non mesurée. Cliquez pour obtenir la note`
        );
        gradeElement.appendChild(gradeCTAElement);
        gradeElement.appendChild(gradeQElement);
        gradeElement.setAttribute('id', `bt`);
        gradeElement.addEventListener(`click`, (event) => {
          fetch(`${baseUrl}/api/tasks`, {
            method: `POST`,
            body: {
              url: url,
              width: 1920,
              height: 1080,
            },
          })
            .then((response) => {
              if (response.ok) {
                displayBadge();
              } else {
                console.error(`fetch error`);
              }
            })
            .catch(console.error);
        });
      } else {
        gradeElement.setAttribute(`aria-label`, `Note ecoindex`);
        gradeElement.append(grade);
      }
      return gradeElement;
    };
    const createStyle = (theme, color) => {
      const styleElement = document.createElement(`style`);
      styleElement.append(`
        #ecoindex-badge {
          position: fixed;
          left: 10px;
          bottom: 10px;
        }
        #ecoindex-badge #badge {
          background-color: ${theme === `light` ? `#FFF` : `#000`};
          color: ${theme === `light` ? `#000` : `#FFF`};
          border-radius: 1em;
          padding: .3em .4em;
          font-size: 12px;
          font-family: Verdana;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        #ecoindex-badge #badge span {
          background-color: ${color ? color : `#CCC`};
          color: ${
            color === `#CADB2B` || color === `#F6EB17` || color === `#FCCD05`
              ? `#000`
              : `#FFF`
          };
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }
        #ecoindex-badge #badge span.undefined {
          background-color: #CCC;
          border-radius: 1em;
          color: #000;
          width: auto;
          padding: 0 .3em;
          cursor: pointer;
        }
        #ecoindex-badge #badge span.undefined span {
          color: #000;
        }
        #ecoindex-badge #badge span.undefined span.cta,
        #ecoindex-badge #badge span.undefined span.alert {
          display: inline-block;
          width: auto;
        }
        #ecoindex-badge #badge span.undefined span.cta {
          display:none;
        }
        #ecoindex-badge:hover #badge span.undefined span.alert {
          display: none;
        }
        #ecoindex-badge:hover #badge span.undefined span.cta {
          display: inline-block;
        }
      `);
      return styleElement;
    };
    const resetResultBadge = () => {
      const innerBadge = document.getElementById(`badge`);
      if (innerBadge) innerBadge.remove();
    };
    const displayBadge = () => {
      resetResultBadge();
      const baseUrl = `https://bff.ecoindex.fr`;
      const url = window.location.href;
      // const url = `htts://novagaia.fr/`;
      const badge = document.getElementById(`ecoindex-badge`);
      const theme = badge.getAttribute(`data-ecoindex-theme`) ?? `light`;
      fetch(`${baseUrl}/api/results/?url=${url}`, { method: `GET` })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              const lastResult = data[`latest-result`];
              const a = createBadge(theme, baseUrl, url, true);
              const style = createStyle(theme, lastResult.color);
              const grade = createGrade(lastResult.grade);
              a.appendChild(grade);
              badge.appendChild(style);
              badge.appendChild(a);
            });
          } else {
            console.log(`Page non mesurée, proposition...`);
            const a = createBadge(theme, baseUrl, url, false);
            const grade = createGrade(undefined, baseUrl, url);
            const style = createStyle(theme, undefined);
            a.appendChild(grade);
            badge.appendChild(style);
            badge.appendChild(a);
          }
        })
        .catch(console.error);
    };
    displayBadge();
