interface CurrentResponse {
    'latest-result': {
        color: string;
        grade: string;
    };
}

const baseUrl = 'https://bff.ecoindex.fr';
const badge: HTMLElement | null = document.getElementById('ecoindex-badge');
const theme: string = badge?.getAttribute('data-theme') ?? 'light';
const currentUrl: string = window.location.href;
const textColorTheme: string = theme === 'light' ? '#0d2e38' : '#fff';
const backgroundColorTheme: string = theme === 'light' ? '#eee' : '#0d2e38';

/**
 * Méthode servant à créer le badge de résultat de mesure.
 */
const createBadgeLink = (
    href: string,
    title: string,
    ariaLabel: string
): HTMLAnchorElement => {
    const badgeElement = document.createElement('a');
    badgeElement.setAttribute('href', href);
    badgeElement.setAttribute('target', '_blank');
    badgeElement.setAttribute('rel', 'noreferrer');
    badgeElement.setAttribute('id', 'ecoindex-badge-link');
    badgeElement.setAttribute('title', title);
    badgeElement.setAttribute('aria-label', ariaLabel);
    badgeElement.append('Ecoindex');

    return badgeElement;
};

/**
 * Methode servant à afficher la note ou des actions/informations pour déclancher une mesure.
 * @param {String} grade Note obtenu par l'API
 */
const createGrade = (grade: string) => {
    const gradeElement = document.createElement('span');
    gradeElement.setAttribute('class', 'ecoindex-letter');
    gradeElement.append(grade);
    return gradeElement;
};

/**
 * Méthode servant à générer le design du badge et ses enfants/alternatives.
 */
const createStyle = (gradeColor: string): HTMLStyleElement => {
    const styleElement: HTMLStyleElement = document.createElement('style');
    styleElement.append(`
    #ecoindex-badge {
      width: 108px;
      font-family: "Arial";
    }
    #ecoindex-badge-link {
      border-radius: 1.3em;
      padding: .5em .5em .5em .8em;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.85em;
      font-size: 13px;
      background-color: ${backgroundColorTheme};
      color: ${textColorTheme};
    }
    #ecoindex-badge #ecoindex-badge-link span.ecoindex-letter {
      height: 22px;
      width: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${gradeColor};
      color: #FFF;
      border-radius: 50%;
      font-size: 11px ;
      font-weight: bold; 
    }
    `);

    return styleElement;
};

/**
 * Méthode servant à reset le badge.
 */
const resetResultBadge = (): void => {
    const innerBadge: HTMLElement | null = document.getElementById(
        'ecoindex-badge-link'
    );
    if (innerBadge) {
        innerBadge.remove();
    }
};

/**
 * Méthode appelée lorsque le script se charge. Il ajoute à la balise div#ecoindex-badge le badge de ecoindex.
 */
const displayBadge = (): void => {
    if (!badge) {
        return;
    }

    badge.style.display = 'none';
    resetResultBadge();
    const LinkHref = `${baseUrl}/redirect/?url=${currentUrl}`;
    let linkTitle = 'Résultat analyse écoIndex : Page non mesurée';
    let linkAriaLabel = 'badge écoIndex : page non mesurée';
    let gradeLetter = '?';
    let gradeColor = 'grey';
    fetch(`${baseUrl}/api/results/?url=${currentUrl}`, { method: `GET` })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return new Promise((resolve, reject) =>
                reject(`Erreur dans l'appel à l'écoindex de : ${currentUrl}`)
            );
        })
        .then((data: CurrentResponse) => {
            const lastResult = data['latest-result'];
            const grade = lastResult.grade;
            linkTitle = 'Résultat analyse écoIndex : ' + grade;
            linkAriaLabel = 'badge écoindex : résultat analyse = ' + grade;
            gradeLetter = grade;
            gradeColor = lastResult.color;
        })
        .catch(console.error)
        .finally(() => {
            const grade = createGrade(gradeLetter);
            const a = createBadgeLink(LinkHref, linkTitle, linkAriaLabel);
            const style = createStyle(gradeColor);
            a.appendChild(grade);
            badge.appendChild(style);
            badge.appendChild(a);
            badge.style.display = '';
        });
};

displayBadge();
