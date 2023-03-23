# Ecoindex Badge

[![](https://data.jsdelivr.com/v1/package/gh/cnumr/ecoindex_badge/badge)](https://www.jsdelivr.com/package/gh/cnumr/ecoindex_badge)

Ce projet a pour but de proposer un badge à intégrer à vos pages web facilement. Ce badge va afficher le score Ecoindex de la page web sur laquelle il est intégré et permettra de rediriger l'utilisateur vers la page de détails du score Ecoindex.

## Comment l'intégrer ?

La version la plus simple est de copier-coller le code suivant dans votre page web :

![Ecoindex Badge](https://cdn.jsdelivr.net/gh/cnumr/ecoindex_badge@2/assets/svg/light/A.svg)

```html
<div id="ecoindex-badge"></div>
<script src="https://cdn.jsdelivr.net/gh/cnumr/ecoindex_badge@2/assets/js/ecoindex-badge.js" defer></script>
```

Il existe une variante pour les thèmes sombres :

![Ecoindex Badge](https://cdn.jsdelivr.net/gh/cnumr/ecoindex_badge@2/assets/svg/dark/A.svg)

```html
<div id="ecoindex-badge" data-theme="dark"></div>
<script src="https://cdn.jsdelivr.net/gh/cnumr/ecoindex_badge@2/assets/js/ecoindex-badge.js" defer></script>
```

Cette version est optimisée et permet de ne pas surcharger votre page web avec des scripts inutiles. :

- Badge au format SVG (pas de pixelisation - taille 779 octets)
- JS servi par un CDN (Cache - taille 569 octets)

## Comment ça fonctionne ?

Le script javascript va faire appel au Micro service Back For Front d'Ecoindex pour récupérer l'image SVG correspondante à votre page en se basant sur son url et intégrer le code HTML à la place de la balise `<div id="ecoindex-badge"></div>`.

## Et si je ne veux pas de JS ?

Vous pouvez utiliser la version statique du badge en utilisant le snippet suivant, en modifiant les paramètres `{url}` et `{theme}` (light ou dark)) :

```html
<a href="https://bff.ecoindex.fr/redirect/?url={url}" target="_blank">
    <img src="https://bff.ecoindex.fr/badge/?theme={theme}&url={url}" alt="Ecoindex Badge" />
</a>
```

## À propos du cache

Le badge utilise un cache de 7 jours à 2 niveaux:
- Au niveau [serveur](https://github.com/cnumr/ecoindex_bff#about-caching)
- Au niveau local

> **Bon à savoir:** 
> - On peut **forcer le refresh du cache serveur** en utilisant le [plugin ecoindex](https://github.com/cnumr/ecoindex-browser-plugin). Lorsque l'on clique sur le bouton du plugin pour afficher le détail du résultat, on force une mise à jour du cache serveur.
> - On peut **forcer la mise à jour du cache local** en rechargeant la page avec `ctrl+maj+R`

## Pour contribuer

Vous pouvez contribuer à ce projet en proposant des améliorations ou en signalant des bugs. Pour cela, vous pouvez utiliser les fonctionnalités de GitHub. Retrouvez plus d'infos sur la page [Contribuer](CONTRIBUTING.md).

## Disclaimer

Les valeurs d'ACV utilisées par ecoindex_cli pour évaluer les impacts environnementaux ne sont pas sous licence libre - ©Frédéric Bordage Veuillez également vous référer aux mentions fournies dans les fichiers de code pour les spécificités du régime IP.

## [Licence](LICENSE)

## [Code de conduite](CODE_OF_CONDUCT.md)
