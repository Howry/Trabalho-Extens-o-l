// --- Dados dos Animais (Exemplo) ---
// Em um projeto real, isso poderia vir de um arquivo JSON carregado com fetch
const animaisDetalhes = [
    {
      id: 1,
      nome: "Bia",
      imagem: "animais/Bia.png", // Imagem maior para o modal
      descricao: "Abandonada no distrito de Neolandia. Ajude dando um lar para Bia.",
      infoExtra: ["Vacinado (V8/Raiva)", "Castrado", "Vermifugado", "Porte Médio", "Idade: 2 anos", "Muito ativo"],
      linkAdocao: "/formulario-interesse?animal=Fido&id=1" // Link para formulário (exemplo)
    },
    {
      id: 2,
      nome: "Hermione",
      imagem: "animais/Hermione.png", // Imagem maior para o modal
      descricao: "Essa filhote docil e carinhos foi abandonada e precisa muito de um lar!",
      infoExtra: ["Vacinada (V4/Raiva)", "Castrada", "Vermifugada", "Porte Pequeno", "Idade: 5 meses", "Testada FIV/FeLV (Negativo)"],
      linkAdocao: "/formulario-interesse?animal=Mia&id=2" // Link para formulário (exemplo)
    },

    {
      id: 3,
      nome: "Oscar",
      imagem: "animais/Oscar.png", // Imagem maior para o modal
      descricao: "Abandonado no centro de Itapeerica e está muito magro. É dociol e carinhoso, e está em busca de uma familia responsavel.",
      infoExtra: ["Vacinada (V4/Raiva)", "Castrada", "Vermifugada", "Porte Pequeno", "Idade: 5 meses", "Testada FIV/FeLV (Negativo)"],
      linkAdocao: "/formulario-interesse?animal=Mia&id=2" // Link para formulário (exemplo)
    },

    {
      id: 4,
      nome: "Platão",
      imagem: "animais/Platao.png", // Imagem maior para o modal
      descricao: "Um estopinha muito impatico, bonzinho e carinhoso. Não fica bem nas ruas. Está magro e precisando de cuidados",
      infoExtra: ["Vacinada (V4/Raiva)", "Castrada", "Vermifugada", "Porte Pequeno", "Idade: 5 meses", "Testada FIV/FeLV (Negativo)"],
      linkAdocao: "/formulario-interesse?animal=Mia&id=2" // Link para formulário (exemplo)
    },

    {
      id: 5,
      nome: "Thomas",
      imagem: "animais/Thomas.png", // Imagem maior para o modal
      descricao: "Abandonado no centro de Itapecerica. É extremamente docil e carinhoso, e está em busca de uma familia responsavel",
      infoExtra: ["Vacinada (V4/Raiva)", "Castrada", "Vermifugada", "Porte Pequeno", "Idade: 5 meses", "Testada FIV/FeLV (Negativo)"],
      linkAdocao: "/formulario-interesse?animal=Mia&id=2" // Link para formulário (exemplo)
    },

    {
      id: 6,
      nome: "Anne",
      imagem: "animais/Anne.png", // Imagem maior para o modal
      descricao: "Essa bebe foi abandonada no bairro Nova ITA, Quem vai dar um lar para essa peludinha?",
      infoExtra: ["Vacinada (V4/Raiva)", "Castrada", "Vermifugada", "Porte Pequeno", "Idade: 5 meses", "Testada FIV/FeLV (Negativo)"],
      linkAdocao: "/formulario-interesse?animal=Mia&id=2" // Link para formulário (exemplo)
    },

    {
      id: 7,
      nome: "Budy",
      imagem: "animais/Budy.png", // Imagem maior para o modal
      descricao: "O companheiro Ideal para muitas aventuras! Vamos dar um lar para ele?",
      infoExtra: ["Vacinada (V4/Raiva)", "Castrada", "Vermifugada", "Porte Pequeno", "Idade: 5 meses", "Testada FIV/FeLV (Negativo)"],
      linkAdocao: "/formulario-interesse?animal=Mia&id=2" // Link para formulário (exemplo)
    },
  
    {
      id: 8,
      nome: "Snoopy",
      imagem: "animais/Snoopy.png", // Imagem maior para o modal
      descricao: "Caozinho muito carinhoso. Que tal dar a ele chance de uma nova vida? Temos ceteza que sera um super companheiro",
      infoExtra: ["Vacinada (V4/Raiva)", "Castrada", "Vermifugada", "Porte Pequeno", "Idade: 5 meses", "Testada FIV/FeLV (Negativo)"],
      linkAdocao: "/formulario-interesse?animal=Mia&id=2" // Link para formulário (exemplo)
    },
  


    // Adicione objetos para cada animal aqui


    
  ];
  
  // --- Lógica do Modal ---
  
  // 1. Pegar os elementos do DOM
  const modal = document.getElementById('modal-detalhes');
  const btnFechar = document.querySelector('.fechar-modal');
  const todosBtnVerMais = document.querySelectorAll('.btn-ver-mais');
  
  // Elementos dentro do modal que serão atualizados
  const modalNome = document.getElementById('modal-nome');
  const modalImagem = document.getElementById('modal-imagem');
  const modalDescricao = document.getElementById('modal-descricao');
  const modalInfoLista = document.getElementById('modal-info');
  const modalLinkAdocao = document.getElementById('modal-link-adocao');
  
  
  // 2. Função para abrir o modal e preencher com dados
  function abrirModal(animalId) {
    // Encontra o objeto do animal correspondente no array 'animaisDetalhes'
    // Usa '==' pois dataset.animalId é string e o id no array é número
    const animal = animaisDetalhes.find(a => a.id == animalId);
  
    if (animal) {
      // Preenche os elementos do modal com os dados do animal encontrado
      modalNome.textContent = animal.nome;
      modalImagem.src = animal.imagem;
      modalImagem.alt = `Foto de ${animal.nome}`; // Atualiza o alt text
      modalDescricao.textContent = animal.descricao;
      modalLinkAdocao.href = animal.linkAdocao; // Atualiza o link do botão
  
      // Limpa a lista de informações extras antes de adicionar novas
      modalInfoLista.innerHTML = '';
      // Cria um item de lista (<li>) para cada informação extra e adiciona ao <ul>
      animal.infoExtra.forEach(info => {
        const li = document.createElement('li');
        li.textContent = info;
        modalInfoLista.appendChild(li);
      });
  
      // Mostra o modal mudando seu estilo 'display'
      modal.style.display = 'block';
    } else {
      // Caso não encontre o animal (erro ou ID inexistente)
      console.error("Detalhes do animal com ID", animalId, "não encontrados.");
      // Poderia mostrar uma mensagem de erro para o usuário aqui
    }
  }
  
  // 3. Função para fechar o modal
  function fecharModal() {
    modal.style.display = 'none';
  }
  
  // 4. Adicionar Event Listeners (Ouvintes de Eventos)
  
  // Para cada botão "Ver Mais"
  todosBtnVerMais.forEach(botao => {
    botao.addEventListener('click', () => {
      // Quando um botão é clicado, pega o 'data-animal-id' dele
      const animalId = botao.dataset.animalId;
      // Chama a função para abrir o modal com o ID correspondente
      abrirModal(animalId);
    });
  });
  
  // Para o botão de fechar (o 'X')
  btnFechar.addEventListener('click', fecharModal);
  
  // Para fechar o modal se o usuário clicar fora da área do conteúdo
  window.addEventListener('click', (event) => {
    // Verifica se o clique foi diretamente no fundo escuro do modal
    if (event.target === modal) {
      fecharModal();
    }
  });
  
  // (Opcional) Fechar o modal ao pressionar a tecla 'Escape'
  window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.style.display === 'block') {
          fecharModal();
      }
  });















