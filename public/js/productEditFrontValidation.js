let form = document.querySelector('#productEditForm');
let submitButton = document.querySelector('.btn');

let formElements = Array.from(form.elements);
formElements.pop();
formElements.pop();

//Objeto de errores
let inputsErrors = {};

formElements.forEach(function (input) {
    input.addEventListener('blur', function () {
        let inputValue = this.value.trim();
        //validador
        if (input.name === 'description' || input.name === 'name' || input.name === 'summary'){
            if (validator.isEmpty(inputValue)) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                
                this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> es obligatorio`;
                inputsErrors[this.name] = true;
            } else if (!validator.isLength(inputValue, { min: 3, max: undefined })) {

                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> debe contener al menos 3 caracteres.`;
                inputsErrors[this.name] = true;

            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                this.nextElementSibling.innerHTML = '';
                delete inputsErrors[this.name];
                
                
            }
        } else {
            if (validator.isEmpty(inputValue)) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> es obligatorio`;
                inputsErrors[this.name] = true;
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                this.nextElementSibling.innerHTML = '';
                delete inputsErrors[this.name];
                console.log('entro al else del blur');
                
            }
        }

    });
    
    if (input.name == 'photo') {
        input.addEventListener('change', function () {
            let inputValue = this.value.trim();
            let fileExtension = this.value.split('.').pop();
            let acceptedExtensions = ['jpg', 'jpeg', 'png', 'webm', 'svg'];
            if (!acceptedExtensions.includes(fileExtension)) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                this.nextElementSibling.innerHTML = `Formato de imagen no aceptada. Los formatos de imagen aceptados son: ${acceptedExtensions}`;
                inputsErrors[this.name] = true;
            } else if (validator.isEmpty(inputValue)) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> es obligatorio`;
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
        if (validator.isEmpty(input.value)) {
            inputsErrors[input.name] = true;
            input.classList.add('is-invalid');
            input.nextElementSibling.innerHTML = 'Campo obligatorio';
        }
    });

    console.table(inputsErrors);

    if (Object.keys(inputsErrors).length > 0) {
        e.preventDefault();
    }
});