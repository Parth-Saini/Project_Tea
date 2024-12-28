const toggleCheckbox = document.getElementById('switch');

const contentOne = document.getElementById('burner_flame');


toggleCheckbox.addEventListener('change', () => {

  if (toggleCheckbox.checked) {

    contentOne.style.display = 'none';
  }
  else {

    contentOne.style.display = 'block';
  }
});