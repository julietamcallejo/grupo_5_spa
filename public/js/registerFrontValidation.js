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
        let inputValue = this.value.trim();
        //validador
        if (validator.isEmpty(inputValue)) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> es obligatorio`;
			// Agregamos al objeto de errores, un error para ese campo
			inputsErrors[this.name] = true;
        } else if (!validator.isLength(inputValue, {min: 3, max: undefined})){

            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            this.nextElementSibling.innerHTML = `<b>${this.dataset.name}</b> debe contener mas caracteres.`;
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
            let emailValue = this.value.trim();
            if (!validator.isEmpty(emailValue) && !validator.isEmail(emailValue)){
                this.classList.add('is-invalid');
			    this.classList.remove('is-valid');
			    this.nextElementSibling.innerHTML = 'Ingresar un email con formato válido';
			    inputsErrors[this.name] = true;

            }
            
            
        })
    }
    if (input.name === 'email') {
        input.addEventListener('change', function () {
            let emailValue = this.value.trim();

            fetch(`http://localhost:3000/api/users/check/${emailValue}`)
                .then(response => response.json())
                .then(data => {
                    
                    if(data.userFound === true){
                        
                        this.classList.add('is-invalid');
			            this.classList.remove('is-valid');
			            this.nextElementSibling.innerHTML = 'El email ya se encuentra registrado';
			            inputsErrors[this.name] = true;

                    } else {
                        console.log("No esta registrado");
                    }
                })
                .catch(error => console.error("El error es" + error))
                
            
        })
    }
    
    if (input.name === 'password') {
        input.addEventListener('blur', function () {
            let passwordValue = this.value.trim();
            let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*?/])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
            if (!validator.isEmpty(passwordValue) && !validator.isLength(passwordValue, {min: 6, max: undefined})){
                this.classList.add('is-invalid');
			    this.classList.remove('is-valid');
			    this.nextElementSibling.innerHTML = 'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un caracter especial';
			    inputsErrors[this.name] = true;

            } else if (!passwordValue.match(passwordRegex)){

                console.log("Entro el regex");
                this.classList.add('is-invalid');
			    this.classList.remove('is-valid');
			    this.nextElementSibling.innerHTML = 'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un núnero y un caracter especial';
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