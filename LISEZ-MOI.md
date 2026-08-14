# EcoAudit_Manager App — version Bureau (Windows)

Ce dossier contient le code complet de la version installée (.exe) de
l'application. Contrairement à la version web, celle-ci peut ouvrir vos
fichiers Word, Excel, PowerPoint, PDF, images... **directement avec votre
logiciel habituel**, sans jamais proposer de téléchargement — exactement
ce qu'il faut pour présenter des preuves documentaires pendant un audit.

Elle garde aussi tout ce qui existait déjà : comptes et rôles, dossiers et
sous-dossiers, messagerie avec accusé de réception, synchronisation en
ligne via Supabase, fonctionnement 100% hors ligne.

## Comment obtenir le fichier .exe (sans rien installer sur votre PC)

Cette méthode utilise **GitHub Actions**, un service gratuit qui compile
le programme à votre place, sur ses propres ordinateurs.

### Étape 1 — Créer un compte GitHub (gratuit)
Rendez-vous sur https://github.com et créez un compte, si vous n'en avez
pas déjà un.

### Étape 2 — Créer un nouveau dépôt (repository)
- Cliquez sur le bouton **"+"** en haut à droite, puis **"New repository"**.
- Donnez-lui un nom, par exemple `ecoaudit-manager-desktop`.
- Laissez-le en **Private** (privé) si vous préférez que personne d'autre
  ne le voie.
- Cliquez sur **"Create repository"**.

### Étape 3 — Déposer les fichiers
- Sur la page de votre nouveau dépôt, cliquez sur **"uploading an existing
  file"** (ou **"Add file" → "Upload files"**).
- Ouvrez le dossier `electron_app` sur votre ordinateur (celui que je vous
  ai fourni), et faites glisser **tout son contenu** (les dossiers
  `.github`, `build`, `renderer`, et les fichiers `main.js`, `package.json`,
  `preload.js`) dans la zone de dépôt de GitHub.
  ⚠️ Important : glissez le **contenu** du dossier, pas le dossier
  `electron_app` lui-même.
- Cliquez sur **"Commit changes"** en bas de page.

### Étape 4 — Laisser GitHub compiler
- Cliquez sur l'onglet **"Actions"** en haut de la page de votre dépôt.
- Une compilation ("Build EcoAudit_Manager App (Windows)") devrait déjà
  être en cours ou terminée. Sinon, cliquez sur "Run workflow".
- Attendez qu'un rond vert ✅ apparaisse (environ 3 à 5 minutes).

### Étape 5 — Télécharger le fichier .exe
- Cliquez sur la compilation terminée (celle avec le rond vert).
- Tout en bas de la page, dans la section **"Artifacts"**, téléchargez
  **"EcoAudit_Manager_App-Windows"** — c'est un fichier .zip contenant
  votre installateur .exe.
- Décompressez-le, puis double-cliquez sur le fichier .exe pour installer
  l'application.

## Une fois installée

L'application se comporte comme n'importe quel logiciel Windows : un
raccourci apparaît sur le Bureau et dans le menu Démarrer. Elle fonctionne
sans connexion Internet ; la synchronisation Supabase se fait
automatiquement dès qu'une connexion est disponible, exactement comme
pour la version web.

**Différence clé avec la version web** : quand vous ajoutez un fichier à
un dossier, vous ne le dupliquez plus — vous le **liez** à son
emplacement réel sur votre ordinateur (bouton "Lier un fichier existant",
ou glisser-déposer). Cliquer sur "Ouvrir" lance alors instantanément Word,
Excel, PowerPoint, Acrobat... selon le type de fichier, sans aucun
téléchargement intermédiaire.
