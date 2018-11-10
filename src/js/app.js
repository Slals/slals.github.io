---
---

/* sweetScroll load */
document.addEventListener("DOMContentLoaded", function () {

  let callback = function (e) {
    e.preventDefault();

    const message = contactForm['message'].value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.querySelector('#sendContact').innerHTML =
        '<p class="success">Votre message a bien été envoyé, je vous répondrais dans les plus brefs délais.</p>';
      }
    };

    xmlhttp.open("POST", "https://formspree.io/jonathan@cryptoblocs.fr");
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
Comment: ID utilisateur:	Blocs <jonathan@cryptoblocs.fr>
Comment: Cree:	24/10/2018 21:49
Comment: Expire:	24/10/2020 12:00
Comment: Type:	256-bit ECDSA (certificat secret disponible)
Comment: Utilisation:	Signature, Chiffrement, Certification des identifiants utilisateur
Comment: Empreinte:	41E642CD5DFC675B0CE0B787E61D62D0B401ADC9


mFIEW9DM1xMIKoZIzj0DAQcCAwTfKgSlEX5Emew5wq+m7qtN8+GzFKjaEdb4ePtT
EWkYfTHtJUsM2NGvdfwZ5xpznlu2wnJEoehMsBPFjfTpm3G/tB9CbG9jcyA8am9u
YXRoYW5AY3J5cHRvYmxvY3MuZnI+iJYEExMIAD4WIQRB5kLNXfxnWwzgt4fmHWLQ
tAGtyQUCW9DM1wIbAwUJA8MuSQULCQgHAgYVCgkICwIEFgIDAQIeAQIXgAAKCRDm
HWLQtAGtybB1AP0VJEo3ZlDDJDR038xjexfm2zztwYqOS2fBMdfFbv/l8gEAto7Z
jluirB7cQxWrBvKC++CXSDnbPXLoabBFX0B0EQC4VgRb0MzXEggqhkjOPQMBBwID
BIp2k+Z3gT1QX/do+Vu5Uk20qc7L/Ag0/4wwJ2J5KcEHKwdkreIsVQ7yNPSpWFWt
6V9mmQssQY8V/pijeiEiL30DAQgHiH4EGBMIACYWIQRB5kLNXfxnWwzgt4fmHWLQ
tAGtyQUCW9DM1wIbDAUJA8MuSQAKCRDmHWLQtAGtyZInAQCGL1OKkAE2TRpiEhQl
N8iDVdSXhuLsRUlA5uaMVL3VJAEAweNQdYB+n/S9fSRQQ2Uotn4hygRDOuXqAm/A
X6E2M+0=
=cNwi
-----END PGP PUBLIC KEY BLOCK-----`;

  kbpgp.KeyManager.import_from_armored_pgp({
    armored: pgpKey
  }, function(err, cryptoblocs) {
    if (!err) {
      window.PGP = cryptoblocs;
    }
  });

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "polygon",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 19.18081918081918,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 4,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      },
      nb: 80
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}, false);

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
