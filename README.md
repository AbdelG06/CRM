# CRM MERN - TP2

CRM de gestion des clients réalisé avec React, Express, Node.js, MongoDB Atlas,
Postman, GitHub et Vercel.

## 1. Prérequis

Installer :

- Node.js LTS et npm ;
- Git ;
- Postman ;
- un compte GitHub ;
- un compte MongoDB Atlas ;
- un compte Vercel.

Vérifier les installations :

```bash
node -v
npm -v
git --version
```

## 2. Créer le projet et initialiser Git

Créer le dossier du projet, puis l'ouvrir dans VS Code :

```bash
mkdir crm-mern
cd crm-mern
git init -b main
```

Créer le fichier `.gitignore` à la racine :

```gitignore
node_modules/
.env
build/
.vercel/
.DS_Store
```

Le fichier `.env` contient des secrets et ne doit jamais être envoyé sur GitHub.

## 3. Créer la base MongoDB Atlas

Dans MongoDB Atlas :

1. Créer un projet nommé `CRM-TP2`.
2. Créer un cluster gratuit M0 nommé `crm-cluster`.
3. Créer un utilisateur de base de données.
4. Ajouter `0.0.0.0/0` dans l'IP Access List pour permettre la connexion depuis
   Vercel.
5. Copier l'URI dans `Clusters > Connect > Drivers > Node.js`.
6. Remplacer le mot de passe dans l'URI et ajouter `/crm` avant le `?`.

L'URI complète reste uniquement dans `backend/.env`.

## 4. Créer le backend

Depuis la racine du projet :

```bash
mkdir backend
cd backend
npm init -y
npm install adding  mongoose cors dotenv
npm install --save-dev nodemon
```

Les fichiers du backend sont organisés ainsi :

```text
backend/
├── config/db.js       # Connexion à MongoDB Atlas
├── models/Client.js   # Schéma et règles d'un client
├── routes/clients.js  # Routes CRUD de l'API
├── server.js          # Serveur Express
├── .env.example       # Exemple sans secret
└── .env               # Configuration locale, ignorée par Git
```

Créer `backend/.env` :

```env
PORT=4000
MONGODB_URI=mongodb+srv://UTILISATEUR:MOT_DE_PASSE@HOTE_ATLAS/crm?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:3000
```

Ne jamais publier le vrai contenu de ce fichier.

Lancer l'API :

```bash
npm run dev
```

L'API répond sur `http://localhost:4000`.

## 5. Créer le frontend

Dans un autre terminal, depuis la racine `crm-mern` :

```bash
npx create-react-app frontend
cd frontend
npm install
```

Les fichiers principaux sont :

```text
frontend/
├── public/index.html           # Page HTML unique de la SPA
├── src/App.js                  # Composant principal
├── src/App.css                 # Style de l'interface
├── src/index.js                # Point d'entrée React
├── src/components/Header.js   # Titre et nombre de clients
├── src/components/ClientForm.js
├── src/components/ClientList.js
├── src/services/clientService.js
├── .env.example
└── .env                        # Configuration locale, ignorée par Git
```

Créer `frontend/.env` :

```env
REACT_APP_API_URL=http://localhost:4000/api/clients
```

Lancer l'interface :

```bash
npm start
```

Ouvrir `http://localhost:3000`.

Le backend et le frontend doivent être lancés dans deux terminaux différents.

## 6. Fonctionnalités du CRM

L'interface permet de :

- ajouter un client avec son nom, son email et son entreprise ;
- afficher tous les clients ;
- modifier le statut : `prospect`, `client` ou `inactif` ;
- rechercher par nom ou email ;
- supprimer un client ;
- afficher les erreurs de validation et les doublons.

React appelle uniquement l'API. Il ne se connecte jamais directement à MongoDB.

## 7. Tester l'API avec Postman

Base URL :

```text
http://localhost:4000/api/clients
```

