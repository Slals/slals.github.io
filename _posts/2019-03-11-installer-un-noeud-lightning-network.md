---
layout: article
title: "Installer un noeud Lightning Network"
description: "Envoyer des microtransactions bitcoin n'était pas possible jusqu'à l'arrivée de la technologie Lightning Network. C'est un système qui permet de faire des transactions quasi-instantannées et avec peu de frais. Pour que cela fonctionne il faut des acteurs actifs qui sont des noeuds complets, alors mettons cela en place avec un RaspberryPi3"
thumbnail: "/assets/img/thumbnail/lnd.png"
---

Avoir son propre noeud Lightning Network (LN) permet d'avoir un grand contrôle sur les transactions au sein du réseau. Lorsque vous voulez effectuer une transaction LN vous avez deux choix :
- Dépendre d'un noeud de tier et dépendre de ses canaux de paiement ;
- Avoir son noeud et gérer ses propres canaux avec d'autres noeuds ;

Il va sans dire que la deuxième solution offre plus de possibilités, alors nous allons voir dans cet article comment mettre en place tout cela.

## Matériels requis

Avant tout il va vous falloir du matériel puisqu'un noeud est un serveur qui fourni un service. Ne vous inquiétez pas vous n'aurez pas besoin d'un serveur coûteux, bruyant et consommateur. Vous aurez besoin d'un nano-ordinateur, c'est petit, c'est silencieux et la consommation est basse, voilà la liste :
- [Un Raspberry Pi 3 B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) : ce matériel est peu coûteux et a les capacités optimales pour avoir un noeud LN efficace. Veillez à acquérir un pack contenant le Raspberry Pi, l'alimentation secteur et une carte SSD. Ces éléments sont compris dans le pack officiel ;
- Un disque dur SSD de 250go ou plus : nous devrons télécharger la blockchain de Bitcoin qui fait plus de 140 giga octects. Je recommande un disque dur SSD (électronique) à préférer au disque dur mécanique qui a une moins bonne tolérance à la panne. J'ai personnellement un disque dur mécanique ;
- Un écran port HDMI : ce sera nécessaire pour faire les premières configurations ;
- Un clavier USB : ce sera également nécessaire pour faire les premières configurations ;
- Un câble RJ45 : ce sera pour connecter votre Raspberry Pi à Internet. Il est possible d'avoir une connexion wifi en y connectant une antenne ou un dongle. Cependant je déconseille cette approche pour des raisons de sécurité et également pour éviter les contraintes d'installation de drivers pas toujours disponibles sur les distributions Linux ;

## Connecter le Raspberry Pi

## Installer Raspian Stretch Lite

Avant d'entamer la configuration de notre Raspberry nous allons installer un nouveau système d'exploitation plus léger que celui installé par défaut : c'est [Raspian Stretch Lite](https://www.raspberrypi.org/downloads/raspbian/).

> Stretch Lite est un système d'exploitation dans le but d'optimiser la consommation de ressources sur notre système.
