# EcoAudit_Manager App — version Android (.apk)

Ce dossier s'ajoute à votre dépôt GitHub existant (le même que pour la
version Windows) — pas besoin d'un nouveau compte ni d'un nouveau dépôt.

## Étapes

1. Sur GitHub, ouvrez votre dépôt "EcoAudit-Manager-App".
2. À la racine (pas dans un sous-dossier), **Add file → Upload files**,
   et déposez :
   - Le dossier **`android_app`** en entier (avec `www/`,
     `package.json`, `capacitor.config.json`)
   - Le fichier **`android-build.yml`** — à placer dans le dossier
     `.github/workflows/` déjà existant (comme pour `build.yml`, la
     version Windows)
3. **Commit changes**.
4. Allez dans l'onglet **Actions** : une nouvelle compilation
   "Build EcoAudit_Manager App (Android)" doit démarrer automatiquement
   (elle est indépendante de celle de Windows). Comptez environ
   8 à 12 minutes la première fois (plus long que Windows, Android a
   plus d'ingrédients à télécharger).
5. Une fois le rond vert ✅ obtenu, ouvrez la compilation, descendez
   à **Artifacts**, téléchargez **"EcoAudit_Manager_App-Android"**
   (un .zip contenant le fichier `app-debug.apk`).

## Installer le .apk sur le téléphone/tablette

1. Transférez le fichier `.apk` sur l'appareil Android (par e-mail,
   Google Drive, clé USB…).
2. Ouvrez-le depuis le gestionnaire de fichiers du téléphone.
3. Android demandera d'autoriser l'installation depuis cette source —
   c'est normal pour toute application qui n'est pas passée par le
   Google Play Store. Acceptez.
4. L'application s'installe comme n'importe quelle autre, avec une
   icône sur l'écran d'accueil.

## À savoir

- Ce `.apk` est une version "debug" (non signée pour le Play Store) —
  parfaitement fonctionnelle pour un usage interne à l'entreprise,
  mais Android peut afficher un avertissement "source inconnue" au
  moment de l'installation. C'est normal et sans danger : c'est vous
  qui contrôlez le fichier.
- La synchronisation en ligne (Supabase), la messagerie, les dossiers
  fonctionnent exactement comme sur la version web.
- Pour les mises à jour futures : remplacez `android_app/www/index.html`
  par la nouvelle version, comme on le fait pour `renderer/index.html`
  côté Windows, et laissez GitHub recompiler.
