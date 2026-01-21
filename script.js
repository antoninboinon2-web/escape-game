// Configuration des codes et récompenses
const CODES = {
    'ALPHA': {
        type: 'text',
        title: 'INDICE DÉCHIFFRÉ',
        content: `Le coffre-fort principal se trouve dans la bibliothèque.
        
Cherchez le livre avec une couverture rouge.
        
Derrière la troisième étagère, vous trouverez un compartiment secret.
        
Le code d'ouverture est composé des initiales des quatre saisons.`
    },
    'BRAVO': {
        type: 'image',
        title: 'PLAN RÉVÉLÉ',
        imageUrl: 'https://via.placeholder.com/600x400/000000/00ff00?text=PLAN+SECRET', // Remplacer par votre URL d'image
        description: 'Carte des lieux avec l\'emplacement de l\'objet marqué d\'un X'
    },
    'CHARLIE': {
        type: 'redirect',
        title: 'ACCÈS AUTORISÉ',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Remplacer par votre URL
        message: 'Redirection vers le fichier confidentiel...'
    },
    '2133': {
        type: 'text',
        title: 'LIVRE MÉDÉ',
        content: 'La réponse est au début de la fin et à la fin du début'
    },
    '4992': {
        type: 'image',
        title: 'IMAGE RÉVÉLÉE',
        imageUrl: 'IMG_5359.jpeg',
        description: ''
    },
    '0351': {
        type: 'audio',
        title: 'MESSAGE AUDIO',
        audioUrl: 'morse.mp3',
        description: 'Lecture du message en cours...'
    },
    '0537': {
        type: 'text',
        title: 'LISTE D\'OBJETS',
        content: `1. Cadeaux violets
        
2. Planches derrière TV
        
3. Verres à pieds
        
4. Oreillers`
    },
    '542146': {
        type: 'image',
        title: 'IMAGE RÉVÉLÉE',
        imageUrl: 'IMG_5360.jpeg',
        description: ''
    },
    '102015R19': {
        type: 'image',
        title: 'PHOTO INDICE',
        imageUrl: 'IMG_5498.jpg',
        description: ''
    }
};

// Éléments DOM
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const rewardContainer = document.getElementById('reward-container');
const rewardContent = document.getElementById('reward-content');
const returnBtn = document.getElementById('return-btn');

// Historique des commandes
let commandHistory = [];

// Séquence pour la suppression des données
const DELETION_SEQUENCE = ['8989', '5333', '4150'];
let deletionSequenceIndex = 0;

// Fonction pour ajouter une ligne au terminal
function addTerminalLine(sender, message, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = sender;
    
    line.appendChild(prompt);
    line.appendChild(document.createTextNode(' ' + message));
    
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Fonction pour afficher la récompense texte
function showTextReward(data) {
    rewardContent.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.content.replace(/\n/g, '<br>')}</p>
    `;
    rewardContainer.classList.remove('hidden');
}

// Fonction pour afficher la récompense image
function showImageReward(data) {
    rewardContent.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.imageUrl}" alt="Récompense">
        ${data.description ? `<p>${data.description}</p>` : ''}
    `;
    rewardContainer.classList.remove('hidden');
}

// Fonction pour redirection
function showRedirectReward(data) {
    rewardContent.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.message}</p>
        <p style="margin-top: 20px; font-size: 14px;">Redirection dans 3 secondes...</p>
    `;
    rewardContainer.classList.remove('hidden');
    
    setTimeout(() => {
        window.location.href = data.url;
    }, 3000);
}

// Fonction pour audio
function showAudioReward(data) {
    const audio = new Audio(data.audioUrl);
    rewardContent.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <div style="margin: 30px 0;">
            <div style="font-size: 48px; animation: pulse 2s infinite;">🔊</div>
        </div>
    `;
    rewardContainer.classList.remove('hidden');
    audio.play();
}

