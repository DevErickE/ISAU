// Array para armazenar os dados
const users = [];
const clients = [];
const suppliers = [];
const products = [];

// Função para exibir a seção de login
function showLogin() {
    hideMessages();
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'none';
}

// Função para exibir a seção de registro
function showRegister() {
    hideMessages();
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
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
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Função para mostrar um formulário específico
function showForm(formId) {
    document.querySelectorAll('.form').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

// Função para mostrar uma mensagem
function showMessage(elementId, message, isError) {
    hideMessages();
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    messageElement.className = isError ? 'message error' : 'message success';
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
    }
});

// Função para registro de novo usuário
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password === confirmPassword) {
        if (users.find(u => u.username === username)) {
            showMessage('register-error', 'Conta existente', true);
        } else {
            users.push({ username, password });
            showMessage('register-success', 'Conta criada com sucesso', false);
            setTimeout(showLogin, 2000); // Voltar ao login após 2 segundos
        }
    } else {
        showMessage('register-error', 'Senhas não coincidem', true);
    }
});

// Função para salvar cliente
function saveClient() {
    const name = document.getElementById('cliente-nome').value;
    const rg = document.getElementById('cliente-rg').value;
    const cpf = document.getElementById('cliente-cpf').value;
    const birthDate = document.getElementById('cliente-data-nascimento').value;
    const address = document.getElementById('cliente-endereco').value;
    
    clients.push({ name, rg, cpf, birthDate, address });
    document.getElementById('cliente-nome').value = '';
    document.getElementById('cliente-rg').value = '';
    document.getElementById('cliente-cpf').value = '';
    document.getElementById('cliente-data-nascimento').value = '';
    document.getElementById('cliente-endereco').value = '';
    
    showMessage('client-success', 'Cliente cadastrado com sucesso', false);
}

// Função para salvar fornecedor
function saveSupplier() {
    const cnpj = document.getElementById('fornecedor-cnpj').value;
    const name = document.getElementById('fornecedor-nome').value;
    const address = document.getElementById('fornecedor-endereco').value;
    
    suppliers.push({ cnpj, name, address });
    document.getElementById('fornecedor-cnpj').value = '';
    document.getElementById('fornecedor-nome').value = '';
    document.getElementById('fornecedor-endereco').value = '';
    
    showMessage('supplier-success', 'Fornecedor cadastrado com sucesso', false);
}

// Função para salvar produto
function saveProduct() {
    const code = document.getElementById('produto-codigo').value;
    const name = document.getElementById('produto-nome').value;
    const description = document.getElementById('produto-descricao').value;
    const value = parseFloat(document.getElementById('produto-valor').value);
    
    products.push({ code, name, description, value });
    document.getElementById('produto-codigo').value = '';
    document.getElementById('produto-nome').value = '';
    document.getElementById('produto-descricao').value = '';
    document.getElementById('produto-valor').value = '';
    
    updateProductDropdown();
    showMessage('product-success', 'Produto cadastrado com sucesso', false);
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
    switch (type) {
        case 'clientes':
            data = clients;
            break;
        case 'fornecedores':
            data = suppliers;
            break;
        case 'produtos':
            data = products;
            break;
        default:
            data = [];
    }

    if (data.length === 0) {
        resultsDiv.innerHTML = '<p>Nenhum item encontrado</p>';
    } else {
        const table = document.createElement('table');
        const header = document.createElement('thead');
        const headerRow = document.createElement('tr');

        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
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
    const data = {
        clientes: clients,
        fornecedores: suppliers,
        produtos: products
    }[type];

    if (data.length === 0) {
        alert('Nenhum dado encontrado para gerar o relatório.');
        return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-report.txt`;
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

// Atualiza o dropdown de produtos ao carregar a página
document.addEventListener('DOMContentLoaded', updateProductDropdown);
