# Introduction
API pour le projet d'électronique embarquée.  
Voir le fichier DEPLOY.md pour mettre en place l'environnement de développement et déployer l'application sur [heroku](https://api-4moc-blindtest.herokuapp.com/).

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
- route : ['/weather'](https://api-4moc-blindtest.herokuapp.com/weather)

### GetLast
- méthode : GET
- route : ['/weather/last'](https://api-4moc-blindtest.herokuapp.com/weather/1)

### Create
- méthode : POST
- route : ['/weather'](https://api-4moc-blindtest.herokuapp.com/weather)
- body : 
```
"temperature": number,
"humidity": number
```

### Delete
- méthode : DELETE
- route : ['/weather/:id'](https://api-4moc-blindtest.herokuapp.com/weather/1)
