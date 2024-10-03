// Array para armazenar os dados
const users = [];
const clients = [];
const suppliers = [];
const products = [];

// Função para limpar todos os formulários
function clearForms() {
    // Seleciona todos os formulários da página
    const forms = document.querySelectorAll('form');
    
    // Itera sobre todos os formulários e limpa seus inputs                     
    forms.forEach((form) => {
        form.reset();
    });
}

// Função para exibir a seção de login
function showLogin() {
    hideMessages();
    clearForms(); // Limpa os campos ao mudar para a tela de login
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'none';
}

// Função para exibir a seção de registro
function showRegister() {
    clearForms(); // Limpa os campos ao mudar para a tela de login
    hideMessages();
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}
function showEmpresa() {
    // Esconder todas as outras seções
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('sobrenos-section').style.display = 'block';

}
//Fução para exibir o sobre a empresa
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Função para esconder as mensagens
function hideMessages() {
    const messageElements = document.querySelectorAll('.message');
    messageElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Função para exibir a seção principal
function showMain() {
    hideMessages();
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'block';
}

// Função para exibir uma seção específica
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Função para mostrar um formulário específico
function showForm(formId) {
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

// Função para mostrar uma mensagem
function showMessage(elementId, message, isError) {
    hideMessages(); // Esconde todas as mensagens antes de exibir a nova
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    messageElement.className = isError ? 'message error' : 'message success'; // Aplica a classe correta
}


// Função para o login de usuário
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        showMain();
    } else {
        showMessage('login-error', 'Usuário ou senha incorretos', true);
        setTimeout(showLogin, 700);
    }
});

// Função para registro de novo usuário
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Verificar se a senha tem pelo menos 4 caracteres
    if (password.length < 4 && confirmPassword === password) {
        showMessage('register-error', 'A senha deve ter no mínimo 4 caracteres.', true);
        setTimeout(showRegister, 700);
        return;
    } if (password.length != confirmPassword){
        showMessage('register-error', 'Senhas não coincidem', true);
        setTimeout(showRegister, 700);
    }

    // Verificar se as senhas coincidem
    if (password === confirmPassword) {
        if (users.find(u => u.username === username)) {
            showMessage('register-error', 'Conta existente', true);
        } else {
            users.push({ username, password });
            showMessage('register-success', 'Conta criada com sucesso', false);
            setTimeout(showLogin, 700);
        }
    }
     else {
        showMessage('register-error', 'Senhas não coincidem', true);
    }
});

// Função para exibir o alerta com uma mensagem personalizada
function showAlert(message) {
    const alertMessage = document.getElementById('alert-message');
    const alertContainer = document.getElementById('custom-alert');
    if (alertMessage && alertContainer) {
        alertMessage.innerText = message; // Define a mensagem do alerta
        alertContainer.style.display = 'flex'; // Exibe o alerta
    }
}

// Função para fechar o alerta
function closeAlert() {
    const alertContainer = document.getElementById('custom-alert');
    if (alertContainer) {
        alertContainer.style.display = 'none'; // Esconde o alerta
    }
}


// Função para salvar cliente
function saveClient() {
    const name = document.getElementById('cliente-nome').value;
    const rg = document.getElementById('cliente-rg').value;
    const cpf = document.getElementById('cliente-cpf').value;
    const birthDate = document.getElementById('cliente-data-nascimento').value;
    const address = document.getElementById('cliente-endereco').value;

    // Validação para garantir que todos os campos sejam preenchidos
    if (!name || !rg || !cpf || !birthDate || !address) {
        showAlert('Por favor, preencha todos os campos do cliente.'); // Usa o alerta personalizado
        return;
    }

    clients.push({ name, rg, cpf, birthDate, address });
    document.getElementById('cliente-nome').value = '';
    document.getElementById('cliente-rg').value = '';
    document.getElementById('cliente-cpf').value = '';
    document.getElementById('cliente-data-nascimento').value = '';
    document.getElementById('cliente-endereco').value = '';

    showAlert('Cliente cadastrado com sucesso!'); // Alerta de sucesso
}

// Função para salvar fornecedor
function saveSupplier() {
    const cnpj = document.getElementById('fornecedor-cnpj').value;
    const name = document.getElementById('fornecedor-nome').value;
    const address = document.getElementById('fornecedor-endereco').value;

    // Validação para garantir que todos os campos sejam preenchidos
    if (!cnpj || !name || !address) {
        showAlert('Por favor, preencha todos os campos do fornecedor.'); // Usa o alerta personalizado
        return;
    }

    suppliers.push({ cnpj, name, address });
    document.getElementById('fornecedor-cnpj').value = '';
    document.getElementById('fornecedor-nome').value = '';
    document.getElementById('fornecedor-endereco').value = '';

    showAlert('Fornecedor cadastrado com sucesso!'); // Alerta de sucesso
}