// Fonction pour traiter le code entré
function processCode(code) {
    const trimmedCode = code.trim();
    const upperCode = trimmedCode.toUpperCase();

    // Ajouter la commande à l'historique
    addTerminalLine('UTILISATEUR', trimmedCode);

    if (!trimmedCode) {
        return;
    }

    // 1) Code 5961 : afficher les questions
    if (trimmedCode === '5961') {
        addTerminalLine('SYSTÈME', '1. Combien y a-t-il de triangles sur l\'étoiles sur la fenêtre ?');
        addTerminalLine('SYSTÈME', '2. Hervé = 1822, Béa = 0201, Théo = ?');
        addTerminalLine('SYSTÈME', '3. PS EE AE H ?');
        addTerminalLine('SYSTÈME', '4. 2, 10, 12, 17, 18 ?');
        return;
    }

    // 2) Code 885462 : "chargement" puis erreur + texte chiffré
    if (trimmedCode === '885462') {
        addTerminalLine('SYSTÈME', 'Chargement...');
        setTimeout(() => {
            addTerminalLine('SYSTÈME', 'Erreur : une erreur est survenue.', 'error');
            addTerminalLine('SYSTÈME', 'csobeesl xsqspzxxsx ez aebpznbjznbth mobj esj jsxcsoxj sn shgbh bhbnbzebjsx es mxtasjjsox');
        }, 5000);
        return;
    }

    // 3) Séquence 8989 -> 5333 -> 4150 pour suppression des données
    if (DELETION_SEQUENCE.includes(trimmedCode)) {
        if (trimmedCode === DELETION_SEQUENCE[deletionSequenceIndex]) {
            deletionSequenceIndex++;

            if (deletionSequenceIndex === DELETION_SEQUENCE.length) {
                addTerminalLine('SYSTÈME', 'Données supprimées avec succès.', 'success');
                deletionSequenceIndex = 0;
            }
        } else {
            addTerminalLine('SYSTÈME', 'Erreur : veuillez recommencer la procédure d\'urgence.', 'error');
            deletionSequenceIndex = 0;
        }
        return;
    } else if (deletionSequenceIndex > 0) {
        // Si on était en cours de séquence et qu'un autre code est entré, on réinitialise
        addTerminalLine('SYSTÈME', 'Erreur : veuillez recommencer la procédure d\'urgence.', 'error');
        deletionSequenceIndex = 0;
        return;
    }

    // 4) Vérifier si le code existe dans la configuration générale
    if (CODES[upperCode]) {
        const codeData = CODES[upperCode];

        addTerminalLine('SYSTÈME', '> VÉRIFICATION EN COURS...', 'success');

        setTimeout(() => {
            addTerminalLine('SYSTÈME', '> CODE VALIDÉ', 'success');
            addTerminalLine('SYSTÈME', '> ACCÈS AUTORISÉ', 'success');

            setTimeout(() => {
                // Afficher la récompense selon le type
                switch (codeData.type) {
                    case 'text':
                        showTextReward(codeData);
                        break;
                    case 'image':
                        showImageReward(codeData);
                        break;
                    case 'redirect':
                        showRedirectReward(codeData);
                        break;
                    case 'audio':
                        showAudioReward(codeData);
                        break;
                }
            }, 500);
        }, 800);

    } else {
        // Code incorrect
        setTimeout(() => {
            addTerminalLine('SYSTÈME', '> ACCÈS REFUSÉ', 'error');
            addTerminalLine('SYSTÈME', '> IDENTIFIANT INCONNU', 'error');
            addTerminalLine('SYSTÈME', '> TENTATIVE ENREGISTRÉE', 'error');
        }, 500);
    }
}

// Événement sur l'entrée
terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const code = terminalInput.value;
        processCode(code);
        terminalInput.value = '';
    }
});

// Événement sur le bouton retour
returnBtn.addEventListener('click', () => {
    rewardContainer.classList.add('hidden');
    rewardContent.innerHTML = '';
    terminalInput.focus();
    
    addTerminalLine('SYSTÈME', '==================================');
    addTerminalLine('SYSTÈME', 'SESSION RÉINITIALISÉE');
    addTerminalLine('SYSTÈME', 'ENTREZ UN NOUVEAU CODE');
    addTerminalLine('SYSTÈME', '==================================');
});

// Focus automatique sur l'input
terminalInput.focus();

// Empêcher la perte de focus
document.addEventListener('click', (e) => {
    if (!rewardContainer.classList.contains('hidden')) {
        return;
    }
    terminalInput.focus();
});

// Message de bienvenue animé (optionnel)
setTimeout(() => {
    addTerminalLine('SYSTÈME', '> Prêt à recevoir les commandes');
}, 500);




