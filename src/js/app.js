---
---

document.addEventListener("DOMContentLoaded", function () {
  let sendEmail = function () {
    document.querySelector('.send-btn').classList.add('loading');

    const message = contactForm['message'].value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        switch (this.status) {
          case 200:
            document.querySelector('#sendContact').innerHTML =
              '<p class="success">Votre message a bien été envoyé, je vous répondrais dans les plus brefs délais.</p>';
            break;
          default:
            document.querySelector('#sendContact').innerHTML =
              '<p class="error">Votre message n\'est pas arrivé à bon port :( Je résouds le soucis revenez plus tard.</p>';
        }
      }
    };

    xmlhttp.open("POST", "https://email-now.jonathanserra.now.sh");
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    const email = contactForm['email'].value;
    const greToken = contactForm['gre-token'].value;

    if (contactForm['doesEncrypt'].checked) {
      const params = {
        msg: message,
        encrypt_for: window.PGP,
      };

      kbpgp.box(params, function(err, resString, resBuffer) {
        if (!err) {
          xmlhttp.send(JSON.stringify({ email, greToken, message: resString }));
        } else {
          document.querySelector('#sendContact').innerHTML =
            '<p class="error">Echec lors du chiffrement du message, ce message n\'a pas été envoyé</p>';
        }
      });
    } else {
      xmlhttp.send(JSON.stringify({ email, greToken, message }));
    }
  }

  let submitEvt = function(e) {
    e.preventDefault();
    sendEmail();
  }

  let contactForm = document.forms['contactForm'];

  if (contactForm.addEventListener){
    contactForm.addEventListener("submit", submitEvt, false);
  } else if(contactForm.attachEvent){
    contactForm.attachEvent('onsubmit', submitEvt);
  }

  const sweetScroll = new SweetScroll({
    offset: -100,
  });

  var pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: ID utilisateur:	Blocs <jonathan@blocs.fr>
Comment: Cree:	27/12/2019 11:47
Comment: Expire:	27/12/2021 12:00
Comment: Type:	256-bit EdDSA (certificat secret disponible)
Comment: Utilisation:	Signature, Chiffrement, Certification des identifiants utilisateur
Comment: Empreinte:	9CB23434969792A79673535DB36D9B2711C2A6CA


mDMEXgXhKhYJKwYBBAHaRw8BAQdAP9rhE/1rpJcBfMlgQRcb1QBU5Y6/xQIgECEy
+T9wx460GUJsb2NzIDxqb25hdGhhbkBibG9jcy5mcj6IlgQTFggAPhYhBJyyNDSW
l5KnlnNTXbNtmycRwqbKBQJeBeEqAhsDBQkDw7uGBQsJCAcCBhUKCQgLAgQWAgMB
Ah4BAheAAAoJELNtmycRwqbKa1oBAJ8G8or46oKhGtJR4Q9Bng5XrJnweZM+A9YS
rC8E6aFfAQDVt/jsOZqG23BVnnu/vmThDOUue+LmB2OgMkk3I+GBBLhWBF4F4SoS
CCqGSM49AwEHAgMEaQoSJJPyaw6Zz2Z+jHxEaJiQ10f678rXyP7899k4sn1v1yPA
YQQQSvTEb1sh0Heu0oHvIB2rvpJzDWQZwFrEvAMBCAeIfgQYFggAJhYhBJyyNDSW
l5KnlnNTXbNtmycRwqbKBQJeBeEqAhsMBQkDw7uGAAoJELNtmycRwqbKPJ8BAO3c
nZguxL+JzKDHLkx8ety5zQYHZLpbffqu9IKZdNnuAQDv9ANpC0RnrE+zB/WW1Jj7
KUXV9SfFWkEIKDv7k/OUCA==
=zNYw
-----END PGP PUBLIC KEY BLOCK-----`;

  kbpgp.KeyManager.import_from_armored_pgp({
    armored: pgpKey
  }, function(err, cryptoblocs) {
    if (!err) {
      window.PGP = cryptoblocs;
    }
  });

  grecaptcha.ready(function() {
    grecaptcha.execute('6Leu79EUAAAAAORaKUe6GqN-1lO1o5i4ITdZE9cO')
      .then(function(token) {
        contactForm['gre-token'].value = token;
      });
  });
});

function onServiceBtn(btn) {
  let btnValue = btn.dataset.value;

  let services = document.querySelector('.services');
  let serviceInfo = document.querySelector('.services-info');

  setTimeout(function() {
    const scroller = new SweetScroll();
    scroller.to('#services');
  }, 100);

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

  const scroller = new SweetScroll();
  scroller.to('#contact');

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
