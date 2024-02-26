document.addEventListener("DOMContentLoaded", function () {
    const showHiddenPass = (loginPass, loginEye) => {
        const input = document.getElementById(loginPass),
            iconEye = document.getElementById(loginEye)

        iconEye.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text'
                iconEye.classList.add('fa-eye')
                iconEye.classList.remove('fa-eye-slash')
            } else {
                input.type = 'password'
                iconEye.classList.remove('fa-eye')
                iconEye.classList.add('fa-eye-slash')
            }
        })
    }

    showHiddenPass('login-pass', 'login-eye')

    const isRegistroPage = window.location.pathname.includes('registro.html');
    const boxName = document.querySelector('.login__box-name');
    if (boxName) {
        if (isRegistroPage) {
            boxName.style.display = 'flex';
        } else {
            const nameInput = document.getElementById('login__name');
            if (nameInput) {
                nameInput.disabled = true;
            }
        }
    }

    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modal-message');
    const myForm = document.querySelector('.login__form');

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('login__name');
        const name = nameInput.value;

        modalMessage.textContent = 'Bienvenid@ ' + name;
        modal.style.display = 'block';

        setTimeout(function () {
            modal.style.display = 'none';
            window.location.href = 'index.html';
        }, 2000);
    });

    const closeModal = document.querySelector('.close');
    closeModal.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});