---
layout: article
title: "Installer un noeud Lightning Network"
description: "Envoyer des microtransactions bitcoin n'était pas possible jusqu'à l'arrivée de la technologie Lightning Network. C'est un système qui permet de faire des transactions quasi-instantannées et avec peu de frais. Pour que cela fonctionne il faut des acteurs actifs qui sont des noeuds complets, alors mettons cela en place avec un RaspberryPi3"
image: "/assets/img/thumbnail/lnd.png"
---

Avoir son propre noeud Lightning Network (LN) permet d'avoir un grand contrôle sur les transactions au sein du réseau. Lorsque vous voulez effectuer une transaction LN vous avez deux choix :
- Dépendre d'un noeud de tier et dépendre de ses canaux de paiement ;
- Avoir son noeud et gérer ses propres canaux avec d'autres noeuds ;

Il va sans dire que la deuxième solution offre plus de possibilités, alors nous allons voir dans cet article comment mettre en place tout cela.

## Matériels requis

Avant tout il va vous falloir du matériel puisqu'un noeud est un serveur qui fourni un service. Ne vous inquiétez pas vous n'aurez pas besoin d'un serveur coûteux, bruyant et consommateur. Vous aurez besoin d'un nano-ordinateur, c'est petit, c'est silencieux et la consommation est basse, voilà la liste :
- Raspberry Pi 3 : {% include blank_link.html title="ce matériel" href="https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/" %} est peu coûteux et a les capacités optimales pour avoir un noeud LN efficace. Veillez à acquérir un pack contenant le Raspberry Pi, l'alimentation secteur et une carte SSD. Ces éléments sont compris dans le pack officiel ;
- Un disque dur SSD de 250go ou plus : nous devrons télécharger la blockchain de Bitcoin qui fait plus de 140 giga octects. Je recommande un disque dur SSD (électronique) à préférer au disque dur mécanique qui a une moins bonne tolérance à la panne. J'ai personnellement un disque dur mécanique ;
- Un écran port HDMI : ce sera nécessaire pour faire les premières configurations ;
- Un clavier USB : ce sera également nécessaire pour faire les premières configurations ;
- Un câble RJ45 : ce sera pour connecter votre Raspberry Pi à Internet. Il est possible d'avoir une connexion wifi en y connectant une antenne ou un dongle. Cependant je déconseille cette approche pour des raisons de sécurité et également pour éviter les contraintes d'installation de drivers pas toujours disponibles sur les distributions Linux ;

## Connecter le Raspberry Pi

> C'est pour bientôt

## Installer Raspian Stretch Lite

Cette étape optionnelle mais recommandée.

Avant d'entamer la configuration de notre Raspberry nous allons installer un nouveau système d'exploitation plus léger que celui installé par défaut : c'est {% include blank_link.html title="Raspian Stretch Lite" href="https://www.raspberrypi.org/downloads/raspbian/" %}.

> Stretch Lite est un système d'exploitation dans le but d'optimiser la consommation de ressources sur notre système.

Installez Raspian Stretch Lite sur la carte SD fournie avec le Raspberry Pi. Il vous faudra la flasher. Avec Windows le logiciel {% include blank_link.html title="Etcher" href="https://www.balena.io/etcher/" %} est d'une grande aide. Sur Mac et distributions Linux préférez la ligne de commande.

## Configurer le Raspberry Pi

Ici je vais considérer que vous êtes sur Raspian Stretch Lite, mais pas d'inquiétude vous pouvez tout suivre avec le système d'origine, veillez à ouvrir le terminal car nous allons travailler en ligne de commandes, rien de mieux pour se familiariser avec l'environnement Linux.

Les accès par défaut sont les suivants

{% include terminal.html title="Connexion" commands="Raspbian GNU/Linux 8 raspberry tty1\<br/>raspberry login : pi\Password: raspberry" %}

> Si vous n'êtes pas habitué au terminal Debian, en tapant votre mot de passe rien ne s'affiche, c'est tout à faire normal, ce que vous tapez est quand même pris en compte. C'est une protection au même titre que les étoiles qu'on voit sur les formulaires web.

### Activer et configurer SSH

Actuellement vous travaillez avec un écran et un clavier branchés sur votre petit Rapsberry... Et c'est peut-être pas pratique. J'ai une bonne nouvelle, on va pouvoir faire en sorte de gérer notre système sans avoir besoin d'y accéder physiquement. Nous allons le contrôler à distance grâce au protocole SSH !

> SSH signifie Secure Shell, c'est un protocole de réseau ingénieux qui permet d'exécution des commandes à distance en bénéficiant de canaux cryptés. Il est possible d'utiliser SSH au sein d'un réseau local mais aussi en passant par Internet par exemple. Sachez que par défaut la configuration du SSH dans Raspian permet l'authentification par login et mot de passe.

Par des défauts la connexion SSH est désactivée pour des raisons de sécurité, alors activons le en tapant ce qui suit

{% include terminal.html title="Ouvrir Rasp config" prompt="pi@raspberrypi:~ $" commands="sudo raspi-config" %}

