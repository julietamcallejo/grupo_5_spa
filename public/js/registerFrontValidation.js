let form = document.querySelector('#register-form');
let submitButton = document.querySelector('.btn');

let formElements = Array.from(form.elements);
formElements.pop();

//Objeto de errores
let inputsErrors = {};

//Iterador de validacion
//Todos los campos son obligatorios excepto la imagen de perfil
formElements.forEach(function (input) {
    if (input.name != 'avatar') {
    input.addEventListener('blur', function () {
        let inputValue = this.value;
        //validador
        if (validator.isEmpty(inputValue)) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> es obligatorio`;
			// Agregamos al objeto de errores, un error para ese campo
			inputsErrors[this.name] = true;
        } else {
            this.classList.remove('is-invalid');
			this.classList.add('is-valid');
			this.nextElementSibling.innerHTML = '';
			delete inputsErrors[this.name];

        }
        
    });
    };
    if (input.name === 'email') {
        input.addEventListener('blur', function () {
            let emailValue = this.value;
            if (!validator.isEmpty(emailValue) && !validator.isEmail(emailValue)){
                this.classList.add('is-invalid');
			    this.classList.remove('is-valid');
			    this.nextElementSibling.innerHTML = 'El email debe ser en un formato válido';
			    inputsErrors[this.name] = true;

            }
        })
    }
    if (input.name == 'avatar') {
        input.addEventListener('change', function (e) {
            let fileExtension = this.value.split('.').pop();
            let extensionsAccepted = ['jpg', 'jpeg', 'png', 'webm', 'svg'];
            if (!extensionsAccepted.includes(fileExtension)) {
                this.classList.add('is-invalid');
			    this.classList.remove('is-valid');
                this.nextElementSibling.innerHTML = 'No es un formato de imagen válido';
                inputsErrors[this.name] = true;
            } else {
                this.classList.remove('is-invalid');
			    this.classList.add('is-valid');
			    this.nextElementSibling.innerHTML = '';
			    delete inputsErrors[this.name];
            }
           

        });
    }
});

form.addEventListener('submit', function (e) {
    formElements.forEach(function (input) {
        if (input.name != 'avatar') {
            if (validator.isEmpty(input.value)) {
                inputsErrors[input.name] = true;
                input.classList.add('is-invalid');
                input.nextElementSibling.innerHTML = `El campo es obligatorio`;
            }
        }

    });

    console.table(inputsErrors);
    if (Object.keys(inputsErrors).length > 0) {
        e.preventDefault();
    }
});