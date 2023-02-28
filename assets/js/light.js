(function(){
    const baseUrl = "https://bff.ecoindex.fr";
    const url = window.location.href;
    const badge = document.getElementById("ecoindex-badge");
    const a = document.createElement("a");
    const img = document.createElement("img"); 

    a.href = `${baseUrl}/redirect/?url=${url}`; 
    a.target = "_blank";
    a.title = "Analyse ecoindex";
    img.src = `${baseUrl}/badge/?url=${url}`;
    img.alt = "Badge ecoindex";
    a.appendChild(img);
    badge.appendChild(a);
})();