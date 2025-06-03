import React, { useState, useEffect } from "react";

const Presentes = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [presenteSelecionado, setPresenteSelecionado] = useState(null);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [animacaoCard, setAnimacaoCard] = useState({});

  const presentes = [
    {
      id: 1,
      nome: "Kit Escritório Profissional",
      descricao: "Agenda executiva, canetas premium Mont Blanc, porta-cartões em couro",
      preco: "R$ 45,00",
      emoji: "📝",
      categoria: "Profissional",
      disponivel: true,
    },
    {
      id: 2,
      nome: "Caneca Personalizada DS11",
      descricao: "Caneca térmica com logo da turma e nome personalizado",
      preco: "R$ 25,00",
      emoji: "☕",
      categoria: "Personalizado",
      disponivel: true,
    },
    {
      id: 3,
      nome: "Livro de Tecnologia",
      descricao: "Clean Code, Design Patterns ou outro clássico da programação",
      preco: "R$ 80,00",
      emoji: "📚",
      categoria: "Educacional",
      disponivel: true,
    },
    {
      id: 4,
      nome: "Planta para Mesa",
      descricao: "Suculenta ou mini jardim vertical para decorar o workspace",
      preco: "R$ 30,00",
      emoji: "🌱",
      categoria: "Decoração",
      disponivel: false,
    },
    {
      id: 5,
      nome: "Voucher Café Especial",
      descricao: "Vale-presente para cafeteria especializada em grãos premium",
      preco: "R$ 50,00",
      emoji: "🎫",
      categoria: "Experiência",
      disponivel: true,
    },
    {
      id: 6,
      nome: "Kit Chocolate Premium",
      descricao: "Seleção curada de chocolates artesanais e trufas gourmet",
      preco: "R$ 35,00",
      emoji: "🍫",
      categoria: "Gourmet",
      disponivel: true,
    },
    {
      id: 7,
      nome: "Powerbank Personalizado",
      descricao: "Carregador portátil 10000mAh com gravação laser DS11",
      preco: "R$ 60,00",
      emoji: "🔋",
      categoria: "Tech",
      disponivel: true,
    },
    {
      id: 8,
      nome: "Quadro Motivacional",
      descricao: "Arte minimalista com frase inspiradora para desenvolvedores",
      preco: "R$ 40,00",
      emoji: "🖼️",
      categoria: "Decoração",
      disponivel: true,
    },
    {
      id: 9,
      nome: "Kit Café Gourmet",
      descricao: "Grãos especiais, coador V60 e xícara de porcelana",
      preco: "R$ 75,00",
      emoji: "☕",
      categoria: "Gourmet",
      disponivel: true,
    },
    {
      id: 10,
      nome: "Mouse Pad RGB",
      descricao: "Mouse pad premium com iluminação RGB personalizada",
      preco: "R$ 55,00",
      emoji: "🖱️",
      categoria: "Tech",
      disponivel: true,
    }
  ];

  const categorias = ["Todos", ...new Set(presentes.map(p => p.categoria))];
  
  const presentesFiltrados = filtroCategoria === "Todos" 
    ? presentes 
    : presentes.filter(p => p.categoria === filtroCategoria);

  const abrirModal = (presente) => {
    setPresenteSelecionado(presente);
    setPagamentoConfirmado(false);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPresenteSelecionado(null);
    setPagamentoConfirmado(false);
  };

  const confirmarPagamento = () => {
    setPagamentoConfirmado(true);
  };

  const handleCardClick = (id) => {
    setAnimacaoCard(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAnimacaoCard(prev => ({ ...prev, [id]: false }));
    }, 200);
  };

  // Animação de entrada dos cards
  useEffect(() => {
    const cards = document.querySelectorAll('.gift-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, [filtroCategoria]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4 md:p-6">
      {/* Header com efeito glassmorphism */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                🎁 Lista de Presentes DS11
              </h1>
              <p className="text-gray-600 text-lg">Escolha o presente perfeito para nossos formandos</p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>←</span> Voltar
            </button>
          </div>
        </div>
      </div>

      {/* Filtros de categoria */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltroCategoria(categoria)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                filtroCategoria === categoria
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de presentes */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {presentesFiltrados.map((presente) => (
            <div
              key={presente.id}
              className={`gift-card group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden ${
                !presente.disponivel ? 'opacity-60' : ''
              } ${animacaoCard[presente.id] ? 'scale-95' : ''}`}
              onClick={() => handleCardClick(presente.id)}
            >
              {/* Badge de categoria */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {presente.categoria}
                </span>
              </div>

              {/* Badge de indisponível */}
              {!presente.disponivel && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Esgotado
                  </span>
                </div>
              )}

              <div className="p-6 text-center relative">
                {/* Emoji com animação */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {presente.emoji}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {presente.nome}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {presente.descricao}
                </p>
                
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                  {presente.preco}
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (presente.disponivel) abrirModal(presente);
                  }}
                  disabled={!presente.disponivel}
                  className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform ${
                    presente.disponivel
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {presente.disponivel ? '🎁 Escolher Este' : '😔 Indisponível'}
                </button>
              </div>

              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal melhorado */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full relative overflow-hidden animate-slideUp">
            {/* Header decorativo */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white text-center">
              <div className="text-4xl mb-2">{presenteSelecionado?.emoji}</div>
              <h2 className="text-2xl font-bold">
                {!pagamentoConfirmado ? 'Finalizar Presente' : '🎉 Surpresa! 🎉'}
              </h2>
            </div>

            <div className="p-8">
              {!pagamentoConfirmado ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {presenteSelecionado?.nome}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {presenteSelecionado?.descricao}
                    </p>
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {presenteSelecionado?.preco}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl mb-6 border border-yellow-200">
                    <p className="text-center text-gray-700 text-sm">
                      🤔 Você está quase finalizando sua contribuição...
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={confirmarPagamento}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      ✅ Confirmar Presente
                    </button>
                    <button
                      onClick={fecharModal}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold transition-all duration-300"
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4 animate-bounce">🎭</div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      <strong>Era só uma brincadeira!</strong>
                      <br />
                      O que vale mesmo é a intenção e o carinho de vocês. 
                      <br />
                      Obrigado por participar e apoiar nós formandos!
                    </p>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border border-purple-200">
                      <p className="text-purple-700 font-semibold">
                        Sua presença na nossa festinha já é o melhor presente!
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={fecharModal}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      😊 Entendi, obrigado!
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Presentes;