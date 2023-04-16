
const baseUrl = "https://bff.ecoindex.fr";
const badge = document.getElementById("ecoindex-badge");
const theme = badge.getAttribute("data-theme") ?? "light";
const currentUrl = window.location.href;
const textColorTheme = theme === "light" ? "#0d2e38" : "#fff";
const backgroundColorTheme = theme === "light" ? "#eee" : "#0d2e38";
const svg = `
<a id="ecoindex-badge-link" 
    href="" 
    target="_blank" 
	aria-label="badge écoIndex : page non mesurée "
	title="Résultat analyse écoIndex : Page non mesurée "
	>
    <svg width="108" height="32" viewBox="0 0 108 32" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="ecoindex-badge-svg"
        role="img"
        aria-label="badge écoindex : page non mesurée">
        <g clip-path="url(#clip0_125_730)">
            <rect width="108" height="32" rx="15" fill="${backgroundColorTheme}"/>
            <text fill="${textColorTheme}" style="white-space: pre" font-family="Arial" font-size="13" letter-spacing="0">
                <tspan x="12" y="19.5068">Ecoindex</tspan>
            </text>
            <circle id="ecoindex-badge-color-circle" cx="86" cy="16" r="11" fill="grey"/>
            <text fill="#fff" style="white-space: pre" font-family="Arial" font-size="11" font-weight="bold" letter-spacing="0">
                <tspan id="ecoindex-badge-grade" x="82" y="20.3135">?</tspan>
            </text>
        </g>
        <defs>
            <clipPath id="clip0_125_730">
                <rect width="108" height="32" fill="#fff"/>
            </clipPath>
        </defs>
    </svg>
</a>`;

const displayBadge = () => {
    badge.style.display = "none";
    badge.innerHTML = svg;
    const link = document.getElementById("ecoindex-badge-link");
    link.href = `${baseUrl}/redirect/?url=${currentUrl}`;
    fetch(`${baseUrl}/api/results/?url=${currentUrl}`, { method: `GET` })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    const lastResult = data["latest-result"];
                    const grade = lastResult.grade;
                    const svg = document.getElementById("ecoindex-badge-svg");
                    link.setAttribute("title", "Résultat analyse écoIndex : " + grade);
                    link.setAttribute("aria-label", "badge écoindex : résultat analyse = " + grade);
                    svg.setAttribute("aria-label", "badge écoindex : résultat analyse = " + grade);
                    const gradeElement = document.getElementById("ecoindex-badge-grade");
                    gradeElement.textContent = grade;
                    const colorCircleElement = document.getElementById("ecoindex-badge-color-circle");
                    colorCircleElement.style.fill = lastResult.color;
                });
            }
        })
        .catch(console.error)
        .finally(() => {
            badge.style.display = "";
        });
};

displayBadge();
