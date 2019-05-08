---
---

document.addEventListener("DOMContentLoaded", function () {
  let callback = function (e) {
    e.preventDefault();

    document.querySelector('.send-btn').classList.add('loading');

    const message = contactForm['message'].value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.querySelector('#sendContact').innerHTML =
        '<p class="success">Votre message a bien été envoyé, je vous répondrais dans les plus brefs délais.</p>';
      }
    };

    xmlhttp.open("POST", "https://email-now.jonathanserra.now.sh");
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    if (contactForm['doesEncrypt'].checked) {
      const params = {
        msg: message,
        encrypt_for: window.PGP,
      };

      kbpgp.box(params, function(err, resString, resBuffer) {
        if (!err) {
          xmlhttp.send(JSON.stringify({ email: contactForm['email'].value, message: resString }));
        } else {
          console.log(err);
          document.querySelector('#sendContact').innerHTML =
            '<p class="error">Echec lors du chiffrement du message, ce message n\'a pas été envoyé</p>';
        }
      });
    } else {
      xmlhttp.send(JSON.stringify({ email: contactForm['email'].value, message }));
    }
  }

  let contactForm = document.forms['contactForm'];

  if (contactForm.addEventListener){
    contactForm.addEventListener("submit", callback, false);
  } else if(contactForm.attachEvent){
    contactForm.attachEvent('onsubmit', callback);
  }

  const sweetScroll = new SweetScroll({/* some options */});

  var pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: ID utilisateur:	Blocs <jonathan@blocs.fr>
Comment: Cree:	08/05/2019 20:01
Comment: Expire:	08/05/2021 12:00
Comment: Type:	256-bit ECDSA (certificat secret disponible)
Comment: Empreinte:	ABCC30B013B8F90E989F63E17EB4649AAA0808F0


mFIEXNMZYRMIKoZIzj0DAQcCAwQn2teed8FpshWMFOsqiKgZxID+kgk27Dn45cvG
LuboUXkwwbtrsIuShJVb7icxy/KnkiCqpABiKM89GbcSk7U9tBlCbG9jcyA8am9u
YXRoYW5AYmxvY3MuZnI+iJYEExMIAD4WIQSrzDCwE7j5DpifY+F+tGSaqggI8AUC
XNMZYQIbIwUJA8NHvwULCQgHAgYVCgkICwIEFgIDAQIeAQIXgAAKCRB+tGSaqggI
8D/rAQCBYxMhn/2bZMHR1UppiRJVKn9hm8uFIwP2n725FOQ//AD9ECqwMWYt8xia
KVtpbBJQ9ZkZiCqYa2xVUjS+BhXJOOk=
=BsPv
-----END PGP PUBLIC KEY BLOCK-----`;

  kbpgp.KeyManager.import_from_armored_pgp({
    armored: pgpKey
  }, function(err, cryptoblocs) {
    if (!err) {
      window.PGP = cryptoblocs;
    }
  });
});

function onServiceBtn(btn) {
  let btnValue = btn.dataset.value;

  let services = document.querySelector('.services');
  let serviceInfo = document.querySelector('.services-info');

  window.location.href = '#services';

  if (!btnValue) {
    services.classList.remove('hidden');
    serviceInfo.classList.add('hidden');
    return;
  }

  services.classList.add('hidden');
  serviceInfo.classList.remove('hidden');

  serviceInfo.dataset.value = btnValue;
  document.querySelector('.btn-interested').dataset.value = btnValue;
}

function onServiceIntBtn(btn) {
  let btnValue = btn.dataset.value;

  let contactForm = document.forms['contactForm'];

  let interestedIn = '';

  switch (btnValue) {
    case 'dev':
      interestedIn = 'développement';
      break;
    case 'consult':
      interestedIn = 'conseils fonctionnels et techniques';
      break;
    case 'form':
      interestedIn = 'formation en programmation';
      break;
  }

  if (interestedIn == '') {
    return;
  }

  contactForm['message'].value = `Bonjour,\n\nPouvons-nous échanger au sujet de votre service de ${interestedIn} ?\n\nVeuillez me joindre au ...`;

  document.querySelector('#filledMessage').style.display = 'block';

  window.location.href = '#contact';

  contactForm['email'].focus();
}

function toggleAbout(el, e) {
  e.preventDefault();
  let isToggled = el.dataset.toggled;

  let btnHide = document.querySelector('#hideAbout');
  let btnShow = document.querySelector('#showAbout');

  let about = document.querySelector('#aboutMe');

  if (isToggled == 'true') {
    btnHide.classList.remove('contact-hidden');
    btnShow.classList.add('contact-hidden');
    about.classList.remove('contact-hidden');
    el.dataset.toggled = 'false';
  } else {
    btnShow.classList.remove('contact-hidden');
    btnHide.classList.add('contact-hidden');
    about.classList.add('contact-hidden');
    el.dataset.toggled = 'true';
  }
}
