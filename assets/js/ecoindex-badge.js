
const baseUrl = "https://bff.ecoindex.fr";
const badge = document.getElementById("ecoindex-badge");
const theme = badge.getAttribute("data-theme") ?? "light";
const currentUrl = window.location.href;
const textColorTheme = theme === "light" ? "#0d2e38" : "#fff";
const backgroundColorTheme = theme === "light" ? "#eee" : "#0d2e38";

/**
 * Génération d'un svg de cette forme :
 *     <svg
 *         width="108"
 *         height="32"
 *         viewBox="0 0 108 32"
 *         fill="none"
 *         xmlns="http://www.w3.org/2000/svg"
 *         role="img"
 *         aria-label="badge écoindex : page non mesurée">
 *         <g clip-path="url(#clip0_125_730)">
 *             <rect width="108" height="32" rx="15" fill="${backgroundColorTheme}"/>
 *             <text fill="${textColorTheme}" style="white-space: pre" font-family="Arial" font-size="13" letter-spacing="0">
 *                 <tspan x="12" y="19.5068">Ecoindex</tspan>
 *             </text>
 *             <circle cx="86" cy="16" r="11" fill="grey"/>
 *             <text fill="#fff" style="white-space: pre" font-family="Arial" font-size="11" font-weight="bold" letter-spacing="0">
 *                 <tspan x="82" y="20.3135">?</tspan>
 *             </text>
 *         </g>
 *         <defs>
 *             <clipPath id="clip0_125_730">
 *                 <rect width="108" height="32" fill="#fff"/>
 *             </clipPath>
 *         </defs>
 *     </svg>
 *
 * @param backgroundColorTheme
 * @param textColorTheme
 * @param gradeLetter
 * @param gradeColor
 * @param ariaLabel
 * @returns {SVGSVGElement}
 */
const generateSvg = (
    backgroundColorTheme,
    textColorTheme,
    gradeLetter,
    gradeColor,
    ariaLabel
) => {
    const svgns = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgns, "svg");
    svg.setAttribute("width", "108px");
    svg.setAttribute("height", "32px");
    svg.setAttribute("viewBox", "0 0 108 32");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", svgns);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", ariaLabel);

    let svgG = document.createElementNS(svgns, "g");
    svgG.setAttribute("clip-path", "url(#clip0_125_730)");

    let svgGRect = document.createElementNS(svgns, "rect");
    svgGRect.setAttribute("width", "108");
    svgGRect.setAttribute("height", "32");
    svgGRect.setAttribute("rx", "15");
    svgGRect.setAttribute("fill", backgroundColorTheme)

    let svgGText1 = document.createElementNS(svgns, "text");
    svgGText1.setAttribute("fill", textColorTheme);
    svgGText1.setAttribute("style", "white-space: pre");
    svgGText1.setAttribute("font-family", "Arial");
    svgGText1.setAttribute("font-size", "13");
    svgGText1.setAttribute("letter-spacing", "0");

    let svgGText1Tspan = document.createElementNS(svgns, "tspan");
    svgGText1Tspan.setAttribute("x", "12");
    svgGText1Tspan.setAttribute("y", "19.5068");
    svgGText1Tspan.textContent = "Ecoindex";

    let svgGCircle = document.createElementNS(svgns, "circle");
    svgGCircle.setAttribute("cx", "86");
    svgGCircle.setAttribute("cy", "16");
    svgGCircle.setAttribute("r", "11");
    svgGCircle.setAttribute("fill", gradeColor);

    let svgGText2 = document.createElementNS(svgns, "text");
    svgGText2.setAttribute("fill", "#fff");
    svgGText2.setAttribute("style", "white-space: pre");
    svgGText2.setAttribute("font-family", "Arial");
    svgGText2.setAttribute("font-size", "11");
    svgGText2.setAttribute("font-weight", "bold");
    svgGText2.setAttribute("letter-spacing", "0");

    let svgGText2Tspan = document.createElementNS(svgns, "tspan");
    svgGText2Tspan.setAttribute("x", "82");
    svgGText2Tspan.setAttribute("y", "20.3135");
    svgGText2Tspan.textContent = gradeLetter;

    let svgDefs = document.createElementNS(svgns, "defs");
    let svgDefsClipPath = document.createElementNS(svgns, "clipPath");
    svgDefsClipPath.setAttribute("id", "clip0_125_730");
    let svgDefsClipPathRect = document.createElementNS(svgns, "rect");
    svgDefsClipPathRect.setAttribute("width", "108");
    svgDefsClipPathRect.setAttribute("height", "32");
    svgDefsClipPathRect.setAttribute("fill", "#fff");

    svgGText1.appendChild(svgGText1Tspan);
    svgGText2.appendChild(svgGText2Tspan);
    svgG.appendChild(svgGRect);
    svgG.appendChild(svgGText1);
    svgG.appendChild(svgGCircle);
    svgG.appendChild(svgGText2);
    svg.appendChild(svgG)

    svgDefsClipPath.appendChild(svgDefsClipPathRect);
    svgDefs.appendChild(svgDefsClipPath);
    svg.appendChild(svgDefs)

    return svg;
}

/**`
 * <a
 *    href=""
 *    target="_blank"
 *    title="Résultat analyse écoIndex : Page non mesurée "
 *    aria-label="badge écoIndex : page non mesurée"
 *    >
 *    ...
 * </a>
 *
 * @param href
 * @param title
 * @param ariaLabel
 * @returns {HTMLAnchorElement}
 */
const generateLink = (href, title, ariaLabel) => {

    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("target", "_blank");
    link.setAttribute("title", title);
    link.setAttribute("aria-label", ariaLabel);

    return link;
}

const displayBadge = () => {
    badge.style.display = "none";
    const LinkHref = `${baseUrl}/redirect/?url=${currentUrl}`;
    let linkTitle = "Résultat analyse écoIndex : Page non mesurée";
    let linkAriaLabel = "badge écoIndex : page non mesurée";
    let gradeLetter = "?";
    let gradeColor = "grey";
    let svgAriaLabel = "badge écoindex : page non mesurée";
    fetch(`${baseUrl}/api/results/?url=${currentUrl}`, { method: `GET` })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return new Promise((resolve, reject) =>
                reject(`Erreur dans l'appel à l'écoindex de : ${currentUrl}`)
            );
        })
        .then((data) => {
            const lastResult = data["latest-result"];
            const grade = lastResult.grade;
            linkTitle ="Résultat analyse écoIndex : " + grade;
            linkAriaLabel = "badge écoindex : résultat analyse = " + grade;
            svgAriaLabel = "badge écoindex : résultat analyse = " + grade;
            gradeLetter = grade;
            gradeColor = lastResult.color;
        })
        .catch(console.error)
        .finally(() => {
            let a = generateLink(LinkHref, linkTitle, linkAriaLabel);
            const svg = generateSvg(backgroundColorTheme, textColorTheme, gradeLetter, gradeColor, svgAriaLabel)
            a.appendChild(svg);
            badge.appendChild(a);
            badge.style.display = "";
        });
};

displayBadge();
