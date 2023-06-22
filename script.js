let materiais = ['plástico', 'metal', 'papel', 'vidro', 'orgânico']
let borda = new Map()
borda = [(materiais[0], "#ff1818"), (materiais[1], "#ffff18"), (materiais[2], "#2018ff"), (materiais[3], "#18ff24"), (materiais[4], "#4b3621")]
let back = new Map()
back = [(materiais[0], "#ff8282"), (materiais[1], "#fff982"), (materiais[2], "#8284ff"), (materiais[3], "#82ff88"), (materiais[4], "#c3874b")]
let dica1 = new Object();
let dica2 = new Object();
let dica3 = new Object();
dica1.texto = "O ideal é manter os plásticos utilizados em uma sacola. Isso facilita a coleta pelos catadores e evita a contaminação a partir de outros resíduos. É importante que os resíduos estejam em uma única lixeira, podendo, assim, serem recolhidos pela coleta seletiva.";
dica1.tipo = materiais[0]
dica2.texto = "Em casa, lembre-se sempre de separar os metais do lixo comum (orgânico). Depois de separado, deposite na lixeira correta para reciclagem no seu condomínio ou nos Pontos de Entrega Voluntária (PEV). Em alguns casos, os metais são triturados. A trituração é feita para promover o processo de fusão";
dica2.tipo = materiais[1]
dica3.texto = "A reciclagem do papel reflete na economia de água e energia, melhora a limpeza das cidades e, com isso, previne enchentes. Além disso, gera renda para muita gente, já que existem cooperativas que contratam pessoas para trabalhar nesse seguimento. Observação: Papel higiênico sujo ou engordurado, plastificado, carbono, vegetal, metalizado, fitas adesivas, etc. não podem ser reciclados.";
dica3.tipo = materiais[2]
let dicas = [dica1, dica2, dica3];

const initialTips = [
    { texto: dica1.texto , tipo: dica1.tipo },
    { texto: dica2.texto, tipo: dica2.tipo },
    { texto: dica3.texto, tipo: dica3.tipo },
];

//Cria localStorage para as dicas
const localStorageTips = JSON.parse(localStorage
    .getItem('tips'))
let tips = localStorage
.getItem('tips') !== null ? localStorageTips : initialTips

//navigator
let list = document.querySelector('ul');
list.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'A') {
        if (ev.target.classList.contains('active')) {
        } else {
            ev.target.classList.add('active');
            switch (ev.target.id) {
                case 'pg1':
                    document.getElementById('pg2').classList.remove('active');
                    document.getElementById('pg3').classList.remove('active');
                    document.getElementById('cadDicas').style.display = "none";
                    document.getElementById('listDicas').style.display = "none";
                    document.getElementById('home').style.display = "block";
                    break;
                case 'pg2':
                    document.getElementById('pg1').classList.remove('active');
                    document.getElementById('pg3').classList.remove('active');
                    document.getElementById('home').style.display = "none";
                    document.getElementById('listDicas').style.display = "none";
                    document.getElementById('cadDicas').style.display = "block";
                    break;
                case 'pg3':
                    document.getElementById('pg2').classList.remove('active');
                    document.getElementById('pg1').classList.remove('active');
                    document.getElementById('cadDicas').style.display = "none";
                    document.getElementById('home').style.display = "none";
                    document.getElementById('listDicas').style.display = "block";
                    atualizaLista();
                    break;

                default:
                    break;
            }
        }
    }

});

//Atualiza localStorage das dicas
const updatelocalStorage = () => {
    localStorage.setItem('tips', JSON.stringify(tips))
}

//Cadastrar Dica
let cadastrar = document.getElementById('btn-enviar');
cadastrar.addEventListener('click', () => {

    let dica = new Object();
    let radios = document.getElementsByName('cdmaterial')
    dica.texto = document.getElementById('fdica').value;
    if (dica.texto != null && dica.texto != " " && dica.texto != "") {
    } else {
        alert('dicaErro')
        exit;
    }
    let check = false
    for (opcao in radios) {
        if (radios[opcao].checked) {
            dica.tipo = radios[opcao].value;
            check = true;
            break;
        }
    }
    if (check) {
        document.getElementById('fdica').value = "";
        tips.push(dica);
        updatelocalStorage();
        //salvar dica
        alert('ok');
    } else {
        alert('tipoErro')
    }
})

function alert(e) {
    switch (e) {
        case 'ok':
            document.getElementById('container-msg').style = "background-color: #82ff88;border-color: #1c7a20; display:inline-block;";
            document.getElementById('text-msg').style.color = "#1c7a20"
            document.getElementById('text-msg').innerText = "DICA CADASTRADA COM SUCESSO"
            break;
        case 'dicaErro':
            document.getElementById('container-msg').style = "background-color: #ff8282;border-color: #ff1818; display:inline-block;";
            document.getElementById('text-msg').style.color = "#ff1818"
            document.getElementById('text-msg').innerText = "CAMPO DA DICA EM BRANCO"
            break;
        case 'tipoErro':
            document.getElementById('container-msg').style = "background-color: #ff8282;border-color: #ff1818; display:inline-block;";
            document.getElementById('text-msg').style.color = "#ff1818"
            document.getElementById('text-msg').innerText = "CAMPO DO MATERIAL EM BRANCO"
            break;
    }
}

