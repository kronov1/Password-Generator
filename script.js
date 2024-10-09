// Selecionando os elementos da página
const passwordInput = document.querySelector('.password');
const generateBtn = document.querySelector('.generate-btn');
const passwordLengthValue = document.querySelector('.password-length');

// Selecionando as checkboxes
const includeNumbers = document.querySelector('.include-numbers');
const includeLetters = document.querySelector('.include-letters');
const includeSymbols = document.querySelector('.include-symbols');
const includeUppercase = document.querySelector('.include-uppercase');
const includeLowercase = document.querySelector('.include-lowercase');

// Função para gerar uma senha aleatória
function generatePassword(length = 12) {
    // Definindo os caracteres que podem ser usados em cada categoria
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    
    let allCharacters = '';

    // Verificando quais checkboxes estão marcadas e adicionando os caracteres correspondentes
    if (includeNumbers.checked) {
        allCharacters += numbers;
    }
    if (includeLetters.checked) {
        // Se "letras" está marcada, mas nem maiúsculas nem minúsculas estão marcadas
        if (!includeUppercase.checked && !includeLowercase.checked) {
            // Adiciona ambas (maiúsculas e minúsculas)
            allCharacters += upperCase + lowerCase;
        } else {
            // Adiciona separadamente se as opções estiverem marcadas
            if (includeUppercase.checked) {
                allCharacters += upperCase;
            }
            if (includeLowercase.checked) {
                allCharacters += lowerCase;
            }
        }
    }
    if (includeSymbols.checked) {
        allCharacters += symbols;
    }

    // Garantindo que pelo menos uma categoria foi selecionada
    if (allCharacters === '') {
        // Muda a borda do input de senha para vermelho e inicia o fade-out
        passwordInput.classList.add('error-border');
        passwordInput.classList.remove('password');
        passwordInput.classList.add('placeholderActive');
        passwordInput.classList.remove('fade-out');  // Remove qualquer animação de fade-out anterior
        
        // Define um temporizador para iniciar o fade-out
        setTimeout(() => {
            passwordInput.classList.add('fade-out');
            passwordInput.classList.add('placeholderDontActive');
            passwordInput.classList.remove('placeholderActive');
        }, 1500);  // Espera 3 segundos antes de começar o fade-out

        return '';
    } else {
        // Remove a borda vermelha se uma senha for gerada com sucesso
        passwordInput.classList.remove('error-border', 'fade-out');
        passwordInput.classList.add('password');
        passwordInput.classList.add('placeholderDontActive');
    }

    let password = '';

    // Loop para gerar uma senha com o comprimento especificado
    for (let i = 0; i < length; i++) {
        // Escolhendo um caractere aleatório da string allCharacters
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}

// Adicionando um ouvinte de evento ao botão de gerar senha
generateBtn.addEventListener('click', () => {
    const length = parseInt(passwordLengthValue.value) || 12; // Define o comprimento da senha (padrão: 12)
    const newPassword = generatePassword(length); // Gera a senha
    if (newPassword) {
        passwordInput.value = newPassword; // Exibindo a senha no campo de texto
    }
});

// Seleciona o campo de comprimento da senha
const passwordLengthInput = document.querySelector('.password-length');

// Adiciona um evento de input ao campo
passwordLengthInput.addEventListener('input', function () {
    // Limita o número de caracteres a 2
    if (this.value.length > 2) {
        this.value = this.value.slice(0, 2);
    }

    // Adicionalmente, pode-se definir um limite máximo de valor
    const maxLength = 99;  // Define o valor máximo permitido
    if (this.value > maxLength) {
        this.value = maxLength;
    }
});
