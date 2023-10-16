# Path SVG
Exemple de data envoyé pour tracer un path/line:

```javascript
path = M0,226.925L17.712,182.914L56.035,208.587L371.196,98.85L478,106.011L478,231L371.196,231L56.035,231L17.712,231L0,231Z
```

Le seul attribut requis pour un path est "d" (pour data) qui prend le path ci-dessus.

## Exemple avec les données de Malte:

#### Données
```javascript
data = {
    "name": "Malta",
    "series": [
        {
            "value": 2075,
            "name": "2016-09-15T03:08:17.106Z"
        },
        {
            "value": 2831,
            "name": "2016-09-15T10:33:02.943Z"
        },
        {
            "value": 2390,
            "name": "2016-09-16T02:35:22.293Z"
        },
        {
            "value": 4275,
            "name": "2016-09-21T14:29:18.284Z"
        },
        {
            "value": 4152,
            "name": "2016-09-23T11:11:14.142Z"
        }
    ]
}

// Equivalent retourné sous forme d'un path
Path = M0,226.925L17.712,182.914L56.035,208.587L371.196,98.85L478,106.011
```

#### Courbe résultante
![Courbe résultante](image.png)

#### Traduction des données du path :
* M : Debut du path 
* Z : Fin du path
* L : trace une ligne entre les dernières coordonnées mentionnés

Les séparateurs entre x et y sont ici une virgule, le point doit être considé&ré dans notre cas comme une virgule pour une valeur décimale.

* Mx,y : Premier point
* L : Liaison entre le point précédent et le suivant
* x,y : Point suivant

Ce qui donne ici :

* point 1 { 0, 226.925 }
* point 2 { 17.172, 182.914 }
* etc... le tout relié par des lignes droites (L)