# Introduction
API pour le projet d'électronique embarquée.  
Voir le fichier DEPLOY.md pour mettre en place l'environnement de développement et déployer l'application sur [localhost](http://localhost:3000/).

# Routes
 - Toutes les routes demandent un token dans l'url : https://api-4moc-blindtest.herokuapp.com?token=token/
 - Toutes les routes renvoient un json :
 ```
 error: boolean
 message: any
 ```

## THEME
### GetAll
- méthode : GET
- route : ['/weather'](http://localhost:3000/weather)

### GetLast
- méthode : GET
- route : ['/weather/last'](http://localhost:3000//weather/1)

### Create
- méthode : POST
- route : ['/weather'](http://localhost:3000/weather)
- body : 
```
"temperature": number,
"humidity": number
```

### Delete
- méthode : DELETE
- route : ['/weather/:id'](https://api-4moc-blindtest.herokuapp.com/weather/1)
