(function(){
    const baseUrl = "https://bff.ecoindex.fr";
    const url = window.location.href;
    const badge = document.getElementById("ecoindex-badge");
    const theme = badge.getAttribute("data-theme") ?? "light";
    const a = document.createElement("a");
    const img = document.createElement("img");

    a.setAttribute("href", `${baseUrl}/redirect/?url=${url}`);
    a.setAttribute("target","_blank");
    a.setAttribute("title",  "Analyse ecoindex");
    img.setAttribute("src", `${baseUrl}/badge/?theme=${theme}&url=${url}`);
    img.setAttribute("alt", "Badge ecoindex");
    img.setAttribute("width", "108px");
    img.setAttribute("height", "32px");
    a.appendChild(img);
    badge.appendChild(a);
})();
