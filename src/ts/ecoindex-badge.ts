interface ApiResponseInterface {
    'latest-result': {
        color: string;
        grade: string;
    };
}

const baseUrl = 'https://bff.ecoindex.fr';
const badge: HTMLElement | null = document.getElementById('ecoindex-badge');
const LightTheme = 'light';
const isLightTheme: boolean =
    (badge?.getAttribute('data-theme') ?? LightTheme) === LightTheme;
const currentUrl: string = window.location.href;
const darkColor = '#0d2e38';
const textColorTheme: string = isLightTheme ? darkColor : '#fff';
const backgroundColorTheme: string = isLightTheme ? '#eee' : darkColor;

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
    gradeElement.setAttribute('id', 'ecoindex-badge-letter');
    gradeElement.append(grade);
    return gradeElement;
};

/**
 * Méthode servant à générer le design du badge et ses enfants/alternatives.
 */
const createStyle = (gradeColor: string): HTMLStyleElement => {
    const styleElement: HTMLStyleElement = document.createElement('style');
    const style =
        /*
            #ecoindex-badge {
                width: 108px;
                font-family: "Arial", sans-serif;
            }
         */
        '#ecoindex-badge{font-family:Arial,sans-serif;width:108px}' +
        /*
            #ecoindex-badge-link {
                border-radius: 1.3em;
                padding: .5em .5em .5em .8em;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 0.85em;
                font-size: 13px;
                background-color: = ${backgroundColorTheme};
                color: ${textColorTheme};
            }
        */
        `#ecoindex-badge-link{align-items:center;border-radius:1.3em;display:flex;font-size:13px;gap:.85em;padding:.5em .5em .5em .8em;text-decoration:none;background-color:${backgroundColorTheme};color:${textColorTheme};}` +
        /*
            #ecoindex-badge-letter {
                height: 22px;
                width: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #FFF;
                border-radius: 50%;
                font-size: 11px ;
                font-weight: bold;
                background-color: ${gradeColor};
            }
        */
        `#ecoindex-badge-letter{align-items:center;border-radius:50%;color:#fff;display:flex;font-size:11px;font-weight:700;height:22px;justify-content:center;width:22px;background-color:${gradeColor}};`;
    styleElement.append(style);
    return styleElement;
};
//
// /**
//  * Méthode servant à reset le badge.
//  */
// const resetResultBadge = (): void => {
//     const innerBadge: HTMLElement | null = document.getElementById(
//         'ecoindex-badge-link'
//     );
//     if (innerBadge) {
//         innerBadge.remove();
//     }
// };

/**
 * Méthode appelée lorsque le script se charge. Il ajoute à la balise div#ecoindex-badge le badge de ecoindex.
 */
const displayBadge = (): void => {
    if (!badge) {
        return;
    }

    badge.style.display = 'none';
    // resetResultBadge();
    const LinkHref = `${baseUrl}/redirect/?url=${currentUrl}`;
    const title = 'Résultat analyse écoIndex : ';
    const ariaLabel = 'badge écoIndex : ';
    let linkTitle = title + 'Page non mesurée';
    let linkAriaLabel = ariaLabel + 'page non mesurée';
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
        .then((data: ApiResponseInterface) => {
            const lastResult = data['latest-result'];
            const grade = lastResult.grade;
            linkTitle = title + grade;
            linkAriaLabel = ariaLabel + 'résultat analyse = ' + grade;
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
