// ========================================
// SCRIPT MINIMAL - LOADER UNIQUEMENT
// ========================================

// Masquer le loader - version ultra-simple
(function() {
    'use strict';
    
    // Fonction pour masquer le loader
    function hideLoader() {
        var loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    }
    
    // Masquer au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(hideLoader, 1500);
        });
    } else {
        setTimeout(hideLoader, 1500);
    }
    
    // Backup: masquer aussi au load complet
    window.addEventListener('load', function() {
        setTimeout(hideLoader, 1500);
    });
    
    // Backup ultime: masquer après 3 secondes maximum
    setTimeout(hideLoader, 3000);
})();

console.log('✅ Loader script chargé');
