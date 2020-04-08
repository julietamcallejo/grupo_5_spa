let form = document.querySelector('#productAddForm');
let submitButton = document.querySelector('.btn');

let formElements = Array.from(form.elements);
formElements.pop();
formElements.pop();
//splice(-1,-2);

//Objeto de errores
let inputsErrors = {};

formElements.forEach(function (input) {
    input.addEventListener('blur', function () {
        let inputValue = this.value;
        //validador
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

    });

    if (input.name == 'photo') {
		input.addEventListener('change', function () {
			let fileExtension = this.value.split('.').pop();
			let acceptedExtensions = ['jpg', 'jpeg', 'png', 'webm', 'svg'];
			if(!acceptedExtensions.includes(fileExtension)) {
				this.classList.add('is-invalid');
				this.classList.remove('is-valid');
				this.nextElementSibling.innerHTML = `Formato de imagen no aceptada. Los formatos de imagen aceptados son: ${acceptedExtensions}`;
				inputsWithErrors[this.name] = true;
			} else {
				this.classList.remove('is-invalid');
				this.classList.add('is-valid');
				this.nextElementSibling.innerHTML = '';
				delete inputsWithErrors[this.name];
			}
		});
	}
});

/*
window.addEventListener("load", function(){
    let formulario = document.querySelector("form.reservation");

    formulario.addEventListener("submit", function(e) {
        let errores = [];

        let campoNombre = document.querySelector("input.name");

        if (campoNombre.value == "") {
            errores.push("El campo de nombre tiene que estar completo");
        } else if (campoNombre.value.length < 3) {
            errores.push("El campo de nombre debe tener al menos 3 caracteres");
        }

        let campoMensaje = document.querySelector("input.message");

        if (campoMensaje.value == "") {
            errores.push("El campo de mensaje tiene que estar completo");
        }

        let campoFecha = document.querySelector("input.message");

        if (campoFecha.value == "") {
            errores.push("El campo de fecha tiene que estar completo");
        }

        let campoPersonas = document.querySelector("select.people");

        if (errores.length > 0) {
            e.preventDefault();

        let ulErrores = document.querySelector(div.errores.ul");

        for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        }}


    })
})
*/