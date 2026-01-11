# Utilisation de l’Intelligence Artificielle

## Rôle de l’IA dans le projet

L’intelligence artificielle est utilisée uniquement pour :

- Traduire un planning technique en **explication compréhensible**
- Générer un texte court, clair et professionnel
- Respecter strictement les contraintes du planning

 L’IA ne génère pas le planning.

---

## Choix du modèle IA

### Contraintes
- Budget : **0**
- Sortie textuelle simple
- Faible complexité

### Solution choisie
- Modèle local léger : **gemma:1b**
- Exécution via **Ollama**
- Aucun coût
- Fonctionne en local

---

## Modelfile

Un **Modelfile** est utilisé afin de :

- Charger un prompt générique automatiquement
- Forcer l’IA à respecter les règles du projet
- Éviter les réponses incohérentes

### Exemple de rôle imposé à l’IA

- Expliquer uniquement le planning reçu
- Ne pas inventer de tâches
- Ne pas modifier les dates
- Répondre en français
- Produire une explication courte et claire

---

## Flux IA

1. Le backend reçoit le planning final
2. Le planning est transformé en texte structuré
3. Ce texte est envoyé à l’API IA
4. L’IA génère une explication
5. L’explication est retournée au frontend

---

## Exemple de sortie IA attendue

```json
{
  "explanation": "De jour 1 à jour 3, la tâche Frontend est réalisée. Ensuite, la tâche Backend s’exécute de jour 3 à jour 4. Enfin, la tâche IA est planifiée de jour 4 à jour 6."
}
