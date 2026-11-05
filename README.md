# CRM MERN

CRM réalisé pour le TP2 avec React, Express, MongoDB Atlas et Vercel.

## Structure

- `backend/` : API Express et routes CRUD des clients
- `frontend/` : interface React

## Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Compléter `backend/.env` avec l'URI MongoDB Atlas. Ne jamais publier ce fichier.

```bash
npm run dev
```

L'API est disponible sur `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

L'interface est disponible sur `http://localhost:3000`.

## Variables d'environnement

### Backend

- `PORT` : port local de l'API, généralement `4000`
- `MONGODB_URI` : URI privée de MongoDB Atlas
- `FRONTEND_URL` : URL autorisée par CORS

### Frontend

- `REACT_APP_API_URL` : adresse de l'endpoint `/api/clients`

Les variables `REACT_APP_` sont publiques dans le navigateur. Ne jamais y mettre
de secret.

## API

| Méthode | Route | Action |
| --- | --- | --- |
| GET | `/api/clients` | Lister les clients |
| GET | `/api/clients/:id` | Lire un client |
| POST | `/api/clients` | Créer un client |
| PATCH | `/api/clients/:id` | Modifier un client |
| DELETE | `/api/clients/:id` | Supprimer un client |