document.getElementById('btn-filtrar').addEventListener('click', (evt) => {
    let radios = document.getElementsByName('flmaterial')
    let tipo = null;
    for (opcao in radios) {
        if (radios[opcao].checked) {
            tipo = radios[opcao].value;
            break;
        }
    }
    if (tipo != null) {
        atualizaLista(tipo)
    } else {
        //Mensagem Não Selecionado
    }
})

document.getElementById('btn-naofiltrar').addEventListener('click', (evt) => atualizaLista())

function atualizaLista(e) {
    let lista_item = document.getElementById('list-dica')
    if (e != null) {
        lista_item.innerHTML = "";
        if (tips != null && tips != []) {
            let x = 0;
            for (x = 0; x < tips.length; x++) {
                if (tips[x].tipo == e) {
                    let text = "<div class = 'item " + tips[x].tipo + "-div' id = " + x + "><div class = 'item-text'><p class='item-tipo'>Tipo: " + tips[x].tipo.toUpperCase() + "</p><p class='item-dica'>Dica: " + tips[x].texto + "</p></div><div class = 'item-btn'><button class='btn btn-excluir' id='btnex-" + x + "' type='button'>Excluir</button></div></div>"
                    lista_item.insertAdjacentHTML("beforeend", text)
                }
            }
        } else {
            //lista Vazia
        }
    } else {

        lista_item.innerHTML = "";
        if (tips != null && tips != []) {
            let x = 0;
            for (x = 0; x < tips.length; x++) {
                let text = "<div class = 'item " + tips[x].tipo + "-div' id = " + x + "><div class = 'item-text'><p class='item-tipo'>Tipo: " + tips[x].tipo.toUpperCase() + "</p><p class='item-dica'>Dica: " + tips[x].texto + "</p></div><div class = 'item-btn'><button class='btn btn-excluir' id='btnex-" + x + "' type='button'>Excluir</button></div></div>"
                lista_item.insertAdjacentHTML("beforeend", text)

            }
        } else {
            //lista Vazia
        }
    }
}

//Função Excluir
document.getElementById('list-dica').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        let id_tg = e.target.id.split('-')
        console.log(e.target)
        console.log(id_tg[1])
        tips.splice(parseInt(id_tg[1]), 1);
        atualizaLista();
        updatelocalStorage()
    }
})

//Cria localStorage para os horários de coleta
const localStorageTimes = JSON.parse(localStorage
    .getItem('times'))
let times = localStorage
.getItem('times') !== null ? localStorageTimes : []

//Atualiza localStorage dos horários de coleta
const updatelocalStorageTimes = () => {
    localStorage.setItem('times', JSON.stringify(times))
}

//Função Mostrar horários de coleta
let listar = document.getElementById('btn-listar');
let tabelaColeta = document.getElementById('tabela-coleta');
let thead = tabelaColeta.querySelector('thead');
let tbody = tabelaColeta.querySelector('tbody');
let tabelaVisivel = false;

listar.addEventListener('click', () => {
    if (tabelaVisivel) {
        thead.style.display = 'none';
        tbody.innerHTML = '';
        tabelaVisivel = false;
    } else {
        thead.style.display = 'table-header-group';

        let times = [
            { bairro: 'Jardim Adamantina', reciclavel: 'Segunda', organico: 'Terça, Quinta, Sexta e Sábado' },
            { bairro: 'Parque do Sol', reciclavel: 'Terça', organico: 'Segunda, Quarta, Quinta, Sexta e Sábado' },
            { bairro: 'Jardim Bela Vista', reciclavel: 'Quarta', organico: 'Segunda, Terça, Quinta, Sexta e Sábado' },
            { bairro: 'Jardim Ipiranga', reciclavel: 'Quinta', organico: 'Segunda, Terça, Quarta, Sexta e Sábado' },
            { bairro: 'Parque dos Lagos', reciclavel: 'Terça', organico: 'Quarta e Sábado' },
            { bairro: 'João Rocha', reciclavel: 'Segunda', organico: 'Terça, quinta e sábado' },
        ];
        
        updatelocalStorageTimes()

        times.forEach((dados) => {
            let tr = document.createElement('tr');

            let tdBairro = document.createElement('td');
            tdBairro.textContent = dados.bairro;
            tr.appendChild(tdBairro);

            let tdReciclavel = document.createElement('td');
            tdReciclavel.textContent = dados.reciclavel;
            tr.appendChild(tdReciclavel);

            let tdOrganico = document.createElement('td');
            tdOrganico.textContent = dados.organico;
            tr.appendChild(tdOrganico);

            tbody.appendChild(tr);
        });

        tabelaVisivel = true;
    }
});
