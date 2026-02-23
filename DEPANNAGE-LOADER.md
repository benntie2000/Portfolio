# 🔧 Guide de Dépannage du Loader

## Problème: Le loader reste bloqué

### Solution 1: Vérifier les fichiers (RECOMMANDÉ)

Assurez-vous que les 3 fichiers sont bien dans le même dossier :
- ✅ `index.html`
- ✅ `style.css`
- ✅ `script.js`

### Solution 2: Utiliser le script minimal

Si le problème persiste, remplacez le script par la version minimale :

1. Ouvrez `index.html`
2. Trouvez cette ligne à la fin (avant `</body>`) :
   ```html
   <script src="script.js"></script>
   ```
3. Remplacez-la par :
   ```html
   <script src="loader-minimal.js"></script>
   ```

### Solution 3: Test rapide - Supprimer le loader

Si vous voulez juste tester le site sans loader :

**Option A - Via le HTML:**
Ouvrez `index.html` et **commentez** ou **supprimez** les lignes 16 à 35 :
```html
<!-- Supprimer ou commenter ces lignes -->
<!--
<div class="loader-wrapper" id="loader">
    ...
</div>
-->
```

**Option B - Via le CSS:**
Ajoutez ceci en haut de `style.css` :
```css
.loader-wrapper {
    display: none !important;
}
```

### Solution 4: Vérifier la console du navigateur

1. Ouvrez la page
2. Appuyez sur **F12** (Chrome/Firefox) ou **Cmd+Option+I** (Mac)
3. Allez dans l'onglet **Console**
4. Cherchez les erreurs en rouge
5. Envoyez-moi les messages d'erreur

### Solution 5: Test dans différents navigateurs

Essayez d'ouvrir la page dans :
- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Edge
- ⚠️ Safari (peut avoir des problèmes avec certaines animations)

### Solution 6: Désactiver les extensions du navigateur

Certaines extensions (bloqueurs de pub, antivirus) peuvent bloquer les scripts :
1. Ouvrez en **mode navigation privée**
2. Ou désactivez temporairement les extensions

## 🎯 Solution Rapide - Code à ajouter en haut de index.html

Ajoutez ce script dans le `<head>` de votre HTML, juste après la balise `<title>` :

```html
<script>
// Masquer le loader après 2 secondes - GARANTI
setTimeout(function() {
    var loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}, 2000);
</script>
```

## ✅ Test Final

Après avoir appliqué une solution, actualisez la page :
- **Ctrl + F5** (Windows/Linux)
- **Cmd + Shift + R** (Mac)

Cela efface le cache et recharge complètement.

## 📊 Versions des fichiers

### Version actuelle
- **CSS** : Avec animation `autoHideLoader` (masque automatiquement après 2s)
- **JS** : Double vérification avec DOMContentLoaded + load
- **JS Minimal** : Version ultra-légère en backup

### Ce qui devrait se passer
1. ⏱️ Le loader s'affiche (terminal cybersécurité)
2. ⏱️ Après 1.5 à 2 secondes
3. ✅ Le loader disparaît en fondu
4. 🎉 Le portfolio s'affiche

## 🆘 Toujours bloqué ?

Si aucune solution ne fonctionne, il peut y avoir :
- Un problème de serveur local
- Un cache navigateur tenace
- Un conflit avec un antivirus

**Test ultime** : Ouvrez le fichier directement depuis l'explorateur de fichiers (double-clic sur index.html).

## 💡 Astuce développeur

Pour voir ce qui se passe, ajoutez des console.log :

```javascript
console.log('1. Page chargée');
setTimeout(function() {
    console.log('2. Tentative de masquage du loader');
    var loader = document.getElementById('loader');
    console.log('3. Loader trouvé:', loader);
    if (loader) {
        loader.style.display = 'none';
        console.log('4. Loader masqué avec succès');
    }
}, 2000);
```

Puis regardez la console (F12) pour voir où ça bloque.
