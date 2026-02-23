let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
let editandoId = null;

const tabela = document.getElementById('tabelaContatos');
const totalLabel = document.getElementById('totalContatos');

function renderizar(filtro = '') {
    tabela.innerHTML = '';
    const listaFiltrada = contatos.filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()));
    
    listaFiltrada.forEach((contato, index) => {
        const row = tabela.insertRow();
        row.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.telefone}</td>
            <td>
                <button class="btn-alterar" onclick="prepararEdicao(${index})">Alterar</button>
                <button class="btn-excluir" onclick="excluirContato(${index})">Excluir</button>
            </td>
        `;
    });
    totalLabel.innerText = `Total de Contatos: ${listaFiltrada.length}`;
}

function salvarContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    if (!nome || !email || !telefone) return alert("Preencha todos os campos!");

    const novoContato = { nome, email, telefone };

    if (editandoId !== null) {
        contatos[editandoId] = novoContato;
        editandoId = null;
        document.getElementById('btnSalvar').innerText = "Cadastrar";
    } else {
        contatos.push(novoContato);
    }

    localStorage.setItem('contatos', JSON.stringify(contatos));
    limparCampos();
    renderizar();
}

function excluirContato(index) {
    contatos.splice(index, 1);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    renderizar();
}

function prepararEdicao(index) {
    const contato = contatos[index];
    document.getElementById('nome').value = contato.nome;
    document.getElementById('email').value = contato.email;
    document.getElementById('telefone').value = contato.telefone;
    editandoId = index;
    document.getElementById('btnSalvar').innerText = "Atualizar";
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
}

// Evento de filtro
document.getElementById('filterInput').addEventListener('input', (e) => {
    renderizar(e.target.value);
});

// Inicialização
renderizar();