// Função para salvar produto
function saveProduct() {
    const code = document.getElementById('produto-codigo').value;
    const name = document.getElementById('produto-nome').value;
    const description = document.getElementById('produto-descricao').value;
    const value = parseFloat(document.getElementById('produto-valor').value);

    // Validação para garantir que todos os campos sejam preenchidos
    if (!code || !name || !description || isNaN(value)) {
        showAlert('Por favor, preencha todos os campos do produto.'); // Usa o alerta personalizado
        return;
    }

    products.push({ code, name, description, value });
    document.getElementById('produto-codigo').value = '';
    document.getElementById('produto-nome').value = '';
    document.getElementById('produto-descricao').value = '';
    document.getElementById('produto-valor').value = '';

    updateProductDropdown();
    showAlert('Produto cadastrado com sucesso!'); // Alerta de sucesso
}

// Função para atualizar o dropdown de produtos
function updateProductDropdown() {
    const dropdown = document.getElementById('venda-produto');
    dropdown.innerHTML = '<option value="" disabled selected>Selecione um produto</option>';
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.code;
        option.textContent = `${product.name} - R$${product.value.toFixed(2)}`;
        dropdown.appendChild(option);
    });
}

// Função para processar venda
function processSale() {
    const productCode = document.getElementById('venda-produto').value;
    const quantity = parseInt(document.getElementById('venda-quantidade').value);
    
    const product = products.find(p => p.code === productCode);
    if (product) {
        const total = product.value * quantity;
        document.getElementById('venda-status').textContent = `Venda realizada: ${product.name} x${quantity} - Total: R$${total.toFixed(2)}`;
    } else {
        document.getElementById('venda-status').textContent = 'Produto não encontrado';
    }
}

// Função para listar dados
function showList(type) {
    const resultsDiv = document.getElementById('listar-results');
    resultsDiv.innerHTML = '';

    let data;
    let emptyMessage = '';

    // Verificação do tipo de lista para definir o texto padrão
    switch (type) {
        case 'clientes':
            data = clients;
            emptyMessage = 'Nenhum cliente encontrado.';
            break;
        case 'fornecedores':
            data = suppliers;
            emptyMessage = 'Nenhum fornecedor encontrado.';
            break;
        case 'produtos':
            data = products;
            emptyMessage = 'Nenhum produto encontrado.';
            break;
        default:
            data = [];
            emptyMessage = 'Nenhum item encontrado.';
    }

    // Mapeamento das traduções para português
    const translations = {
        name: 'Nome',          // Para clientes e fornecedores
        rg: 'RG',              // Para clientes
        cpf: 'CPF',            // Para clientes
        birthDate: 'Data de Nascimento', // Para clientes
        address: 'Endereço',   // Para clientes e fornecedores
        cnpj: 'CNPJ',          // Para fornecedores
        code: 'Código',        // Para produtos
        description: 'Descrição', // Para produtos
        value: 'Valor'         // Para produtos
    };

    if (data.length === 0) {
        resultsDiv.innerHTML = `<label><p>${emptyMessage}</p></label>`;
    } else {
        const table = document.createElement('table');
        const header = document.createElement('thead');
        const headerRow = document.createElement('tr');

        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = translations[key] || key.charAt(0).toUpperCase() + key.slice(1); // Usar a tradução ou o nome original
            headerRow.appendChild(th);
        });
        header.appendChild(headerRow);
        table.appendChild(header);

        const body = document.createElement('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                row.appendChild(td);
            });
            body.appendChild(row);
        });
        table.appendChild(body);

        resultsDiv.appendChild(table);
    }
}

