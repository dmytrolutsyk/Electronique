
# Introduction
API pour l'application iOS 'Blindtest'. 
Le serveur est exposé sur le port 3001 en environnement de développement.

# Repartir de zéro
Supprimer tous les container blindtestapi et heroku

# Lancer en environnement de développement
```
npm install
npm run dev
```

# Déployer

Nécessite que docker et docker-compose soient installés.
Dans le terminal de commande lancer la commande :

## Vérifier le container en local
```
sudo docker-compose up
```

## Déployer le container sur heroku
```
heroku login
```
```
sudo heroku container:login
```

### Optionel : Mettre à jour les variables d'environnement
```
heroku config:set $(cat .env | sed '/^$/d; /#[[:print:]]*$/d')
```

### Optionel: Activer le mode container 
```
sudo heroku stack:set container
```

### Déployer
```
sudo heroku container:push web
```
```
sudo heroku container:release web
```