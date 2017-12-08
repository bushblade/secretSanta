var addBtn = document.getElementById('addBtn');
var genSanta = document.getElementById('genSanta');
var input = document.getElementById('input');
var santaList = document.getElementById('santaList');
var resetBtn = document.getElementById('resetBtn');
var message = document.querySelector('h2');
var wrapper = document.querySelector('.wrapper');
var people = [];
var recipients = [];
var santas = [];


resetBtn.style.display = 'none';

//add name event listener
addBtn.addEventListener('click', addName);


//generate button event listener
genSanta.addEventListener('click', function() {
  if (people.length === 0) {
    alert('No names added yet!');
  } else {
    santaList.removeEventListener('animationend', resetAll);
    shuffleArray();
    createSantas();
    growWrapper();
    genSanta.style.display = 'none';
    resetBtn.style.display = 'inline';
    input.style.display = 'none';
    addBtn.style.display = 'none';
    message.textContent = 'Santa time!';
    setTimeout(writeSantaList, 200);
    // writeSantaList();
  }
});

//input event listener for enter key
input.addEventListener('keydown', function(key) {
  if (key.keyCode === 13) {
    addName();
  }
});

//reset button event listener
resetBtn.addEventListener('click', function() {
  santaList.addEventListener('animationend', resetAll);
  santaList.classList.add("animated", "flipOutY");
});

function addName() {
  if (input.value.replace(/\s/g, "").length > 0) {
    people.push(input.value);
    message.textContent = 'Added ' + input.value + ' to the list';
    input.value = '';
  } else {
    alert('Nothing entered!');
    input.value = '';
  }
}

function shuffleArray() {
  recipients = people.slice(0);
  for (var i = recipients.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = recipients[i];
    recipients[i] = recipients[j];
    recipients[j] = temp;
  }
}

function createSantas() {
  for (var i = 1; i < recipients.length; i++) {
    santas.push(recipients[i]);
  }
  santas.push(recipients[0]);
}

function resetAll() {
  santaList.classList.remove("animated", "flipOutY");
  santaList.innerHTML = '';
  people = [];
  santas = [];
  recipients = [];
  genSanta.style.display = 'inline';
  resetBtn.style.display = 'none';
  input.style.display = 'inline';
  addBtn.style.display = 'inline';
  input.value = '';
  message.textContent = 'No people entered';
  shrinkWrapper();
}

function writeSantaList() {
  for (var i = 0; i < people.length; i++) {
    var createLi = document.createElement("li");
    santaList.appendChild(createLi);
    santaList.lastChild.innerHTML = '<strong>' + santas[i] + '</strong> is Santa for <strong>' + recipients[i] + '</strong>';
    santaList.lastChild.classList.add("animated", "flipInY");
  }
}

function growWrapper() {
  if (window.innerWidth > 900) {
    var newHeight = 17 + people.length * 1.7;
    wrapper.style.height = newHeight + "rem";
  } else {
    wrapper.style.height = "auto";
  }
}

function shrinkWrapper() {
  if (window.innerWidth > 900) {
    wrapper.style.height = "17rem";
  } else {
    wrapper.style.height = "auto";
  }
}