// Função para gerar relatório
function generateReport(type) {
    let data = [];
    let header = "";

    if (type === 'clientes') {
        data = clients;
        header = "Nome".padEnd(20) + "RG".padEnd(15) + "CPF".padEnd(15) + "Data de Nascimento".padEnd(20) + "Endereço";
    } else if (type === 'produtos') {
        data = products;
        header = "Código".padEnd(10) + "Nome".padEnd(20) + "Descrição".padEnd(30) + "Valor";
    } else if (type === 'fornecedores') {
        data = suppliers;
        header = "CNPJ".padEnd(20) + "Nome".padEnd(20) + "Endereço";
    }

    // Criando o conteúdo do relatório
    let reportContent = header + "\n" + "-".repeat(header.length) + "\n";

    // Preenchendo os dados
    data.forEach(item => {
        if (type === 'clientes') {
            reportContent += 
                item.name.padEnd(20) + 
                item.rg.padEnd(15) + 
                item.cpf.padEnd(15) + 
                item.birthDate.padEnd(20) + 
                item.address.padEnd(30) + "\n";
        } else if (type === 'produtos') {
            reportContent += 
                item.code.toString().padEnd(10) + 
                item.name.padEnd(20) + 
                item.description.padEnd(30) + 
                item.value.toFixed(2).padEnd(10) + "\n";
        } else if (type === 'fornecedores') {
            reportContent += 
                item.cnpj.padEnd(20) + 
                item.name.padEnd(20) + 
                item.address.padEnd(30) + "\n";
        }
    });

    // Criando o arquivo .txt com conteúdo formatado
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-relatorio.txt`;
    a.click();
    URL.revokeObjectURL(url);
}


// Função para mostrar o formulário do relatório selecionado
function showReportForm(type) {
    document.querySelectorAll('.report-form').forEach(form => form.style.display = 'none');
    document.getElementById(`report-${type}`).style.display = 'block';
}

// Função para logout
function logout() {
    document.getElementById('main-section').style.display = 'none';
    showLogin();
}

function mostrarDireitos() {
    // Esconder todas as outras seções
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'none';
    // Exibir a seção de direitos
    document.getElementById('direitos-section').style.display = 'block';
}

function showChat() {
    // Esconder todas as outras seções
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('sobrenos-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'block';
}
function voltarParaPrincipal() {
    // Ocultar a seção de direitos
    document.getElementById('direitos-section').style.display = 'none';
    document.getElementById('sobrenos-section').style.display = 'none';
    // Mostrar a seção de login
    document.getElementById('login-section').style.display = 'block';
}

// script.js
function filterList() {
    const filter = document.getElementById('search').value.toLowerCase();
    const items = document.querySelectorAll('.list-item');
    items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filter) ? '' : 'none';
    });
}

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', () => {
            const loginPasswordInput = document.getElementById('login-password');
            if (loginPasswordInput.type === 'password') {
                loginPasswordInput.type = 'text';
                toggleLoginPassword.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                loginPasswordInput.type = 'password';
                toggleLoginPassword.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }

    if (toggleRegisterPassword) {
        toggleRegisterPassword.addEventListener('click', () => {
            const registerPasswordInput = document.getElementById('register-password');
            if (registerPasswordInput.type === 'password') {
                registerPasswordInput.type = 'text';
                toggleRegisterPassword.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                registerPasswordInput.type = 'password';
                toggleRegisterPassword.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }
    
});
window.addEventListener('load', function () {
    // Manter a tela de carregamento por 5 segundos antes de ocultá-la
    setTimeout(function() {
        // Ocultar a tela de carregamento
        document.getElementById('loading-screen').style.display = 'none';
        
        // Exibir o conteúdo do site
        document.getElementById('content').style.display = 'block';
    }, 150); // 5000 milissegundos = 5 segundos
});

document.getElementById('sendButton').addEventListener('click', function() {
    var userMessage = document.getElementById('userMessage').value;
    if (userMessage.trim() !== '') {
        // Exibir a mensagem no chat
        var chatBody = document.getElementById('chatBody');
        var messageElement = document.createElement('div');
        messageElement.textContent = 'Você: ' + userMessage;
        chatBody.appendChild(messageElement);
  
        // Enviar notificação via WhatsApp
        var whatsappGroupLink = 'https://tawk.to/chat/66fede7137379df10df15937/1i99p9rfj'; // Link do grupo do WhatsApp
        var whatsappMessage = encodeURIComponent('ISAU: ' + userMessage);
        var whatsappUrl = whatsappGroupLink + '?text=' + whatsappMessage; // Usando o link do grupo
        window.open(whatsappUrl, '_blank');
  
        // Limpar o campo de entrada
        document.getElementById('userMessage').value = '';
    }
});

  
// Seleciona os elementos
const chatWidget = document.getElementById('chatWidget'); // Caixa de chat
const chatHeader = document.getElementById('chatHeader'); // Cabeçalho do chat
const closeChat = document.getElementById('closeChat'); // Botão de fechar

let isDragging = false; // Variável de controle de arrasto
let offsetX, offsetY; // Variáveis para armazenar a posição do mouse

// Mostrar/ocultar chat ao clicar no ícone
chatToggle.addEventListener('click', function() {
  chatWidget.style.display = 'block'; // Exibe a caixa de chat
  chatToggle.style.display = 'none'; // Esconde o ícone flutuante
});

// Função para fechar o chat e voltar ao ícone flutuante
closeChat.addEventListener('click', function() {
  chatWidget.style.display = 'none'; // Esconde a caixa de chat
  chatToggle.style.display = 'flex'; // Exibe o ícone flutuante novamente
});



// Atualiza o dropdown de produtos ao carregar a página
document.addEventListener('DOMContentLoaded', updateProductDropdown);