Un menu graphique peu charmant s'ouvre, sélectionnez `Interfacing Options (Configure connections to peripherals)` puis `ssh (Enable or disable ssh server)` ensuite sélectionnez `Yes`, `OK` et enfin `Finish`.

Revenez sur le terminal et redémarrez le service ssh

{% include terminal.html title="Redemarrer SSH" prompt="pi@raspberrypi:~ $" commands="sudo systemctl restart ssh" %}

Votre SSH est maintenant activé.

À la bonheur, vous pouvez dès maintenant vous connecter à votre Raspberry à distance, depuis un autre ordinateur. D'abord récupérez l'adresse IP de votre Raspberry vous en aurez besoin, utilisez la commande `ifconfig` pour l'afficher. Voilà un extrait de mon `ifconfig`

{% include terminal.html title="Trouver l'adresse IP" prompt="pi@raspberrypi:~ $" commands="ifconfig<br/>eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500<br/>
        inet <span class='term-highlight'>192.168.1.42</span>  netmask 255.255.255.0  broadcast 192.168.1.255<br/>
        inet6 fe80::10e0:8a76:4fe4:c3c2  prefixlen 64  scopeid 0x20<link><br/>
        ether b8:27:eb:6a:3a:d9  txqueuelen 1000  (Ethernet)<br/>
        RX packets 169483183  bytes 168117311599 (156.5 GiB)<br/>
        RX errors 2  dropped 45841  overruns 0  frame 0<br/>
        TX packets 132373249  bytes 17426498366 (16.2 GiB)<br/>
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0<br/>
<br/>
lo: flags=73&lt;UP,LOOPBACK,RUNNING&gt;  mtu 65536<br/>
        inet 127.0.0.1  netmask 255.0.0.0<br/>
        inet6 ::1  prefixlen 128  scopeid 0x10<br/>
        loop  txqueuelen 1000  (Local Loopback)<br/>
        RX packets 39066126  bytes 154986068081 (144.3 GiB)<br/>
        RX errors 0  dropped 0  overruns 0  frame 0<br/>
        TX packets 39066126  bytes 154986068081 (144.3 GiB)<br/>
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0<br/>
<br/>
wlan0: flags=4099&lt;UP,BROADCAST,MULTICAST&gt;  mtu 1500<br/>
        ether b8:27:eb:3f:6f:8c  txqueuelen 1000  (Ethernet)<br/>
        RX packets 0  bytes 0 (0.0 B)<br/>
        RX errors 0  dropped 0  overruns 0  frame 0<br/>
        TX packets 0  bytes 0 (0.0 B)<br/>
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0<br/>
        " %}

Voyez en surligné mon adresse IP est `192.168.1.42` — puisque c'est la réponse à tous les mystères de l'univers. Vous la trouverez normalement sur le connecteur `eth0` et en `ipv4` qui est le format que j'ai sélectionné et que je vous recommande pour éviter des configurations futures.

Avec votre ordinateur favoris, que ce soit sur MacOS, Windows, Ubuntu, Trisquel ou TempleOS vous pouvez utiliser un outil qui permet de vous connecter à votre Raspberry avec SSH. Le plus simple avec MacOS ou une distribution Linux. Si vous n'avez pas `ssh` de disponible en commande, veuillez installer {% include blank_link.html title="OpenSSH" href="https://www.openssh.com/" %}. Voilà comment procéder avec votre terminal sachant que mon IP est `192.168.1.42`

{% include terminal.html title="Connecter à distance avec SSH" prompt="monpc@oumonmac:~ $" commands="ssh-keygen -t rsa -b 4096<br/>
&gt; Generating public/private rsa key pair.<br/>
&gt; Enter a file in which to save the key (/home/you/.ssh/id_rsa): [Press enter] <i>Laissez par défaut</i><br/>
&gt; Enter passphrase (empty for no passphrase): [Type a passphrase] <i>Votre mot de passe</i><br/>
&gt; Enter same passphrase again: [Type passphrase again] <i>Confirmez votre mot de passe</i><br/>
\ssh pi@192.168.1.42<br/>
pi@192.168.1.42's password: <i>Entrez votre mot de passe </i><br/><br/>
Linux raspberrypi 4.14.71-v7+ #1145 SMP Fri Sep 21 15:38:35 BST 2018 armv7l<br/>
<br/>
The programs included with the Debian GNU/Linux system are free software;<br/>
the exact distribution terms for each program are described in the<br/>
individual files in /usr/share/doc/* /copyright.<br/>
<br/>
Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent<br/>
permitted by applicable law.<br/>
Last login: Tue Mar 19 02:04:32 2019 from 192.168.1.44<br/>
<span class='prompt'>pi@raspberrypi:~ &</span>
" %}

Cette étape permet d'avoir une clé RSA pour initialiser une communication chiffrée avec votre Raspberry et de connecter ensuite.

Il existe des solutions avec interface comme {% include blank_link.html title="PuTTY" href="https://www.putty.org/" %} pour Windows. Vous devrez entrer l'adresse IP de votre Raspberry, le login `pi` et le mot de passe `raspberry`.

### Sécuriser les comptes

> C'est pour bientôt
