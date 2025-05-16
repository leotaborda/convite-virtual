import { useState, useEffect } from "react";

const Convite = () => {
  const [dias, setDias] = useState(0);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confirmacao, setConfirmacao] = useState(null);
  const [nome, setNome] = useState("");

  useEffect(() => {
    const dataFesta = new Date("June 28, 2025 17:00:00").getTime();

    const intervalo = setInterval(() => {
      const agora = new Date().getTime();
      const diferenca = dataFesta - agora;

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

      if (diferenca < 0) {
        clearInterval(intervalo);
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const Confetti = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 overflow-hidden">
        {Array.from({ length: 150 }).map((_, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-30px`,
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
              backgroundColor: [
                "#FF69B4",
                "#FFD700",
                "#FF6347",
                "#00CED1",
                "#9370DB",
                "#3E42F8",
                "#87CEEB",
              ][Math.floor(Math.random() * 7)],
              borderRadius:
                Math.random() > 0.5
                  ? "50%"
                  : `${Math.floor(Math.random() * 5)}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `fall ${Math.random() * 4 + 3}s linear forwards`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>
    );
  };

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

  useEffect(() => {
    const enviado = localStorage.getItem("presenca_enviada");
    if (enviado) {
      setConfirmacao(enviado);
    }
  }, []);

  const handleConfirmacao = (tipo) => {
    const nomeFormatado = formatarNome(nome);
    if (!nomeFormatado) return;

    if (!localStorage.getItem("presenca_enviada")) {
      setConfirmacao(tipo);
      enviarParaPlanilha(nomeFormatado, tipo);
      localStorage.setItem("presenca_enviada", tipo);
      setNome(nomeFormatado);
      if (tipo === "sim") handleConfetti?.();
    }
  };

  return (
    <div className="relative min-w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans p-6 flex items-center justify-center">
      {showConfetti && <Confetti />}

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
                  <span className="text-black-900 font-semibold text-purple-600">Quando:</span>{" "}
                  28 de junho de 2025
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
                  <span className="text-black-900 font-semibold text-purple-600">
                    Horário:
                  </span>{" "}
                  17h
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
                  <span className="text-black-900 font-semibold text-purple-600">Local:</span>{" "}
                  Condomínio Parque das Flores
                </p>
              </div>

              <p className="text-gray-600 text-sm mt-[-15px]">
                Rua Itaipu, 140 - Residencial Guaíra - Sumare, SP
              </p>
            </div>

            <a
              href="https://www.google.com/maps/place/Condom%C3%ADnio+Parque+Das+Flores/@-22.8063363,-47.2779402,17z/data=!3m1!4b1!4m6!3m5!1s0x94c897e1ae061d1d:0x8bfdc97cbdd437a6!8m2!3d-22.8063363!4d-47.2753653!16s%2Fg%2F11bv30kf2j?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-purple-500 inline-block mt-7 bg-gradient-to-r hover:from-blue-100 hover:to-purple-200 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              📍 Ver no Google Maps
            </a>
          </div>

          <div className="my-8">
            <h3 className="text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 mt-[-10px]">
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
                <div className="text-xs text-gray-600 uppercase tracking-wider">
                  min
                </div>
              </div>
              <div className="text-center p-2">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {segundos}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">
                  seg
                </div>
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
                className="text-black-900 w-full h-12 px-4 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  const jaEnviado = localStorage.getItem("presenca_enviada");
                  if (jaEnviado) return;

                  if (nome.trim()) {
                    const nomeFormatado = formatarNome(nome);
                    setNome(nomeFormatado);
                    setConfirmacao("sim");
                    enviarParaPlanilha(nomeFormatado, "Sim");
                    localStorage.setItem("presenca_enviada", "Sim");
                    handleConfetti();
                  }
                }}
                disabled={!!localStorage.getItem("presenca_enviada")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                  confirmacao === "sim"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "bg-gray-100 hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-500 hover:text-white text-gray-700"
                }`}
              >
                Sim, eu vou! 🎉
              </button>

              <button
                onClick={() => {
                  const jaEnviado = localStorage.getItem("presenca_enviada");
                  if (jaEnviado) return;

                  if (nome.trim()) {
                    const nomeFormatado = formatarNome(nome);
                    setNome(nomeFormatado);
                    setConfirmacao("nao");
                    enviarParaPlanilha(nomeFormatado, "Não");
                    localStorage.setItem("presenca_enviada", "Não");
                  }
                }}
                disabled={!!localStorage.getItem("presenca_enviada")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                  confirmacao === "nao"
                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                    : "bg-gray-100 hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-500 hover:text-white text-gray-700"
                }`}
              >
                Infelizmente não 😢
              </button>
            </div>

            {confirmacao === "sim" && (
              <div className="mt-4 text-center text-green-600 font-medium bg-green-50 p-3 rounded-lg border border-green-200 animate-pulse">
                Eba! {nome}, estamos ansiosos para te ver lá!
              </div>
            )}

            {confirmacao === "nao" && (
              <div className="mt-4 text-center text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                Que pena, {nome}! Você vai fazer falta.
              </div>
            )}
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
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall 4s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Convite;
