# Organizer – Organisateur de Planning Intelligent

## Description

Organizer est un projet dont l’objectif est de créer un système capable de générer automatiquement un planning de tâches contraintes, puis d’expliquer ce planning en langage humain à l’aide d’une intelligence artificielle.

Le projet combine :
- Un moteur d’optimisation (OR-Tools)
- Une API backend en Node.js
- Une API Python en FastAPI
- Un module d’intelligence artificielle
- Une interface frontend

---

## Objectifs du projet

- Générer un planning de tâches sous contraintes strictes
- Calculer automatiquement l’ordre d’exécution des tâches
- Expliquer le résultat de manière claire et humaine
- Séparer clairement les responsabilités (frontend, backend, calcul, IA)

---

## Contraintes de planification

Le planning respecte les règles suivantes :

- Toutes les tâches commencent à partir du **jour 1**
- **Une seule tâche à la fois**
- Une tâche ne peut commencer que lorsque la précédente est terminée
- L’ordre des tâches est calculé automatiquement
- Chaque tâche dépend de la précédente

### Exemple de planning

- Jour 1 → 3 : Frontend (aucune dépendance)
- Jour 4 → 5 : Backend (après Frontend)
- Jour 6 → 7 : IA (après Backend)

---

## Architecture générale

Le projet est composé de plusieurs parties indépendantes :

### 1. Backend Node.js (TypeScript)

- Point d’entrée principal de l’application
- Communique avec :
  - l’API FastAPI (OR-Tools)
  - l’API IA
- Expose des endpoints REST pour le frontend
- Gère la logique métier et l’orchestration

### 2. API FastAPI (Python)

- Contient la logique OR-Tools
- Calcule le planning optimal
- Expose un endpoint REST pour recevoir les tâches et retourner le planning
- Séparée du backend Node.js car OR-Tools fonctionne uniquement en Python

### 3. Intelligence Artificielle

- Utilisée pour générer une explication humaine du planning
- Deux approches possibles :
  - API externe (Google AI Studio)
  - Modèle local via Ollama
- Utilisation d’un **ModelFile** pour garantir :
  - un prompt stable
  - des réponses conformes aux contraintes du projet

### 4. Frontend

- Interface utilisateur pour saisir les tâches
- Affichage du planning généré
- Visualisation prévue sous forme de calendrier ou timeline

---

## Tests

- Les endpoints sont testés via **Postman**
- Le backend Node.js communique avec :
  - l’API FastAPI pour le calcul
  - l’API IA pour l’explication

---

## Choix techniques

- **Node.js + TypeScript** : backend principal
- **FastAPI + Python** : calcul OR-Tools
- **OR-Tools** : moteur de planification
- **Ollama (Gemma 1B)** :
  - modèle léger
  - fonctionne en local
  - pas de coût (budget = 0)
- **.env** : gestion des variables sensibles

---

## Motivation du choix IA

Les API IA externes nécessitent un système de facturation.
Étant donné que le budget du projet est nul, le choix s’est porté sur :
- un modèle léger
- exécutable localement
- avec un prompt chargé instantanément via un ModelFile

---

## État du projet

- API OR-Tools : fonctionnelle
- Backend Node.js : fonctionnel
- Communication inter-API : fonctionnelle
- IA locale : fonctionnelle
- Frontend : fonctionnelle

---

