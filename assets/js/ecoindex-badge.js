(function(){
    const baseUrl = "https://bff.ecoindex.fr";
    const url = window.location.href;
    const badge = document.getElementById("ecoindex-badge");
    const theme = badge.getAttribute("data-theme") ?? "light";
    const a = document.createElement("a");
    const img = document.createElement("img");

    a.href = `${baseUrl}/redirect/?url=${url}`; 
    a.target = "_blank";
    a.title = "Analyse ecoindex";
    img.src = `${baseUrl}/badge/?theme=${theme}&url=${url}`;
    img.alt = "Badge ecoindex";
    img.setAttribute('width', "108px");
    img.setAttribute('height', "32px");
    a.appendChild(img);
    badge.appendChild(a);
})();