// formulario
// Seleciona o formulário pelo ID
const formAdocao = document.getElementById('form-interesse-adocao');

// Verifica se o formulário existe na página antes de adicionar o listener
if (formAdocao) {
    // Adiciona um ouvinte para o evento 'submit' do formulário
    formAdocao.addEventListener('submit', function(event) {
        // 1. Impede o envio padrão do formulário
        event.preventDefault();

        // 2. Defina AQUI o número de WhatsApp da sua organização
        const numeroWhatsAppOrganização = '553799377485'; // <<< SUBSTITUA PELO SEU NÚMERO (formato internacional sem +, espaços ou -)

        // 3. Pega os valores dos campos do formulário
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const endereco = document.getElementById('endereco').value.trim();
        const animalInteresse = document.getElementById('animal-interesse').value.trim() || 'Não especificado'; // Valor padrão se vazio
        const tipoMoradia = document.getElementById('tipo-moradia').value;
        const experiencia = document.getElementById('experiencia').value.trim();
        //const concordaTermos = document.getElementById('termos').checked ? 'Sim' : 'Não'; // Verifica se o checkbox está marcado
        //const concordaVisita = document.getElementById('visita').checked ? 'Sim' : 'Não'; // Verifica se o checkbox está marcado

        // Validação básica (opcional mas recomendado) - Verifica se campos obrigatórios estão preenchidos
        if (!nome || !email || !telefone || !endereco || !tipoMoradia || !experiencia) {
            alert('Por favor, preencha todos os campos obrigatórios e marque as caixas de seleção.');
            return; // Interrompe a execução se a validação falhar
        }

        // 4. Monta a mensagem formatada (use \n para novas linhas)
        let mensagem = `🐾 *Formulário de Interesse em Adoção* 🐾\n\n`;
        mensagem += `*Nome:* ${nome}\n`;
        mensagem += `*E-mail:* ${email}\n`;
        mensagem += `*Telefone:* ${telefone}\n`;
        mensagem += `*Endereço:* ${endereco}\n\n`;
        mensagem += `*Animal de Interesse:* ${animalInteresse}\n`;
        mensagem += `*Tipo de Moradia:* ${tipoMoradia}\n`;
        mensagem += `*Experiência Anterior:* ${experiencia}\n\n`;
        //mensagem += `*Concorda com os Termos:* ${concordaTermos}\n`;
        //mensagem += `*Concorda com Visita Prévia:* ${concordaVisita}\n`;

        // 5. Codifica a mensagem para ser usada em uma URL
        const mensagemCodificada = encodeURIComponent(mensagem);

        // 6. Cria o link do WhatsApp
        const linkWhatsApp = `https://wa.me/${numeroWhatsAppOrganização}?text=${mensagemCodificada}`;

        // 7. Redireciona o usuário para o link do WhatsApp
        window.open(linkWhatsApp, '_blank'); // Abre em uma nova aba/janela

        // Opcional: Limpar o formulário após o envio (ou tentativa)
        formAdocao.reset();
        // Opcional: Mostrar uma mensagem de sucesso/instrução
        // alert('Verifique a nova aba para enviar sua mensagem pelo WhatsApp!');
    });
} else {
    console.warn("Elemento com ID 'form-interesse-adocao' não encontrado nesta página.");
}

// --- Fim ---