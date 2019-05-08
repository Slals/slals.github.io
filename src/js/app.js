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
Comment: Cree:	08/05/2019 20:45
Comment: Expire:	08/05/2021 12:00
Comment: Type:	256-bit EdDSA (certificat secret disponible)
Comment: Utilisation:	Signature, Chiffrement, Certification des identifiants utilisateur
Comment: Empreinte:	F069AA02AEB2205977539F427F459CBF219E1216


mDMEXNMjsRYJKwYBBAHaRw8BAQdALnFeQ8hK4Z7oRPTfNJaDSEvWheoxcKZNFIP6
L807PNi0GUJsb2NzIDxqb25hdGhhbkBibG9jcy5mcj6IlgQTFggAPhYhBPBpqgKu
siBZd1OfQn9FnL8hnhIWBQJc0yOxAhsDBQkDwz1vBQsJCAcCBhUKCQgLAgQWAgMB
Ah4BAheAAAoJEH9FnL8hnhIWYZQA/2iMESVWI+w5m/kmBWwqF2XwuTwvNvJvZ6Zb
fQMMPOZGAQC4munBGJIckvBxIdYtjohX5xUbmc5x3nzqc+aIj2k7ALg4BFzTI7ES
CisGAQQBl1UBBQEBB0Ak+uasRNr95l8+UOovFzPJ1xMVgM5oUsEewWGbKcOjTQMB
CAeIfgQYFggAJhYhBPBpqgKusiBZd1OfQn9FnL8hnhIWBQJc0yOxAhsMBQkDwz1v
AAoJEH9FnL8hnhIWJjcA/Aq2E0SKtWf0kXHHRpElhte2WC8cwvmEd2fpc3Zpq7LD
AQC9hslhkc25QUogXez1KJuxUp2Roj77oDajOHQNfHYRCg==
=Slf8
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
