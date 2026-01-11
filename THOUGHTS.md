# Réflexion sur le projet

## Idée de départ

L’objectif principal du projet est de créer un programme capable de générer automatiquement un **planning de tâches sous contraintes**.

L’idée est de résoudre un problème simple de planification en respectant des règles précises, puis de rendre le résultat compréhensible pour un utilisateur non technique grâce à une intelligence artificielle.

---

## 1. Génération du planning sous contraintes

Le programme doit être capable de générer un planning en respectant les contraintes suivantes :

- Les tâches doivent commencer à partir du **jour 1**
- **Une seule tâche peut être exécutée à la fois**
- Une tâche commence uniquement lorsque les tâches précédentes sont terminées
- Le programme calcule automatiquement l’ordre des tâches
- Chaque tâche dépend de la précédente (dépendance séquentielle)

### Exemple de planning

- Jour 1 à 3 : Frontend (aucune tâche avant)
- Jour 4 à 5 : Backend (après Frontend)
- Jour 6 à 7 : IA (après Backend)

---

## 2. Ajout d’une intelligence artificielle explicative

La deuxième partie du projet consiste à ajouter une **IA capable de traduire le planning en langage humain**.

Le rôle de l’IA est uniquement d’expliquer le résultat, par exemple :

> De jour 1 à jour 3, la tâche A est réalisée. Ensuite, à partir du jour 3, la tâche B commence, et ainsi de suite.

L’IA **n’intervient jamais dans le calcul du planning**.

---

## Idée d’implémentation (version bêta)

- L’utilisateur envoie une liste de tâches
- Le système traite ces tâches
- OR-Tools est utilisé pour générer le planning final
- Le planning est ensuite affiché à l’écran

Pour la partie IA, l’idée initiale était d’utiliser **Google AI Studio API** afin :
- d’accélérer le développement
- de générer un texte de bonne qualité
- d’éviter une forte consommation des ressources système

En pratique, cette partie dépendra du choix du client.

L’objectif principal est d’utiliser un **Modelfile** afin de charger un prompt générique garantissant que l’IA génère uniquement des réponses conformes aux contraintes du projet.

---

## Architecture backend

- Un backend **Node.js** est utilisé comme point central
- Il assure la communication entre :
    - l’interface utilisateur
    - OR-Tools
    - l’IA

Les endpoints sont testés avec **Postman**.

OR-Tools fonctionnant uniquement en Python, l’idée est d’ajouter une **API FastAPI** qui expose la logique OR-Tools et communique avec le backend Node.js.

---

## Frontend

Pour l’interface utilisateur, l’idée est de représenter le planning sous forme de **calendrier**, afin de faciliter la lecture et la compréhension du planning généré.

---

## Contraintes liées à l’IA

L’utilisation d’une IA externe nécessite une facturation, et le budget du projet est de **0**.

La solution retenue est donc :
- l’utilisation d’un modèle léger exécuté en local
- un modèle comme **gemma:1b**
- l’utilisation d’un **Modelfile** afin de charger le prompt instantanément

Le résultat attendu n’étant pas complexe, un modèle léger est largement suffisant.
