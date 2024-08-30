// Dados fictícios para login e registro
const users = [
    {
        username: 'admin',
        password: 'admin123'
    }
];

// Função para exibir a seção de registro
function showRegister() {
    hideMessages(); // Esconde as mensagens
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}

// Função para exibir a seção de login
function showLogin() {
    hideMessages(); // Esconde as mensagens
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

// Função para esconder todas as mensagens de erro e sucesso
function hideMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        message.style.display = 'none';
    });
}

// Função para exibir seções
function showSection(sectionId) {
    hideMessages(); // Esconde as mensagens
    const sections = document.querySelectorAll('#main-section .section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Função para exibir formulário
function showForm(formId) {
    hideMessages(); // Esconde as mensagens
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

// Função de logout
function logout() {
    hideMessages(); // Esconde as mensagens
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

// Função para manipular o login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const loginError = document.getElementById('login-error');

    const user = users.find(user => user.username === username && user.password === password);

    hideMessages(); // Esconde as mensagens

    if (user) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('main-section').style.display = 'block';
    } else {
        loginError.textContent = 'Usuário ou senha incorretos';
        loginError.className = 'message error';
        loginError.style.display = 'block';
    }
});

// Função para manipular o registro
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const registerError = document.getElementById('register-error');
    const registerSuccess = document.getElementById('register-success');

    hideMessages(); // Esconde as mensagens

    if (password !== confirmPassword) {
        registerError.textContent = 'As senhas não correspondem';
        registerError.className = 'message error';
        registerError.style.display = 'block';
        return;
    }

    if (users.find(user => user.username === username)) {
        registerError.textContent = 'Usuário já existe';
        registerError.className = 'message error';
        registerError.style.display = 'block';
        return;
    }

    users.push({ username, password });
    registerSuccess.textContent = 'Conta criada com sucesso!';
    registerSuccess.className = 'message success';
    registerSuccess.style.display = 'block';
    showLogin();
});

// Funções fictícias para salvar dados
function saveClient() {
    const client = {
        nome: document.getElementById('cliente-nome').value,
        rg: document.getElementById('cliente-rg').value,
        cpf: document.getElementById('cliente-cpf').value,
        dataNascimento: document.getElementById('cliente-data-nascimento').value,
        endereco: document.getElementById('cliente-endereco').value
    };
    clients.push(client);
    alert('Cliente salvo!');
    document.getElementById('cadastro-cliente').reset();
}

function saveSupplier() {
    const supplier = {
        cnpj: document.getElementById('fornecedor-cnpj').value,
        nome: document.getElementById('fornecedor-nome').value,
        endereco: document.getElementById('fornecedor-endereco').value
    };
    suppliers.push(supplier);
    alert('Fornecedor salvo!');
    document.getElementById('cadastro-fornecedor').reset();
}

function saveProduct() {
    const product = {
        codigo: document.getElementById('produto-codigo').value,
        nome: document.getElementById('produto-nome').value,
        descricao: document.getElementById('produto-descricao').value,
        valor: document.getElementById('produto-valor').value
    };
    products.push(product);
    alert('Produto salvo!');
    document.getElementById('cadastro-produto').reset();
    updateProductDropdown(); // Atualiza a lista de produtos na frente de caixa
}

// Dados fictícios para clientes, fornecedores e produtos
const clients = [];
const suppliers = [];
const products = [];

// Função para atualizar a lista de produtos na frente de caixa
function updateProductDropdown() {
    const productSelect = document.getElementById('venda-produto');
    productSelect.innerHTML = ''; // Limpa a lista existente

    products.forEach(product => {
        let option = document.createElement('option');
        option.value = product.codigo; // Pode ser um identificador único
        option.textContent = `${product.nome} - R$ ${product.valor}`;
        productSelect.appendChild(option);
    });
}

// Função para listar dados
function showList(type) {
    let resultsDiv = document.getElementById('listar-results');
    resultsDiv.innerHTML = '';

    let data;
    let headers;
    let title;
    
    switch (type) {
        case 'clientes':
            data = clients;
            headers = ['Nome', 'RG', 'CPF', 'Data de Nascimento', 'Endereço'];
            title = 'Clientes';
            break;
        case 'fornecedores':
            data = suppliers;
            headers = ['CNPJ', 'Nome', 'Endereço'];
            title = 'Fornecedores';
            break;
        case 'produtos':
            data = products;
            headers = ['Código', 'Nome', 'Descrição', 'Valor'];
            title = 'Produtos';
            break;
        default:
            resultsDiv.innerHTML = '<p>Tipo de listagem desconhecido.</p>';
            return;
    }

    if (data.length === 0) {
        resultsDiv.innerHTML = `<p class="no-data">Nenhum ${type} cadastrado.</p>`;
        return;
    }

    // Criar tabela
    let table = document.createElement('table');
    table.className = 'table';

    // Criar cabeçalho
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Criar corpo da tabela
    let tbody = document.createElement('tbody');
    data.forEach(item => {
        let row = document.createElement('tr');
        headers.forEach(header => {
            let td = document.createElement('td');
            td.textContent = item[header.toLowerCase()] || 'N/A'; // Adapte a chave conforme os dados
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    resultsDiv.appendChild(table);
}

// Função para processar a venda
function processSale() {
    const productCode = document.getElementById('venda-produto').value;
    const quantity = document.getElementById('venda-quantidade').value;
    const product = products.find(p => p.codigo == productCode);

    if (product) {
        const total = product.valor * quantity;
        document.getElementById('venda-status').textContent = `Venda realizada: ${quantity}x ${product.nome} - Total: R$ ${total.toFixed(2)}`;
    } else {
        document.getElementById('venda-status').textContent = 'Produto não encontrado!';
    }
}

// Função para gerar relatório em formato .txt
function generateReport(type) {
    let data = [];
    let fileName = '';

    if (type === 'clientes') {
        data = clients;
        fileName = 'relatorio_clientes.txt';
    } else if (type === 'produtos') {
        data = products;
        fileName = 'relatorio_produtos.txt';
    } else if (type === 'fornecedores') {
        data = suppliers;
        fileName = 'relatorio_fornecedores.txt';
    }

    let reportContent = '';

    if (data.length > 0) {
        reportContent = data.map((item, index) => {
            return `${index + 1}. ${JSON.stringify(item, null, 2)}`;
        }).join('\n\n');
    } else {
        reportContent = `Nenhum ${type.slice(0, -1)} cadastrado.`;
    }

    // Gera o arquivo txt
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}


