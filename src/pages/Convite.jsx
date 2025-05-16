import { useState, useEffect } from 'react';

const ConviteMelhorado = () => {
  const [dias, setDias] = useState(0);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confirmacao, setConfirmacao] = useState(null);

  useEffect(() => {
    const dataFesta = new Date('June 28, 2025 17:00:00').getTime();
    
    const intervalo = setInterval(() => {
      const agora = new Date().getTime();
      const diferenca = dataFesta - agora;
      
      const d = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const h = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const Confetti = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: ['#FF69B4', '#FFD700', '#FF6347', '#00CED1', '#9370DB'][
                Math.floor(Math.random() * 5)
              ],
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-w-screen bg-gradient-to-b from-blue-100 to-purple-100 font-sans p-6">
      {showConfetti && <Confetti />}
      
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 text-white">
          <h1 className="font-bold text-center">Convite Especial!</h1>
        </div>
        
        <div className="relative">
          <div className="h-48 bg-blue-100 flex items-center justify-center overflow-hidden">
            <div className="text-center relative z-10">
              <div className="text-5xl font-bold text-blue-800">Rodízio de Pizza</div>
              <div className="text-3xl font-semibold text-blue-900">Digital Solutions 11</div>
            </div>
            
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute text-3xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 45}deg)`
                  }}
                >
                  🍕
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6 text-center">
            <p className="text-lg mb-1"><span className="font-semibold text-purple-600">Quando:</span> 28 de junho de 2025</p>
            <p className="text-lg mb-1"><span className="font-semibold text-purple-600">Horário:</span> 17h</p>
            <p className="text-lg mb-4"><span className="font-semibold text-purple-600">Local:</span> Condomínio Parque das Flores - Rua Itaipu, 140 - Residencial Guaíra - Sumare, SP</p>
            
            <a 
              href="https://www.google.com/maps/place/Condom%C3%ADnio+Parque+Das+Flores/@-22.8063363,-47.2779402,17z/data=!3m1!4b1!4m6!3m5!1s0x94c897e1ae061d1d:0x8bfdc97cbdd437a6!8m2!3d-22.8063363!4d-47.2753653!16s%2Fg%2F11bv30kf2j?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block border-2 border-purple-500 hover:bg-purple-100 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              📍 Ver no Google Maps
            </a>
          </div>
          
          <div className="my-6 p-4 bg-blue-50 border-2 border-purple-500 rounded-lg">
            <h3 className="text-center text-lg font-semibold text-purple-600 mb-2">Contagem regressiva</h3>
            <div className="flex justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{dias}</div>
                <div className="text-xs text-gray-600">dias</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{horas}</div>
                <div className="text-xs text-gray-600">horas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{minutos}</div>
                <div className="text-xs text-gray-600">min</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{segundos}</div>
                <div className="text-xs text-gray-600">seg</div>
              </div>
            </div>
          </div>
          
          <div className="my-6">
            <h3 className="text-center text-lg font-semibold text-purple-600 mb-4">Confirme sua presença</h3>
            <input type="text" className='h48 border-2 border-purple-500 rounded-lg'/>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => {
                  setConfirmacao('sim');
                  handleConfetti();
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  confirmacao === 'sim' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 hover:bg-green-100 text-gray-700'
                }`}
              >
                Sim, eu vou! 🎉
              </button>
              
              <button 
                onClick={() => setConfirmacao('nao')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  confirmacao === 'nao' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 hover:bg-red-100 text-gray-700'
                }`}
              >
                Infelizmente não 😢
              </button>
            </div>
            
            {confirmacao === 'sim' && (
              <div className="mt-4 text-center text-green-600 font-medium">
                Eba! Estamos ansiosos para te ver lá!
              </div>
            )}
            
            {confirmacao === 'nao' && (
              <div className="mt-4 text-center text-red-600 font-medium">
                Que pena! Você vai fazer falta.
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">"Venha celebrar este momento especial conosco!"</p>
            <p className="text-lg font-script text-purple-600 mt-1">Abraço da DS11</p>
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
          animation: fall 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default ConviteMelhorado;