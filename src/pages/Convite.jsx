// src/pages/Convite.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Convite = () => {
  const navigate = useNavigate();

  const [dias, setDias] = useState(0);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confirmacao, setConfirmacao] = useState(null);
  const [nome, setNome] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [nomeConfirmado, setNomeConfirmado] = useState("");
  const [tipoConfirmacao, setTipoConfirmacao] = useState("");

  useEffect(() => {
    const dataFesta = new Date("July 04, 2025 17:30:00").getTime();

    const intervalo = setInterval(() => {
      const agora = new Date().getTime();
      const diferenca = dataFesta - agora;

      if (diferenca < 0) {
        clearInterval(intervalo);
        setDias(0);
        setHoras(0);
        setMinutos(0);
        setSegundos(0);
        return;
      }

      const d = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diferenca % (1000 * 60)) / 1000);

      setDias(d);
      setHoras(h);
      setMinutos(m);
      setSegundos(s);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 10000);
  };

  const Confetti = () => (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40 overflow-hidden">
      {Array.from({ length: 200 }).map((_, index) => (
        <div
          key={index}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-50px`,
            width: `${Math.random() * 15 + 10}px`,
            height: `${Math.random() * 15 + 10}px`,
            backgroundColor: [
              "#FF69B4",
              "#FFD700",
              "#FF6347",
              "#00CED1",
              "#9370DB",
              "#3E42F8",
              "#87CEEB",
              "#FF1493",
              "#32CD32",
              "#FF4500",
              "#1E90FF",
              "#FFB6C1",
            ][Math.floor(Math.random() * 12)],
            borderRadius:
              Math.random() > 0.6
                ? "50%"
                : `${Math.floor(Math.random() * 8)}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `confetti-fall ${Math.random() * 3 + 2}s linear forwards`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.4 + 0.6,
          }}
        />
      ))}
    </div>
  );

  const PopupConfirmacao = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 relative">
        <div className="text-center">
          {tipoConfirmacao === "sim" ? (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-4xl">🎉</div>
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-3">
                Confirmado!
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                <span className="font-bold text-purple-600">{nomeConfirmado}</span>
              </p>
              <p className="text-gray-600 mb-6">
                Sua presença foi confirmada com sucesso! <br />
                Estamos ansiosos para te ver! 🍕
              </p>

              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/presentes");
                }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎁 Ver Lista de Presentes
              </button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-4xl">😢</div>
              </div>
              <h2 className="text-3xl font-bold text-red-600 mb-3">Registrado!</h2>
              <p className="text-lg text-gray-700 mb-2">
                <span className="font-bold text-purple-600">{nomeConfirmado}</span>
              </p>
              <p className="text-gray-600 mb-6">
                Sua resposta foi registrada. <br />
                Você vai fazer muita falta! 💜
              </p>
            </>
          )}

          <button
            onClick={() => setShowPopup(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );

  const enviarParaPlanilha = async (nome, confirmacao) => {
    const url =
      "https://script.google.com/macros/s/AKfycbwXYPlkM_a0wjKgd4Xls1VJodpuV9yy_bw3PMnnGiu94zOyBZhS1c6a4A10_x8Gc3h7/exec";
    const params = new URLSearchParams();
    params.append("nome", nome);
    params.append("confirmacao", confirmacao);

    try {
      await fetch(url, {
        method: "POST",
        body: params,
      });
    } catch (error) {
      console.error("Erro ao enviar para planilha:", error);
    }
  };

  const formatarNome = (texto) => {
    return texto
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .split(" ")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");
  };

  const handleConfirmacao = (tipo) => {
    const nomeFormatado = formatarNome(nome);
    if (!nomeFormatado) return;

    setNomeConfirmado(nomeFormatado);
    setTipoConfirmacao(tipo);
    setConfirmacao(tipo);
    enviarParaPlanilha(nomeFormatado, tipo === "sim" ? "Sim" : "Não");

    if (tipo === "sim") {
      handleConfetti();
    }

    setShowPopup(true);
  };

  return (
    <div className="relative min-w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans p-6 flex items-center justify-center">
      {showConfetti && <Confetti />}
      {showPopup && <PopupConfirmacao />}

      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-5xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 30}deg)`,
                }}
              >
                💜
              </div>
            ))}
          </div>

          <h1 className="font-bold text-center text-3xl mb-1 tracking-wide">
            Convite Especial!
          </h1>
          <p className="text-center text-blue-100 text-sm">
            Nós da DS11 estamos convidando você!
          </p>
        </div>

        <div className="relative">
          <div className="h-56 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
            <div className="text-center relative z-10 p-4 bg-white bg-opacity-10 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-1">
                Rodízio de Pizza
              </div>
              <div className="text-xl md:text-2xl font-semibold text-gray-700">
                Digital Solutions 11
              </div>
            </div>

            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-4xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 45}deg)`,
                  }}
                >
                  🍕
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-8 text-center">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">
                  <span className="font-semibold text-purple-600">Quando:</span>{" "}
                  04 de Julho de 2025
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">
                  <span className="font-semibold text-purple-600">Horário:</span>{" "}
                  17:30
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">
                  <span className="font-semibold text-purple-600">Local:</span>{" "}
                  Condomínio Residencial Áurea
                </p>
              </div>

              <p className="text-gray-600 text-sm mt-[-15px]">
                Av. Cabo Pedro Hoffman, 235 - Res. Real Park Sumaré, Sumaré - SP,
                13178-574
              </p>
            </div>

            <a
              href="https://www.google.com/maps/place/Condom%C3%ADnio+Residencial+%C3%81urea/@-22.8298346,-47.2211005,18z/data=!4m6!3m5!1s0x94c8bc2c93e47c97:0x78bd373dd9fd7e51!8m2!3d-22.8299211!4d-47.2200169!16s%2Fg%2F11ckxw5l5c?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-purple-500 inline-block mt-7 bg-gradient-to-r hover:from-blue-100 hover:to-purple-200 text-purple-600 font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              📍 Ver no Google Maps
            </a>
          </div>

          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
              💰 Valor e Pagamento
            </h3>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">R$ 50,00</div>
              <p className="text-gray-900 text-sm">por pessoa (rodízio completo)</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-inner">
              <h4 className="font-semibold text-gray-700 mb-3 text-center">
                Pague via PIX
              </h4>

              <div className="flex justify-center mb-4">
                <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <img src="..\src\assets\images\qr_code.png" alt="" />
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="text-center font-medium text-gray-700 mb-3">
                  Dados para transferência manual:
                </p>

                <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                  <p>
                    <span className="font-medium">Banco:</span> MERCADO PAGO
                  </p>
                  <p>
                    <span className="font-medium">Chave PIX:</span>{" "}
                    gabriellly.lisboa@gmail.com
                  </p>
                  <p>
                    <span className="font-medium">CPF:</span> ***.624.418-**
                  </p>
                  <p>
                    <span className="font-medium">Nome:</span> Gabrielly de Sousa
                    Lisboa
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <p className="text-yellow-800 text-xs font-medium">
                    💡 Importante: Envie o comprovante de pagamento confirmando sua
                    participação!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <h3 className="text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Contagem regressiva
            </h3>
            <div className="flex justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 shadow-inner">
              <div className="text-center p-2">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {dias}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">
                  dias
                </div>
              </div>
              <div className="text-center p-2">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {horas}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">
                  horas
                </div>
              </div>
              <div className="text-center p-2">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {minutos}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">min</div>
              </div>
              <div className="text-center p-2">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {segundos}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">seg</div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <h3 className="text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Confirme sua presença
            </h3>

            <div className="mb-4">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full h-12 px-4 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700"
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  if (nome.trim()) {
                    handleConfirmacao("sim");
                  }
                }}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 bg-gray-100 hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-500 hover:text-white text-gray-700"
              >
                Sim, eu vou! 🎉
              </button>

              <button
                onClick={() => {
                  if (nome.trim()) {
                    handleConfirmacao("nao");
                  }
                }}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 bg-gray-100 hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-500 hover:text-white text-gray-700"
              >
                Infelizmente não 😢
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              "Venha celebrar este momento especial conosco!"
            </p>
            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
              Abraço da DS11
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-fall {
          animation: confetti-fall 4s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Convite;
