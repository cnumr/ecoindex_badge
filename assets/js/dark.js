(function(){
    const baseUrl = "https://bff.ecoindex.fr";
    const url = window.location.href;
    const badge = document.getElementById("ecoindex-badge");
    const a = document.createElement("a");
    const img = document.createElement("img"); 

    a.href = `${baseUrl}/redirect/?url=${url}`; 
    a.target = "_blank";
    img.src = `${baseUrl}/badge/?theme=dark&url=${url}`;
    a.appendChild(img);
    badge.appendChild(a);
})();