### Créer un client

`POST /api/clients`, Body `raw` au format JSON :

```json
{
  "nom": "Sara Amrani",
  "email": "sara@example.com",
  "entreprise": "Atlas Digital"
}
```

Réponse attendue : `201 Created`.

### Lire les clients

`GET /api/clients`

Réponse attendue : `200 OK`.

### Modifier le statut

`PATCH /api/clients/:id`

```json
{
  "statut": "client"
}
```

Réponse attendue : `200 OK`.

### Supprimer un client

`DELETE /api/clients/:id`

Réponse attendue : `200 OK`.

### Vérifier les erreurs

| Test | Résultat attendu |
| --- | --- |
| Email déjà utilisé | `409 Conflict` |
| Nom manquant | `400 Bad Request` |
| Statut `urgent` | `400 Bad Request` |
| Identifiant `bonjour` | `400 Bad Request` |
| Suppression d'un client déjà supprimé | `404 Not Found` |

## 8. Tester le frontend et le build

Depuis `frontend/` :

```bash
npm run build
```

Le build de production est créé dans `frontend/build/`.

## 9. Publier sur GitHub

Depuis la racine `crm-mern` :

```bash
git status
git add .
git commit -m "Construire le CRM MERN"
git remote add origin https://github.com/TON_COMPTE/crm-mern.git
git push -u origin main
```

Avant le push, vérifier que les secrets ne sont pas suivis :

```bash
git ls-files | grep env
```

Il faut voir `.env.example`, mais jamais `.env`.

## 10. Déployer le backend sur Vercel

1. Ouvrir Vercel et choisir **Add New > Project**.
2. Importer le dépôt GitHub.
3. Nommer le projet `crm-backend`.
4. Dans **Root Directory**, sélectionner `backend`.
5. Ajouter la variable d'environnement :

   ```text
   MONGODB_URI = URI complète MongoDB Atlas
   ```

6. Déployer.

Tester ensuite :

```text
https://ADRESSE-BACKEND.vercel.app/
https://ADRESSE-BACKEND.vercel.app/api/clients
```

La première adresse doit renvoyer `API CRM opérationnelle`.

## 11. Déployer le frontend sur Vercel

1. Créer un deuxième projet Vercel avec le même dépôt GitHub.
2. Le nommer `crm-frontend`.
3. Sélectionner `frontend` comme **Root Directory**.
4. Vérifier la commande de build :

   ```text
   npm run build
   ```

5. Ajouter la variable :

   ```text
   REACT_APP_API_URL=https://ADRESSE-BACKEND.vercel.app/api/clients
   ```

6. Déployer.

## 12. Configurer CORS en production

Dans le projet Vercel `crm-backend` :

1. Ouvrir **Settings > Environment Variables**.
2. Ajouter :

   ```text
   FRONTEND_URL=https://ADRESSE-FRONTEND.vercel.app
   ```

3. Aller dans **Deployments**.
4. Cliquer sur `...` puis **Redeploy**.

Une variable Vercel modifiée ne s'applique qu'après un nouveau déploiement.

## 13. Vérification finale

Vérifier que :

- le frontend est accessible avec son URL Vercel ;
- un client peut être ajouté ;
- le statut peut être modifié ;
- la recherche fonctionne ;
- un client peut être supprimé ;
- les données restent présentes après actualisation ;
- les clients apparaissent dans Atlas Data Explorer ;
- le dépôt GitHub ne contient aucun `.env`.

## Variables d'environnement

| Variable | Local | Production |
| --- | --- | --- |
| `MONGODB_URI` | URI Atlas privée | URI Atlas dans Vercel |
| `FRONTEND_URL` | `http://localhost:3000` | URL Vercel du frontend |
| `PORT` | `4000` | Ne pas définir sur Vercel |
| `REACT_APP_API_URL` | URL API locale | URL API Vercel + `/api/clients` |
