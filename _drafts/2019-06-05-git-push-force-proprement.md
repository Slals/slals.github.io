---
layout: article
title: ""
description: ""
image: "/assets/img/thumbnail/conf_node_title.jpg"
image_bg: "/assets/img/thumbnail/conf_node.jpg"
categories: [git,dev]
---

## Mais pourquoi push force avec Git ?

Imaginez un instant : vous travaillez sur votre dernier projet soigneusement développé en Rust depuis votre ordinateur portable favori, vous recensez consciencieusement vos modifications en faisant des commits réguliers. Un lundi pluvieux, vous êtes chez vous mais vous avez oublié votre ordinateur de travail au bureau... Ce serait bien chouette de travailler chez soit, en plus un lundi. Alors vous prenez votre ordinateur de secours pour continuer votre projet, vous faites quelques modifications dans la journée et vous envoyez `git push origin feature` tout cela sur votre Github. Parfait ! Le lendemain, mardi, le climat se veut moins orgueilleux, vous vous rendez à votre bureau pour continuer votre projet. Vous faites des modifications, `git commit -m "Adds the awesome feature"` puis vous envoyez tout `git push origin feature`...

{% include terminal.html title="git push mais..." prompt="me@monpc:~/Rusty $" commands="git push origin feature<br/><br/>To github.com:John/Rusty.git<br/>
 ! [rejected]        feature -> feature (fetch first)<br/>
 error: failed to push some refs to 'git@github.com:John/Rusty.git'<br/>
hint: Updates were rejected because the remote contains work that you do<br/>
hint: not have locally. This is usually caused by another repository pushing<br/>
hint: to the same ref. You may want to first integrate the remote changes<br/>
hint: (e.g., 'git pull ...') before pushing again.<br/>
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
" %}

Ouch... Il semble qu'il ne passe pas, et il y a une bonne raison. On va donc s'atteler à analyser ce qui s'est passé et comment passer outre tout en conservant un historique propre.

## La racine du mal : le fast-forward

## Il y a deux types de forceur
