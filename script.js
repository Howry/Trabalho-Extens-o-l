// --- Dados dos Animais (Exemplo) ---
// Em um projeto real, isso poderia vir de um arquivo JSON carregado com fetch
const animaisDetalhes = [
    {
      id: 1,
      nome: "Rubi",
      imagem: "animais/rubi.png", // Imagem maior para o modal
      descricao: "Fido é um cão extremamente dócil e leal. Adora brincar de buscar bolinha e passear no parque. Convive bem com crianças e outros animais. Está ansioso por uma família amorosa!",
      infoExtra: ["Vacinado (V8/Raiva)", "Castrado", "Vermifugado", "Porte Médio", "Idade: 2 anos", "Muito ativo"],
      linkAdocao: "/formulario-interesse?animal=Fido&id=1" // Link para formulário (exemplo)
    },
    {
      id: 2,
      nome: "Apolo",
      imagem: "animais/apolo.png", // Imagem maior para o modal
      descricao: "Mia é uma gatinha muito carinhosa e tranquila. Adora um carinho na barriga e dormir em locais quentinhos. É um pouco tímida no início, mas logo se solta. Perfeita para apartamento.",
      infoExtra: ["Vacinada (V4/Raiva)", "Castrada", "Vermifugada", "Porte Pequeno", "Idade: 5 meses", "Testada FIV/FeLV (Negativo)"],
      linkAdocao: "/formulario-interesse?animal=Mia&id=2" // Link para formulário (exemplo)
    }


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