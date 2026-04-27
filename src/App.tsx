import { useState } from 'react';

export default function App() {
  const [view, setView] = useState('home');

  // ============================
  // SUMA
  // ============================
  const SumaView = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');

    const calcular = () => {
      alert('Resultado: ' + (Number(a) + Number(b)));
    };

    return (
      <>
        <h2>Suma</h2>

        <input value={a} onChange={(e) => setA(e.target.value)} />
        <br />
        <input value={b} onChange={(e) => setB(e.target.value)} />

        <br />
        <button onClick={calcular}>Sumar</button>

        <hr />
        <button onClick={() => setView('home')}>Volver</button>
      </>
    );
  };

  // ============================
  // CALCULADORA
  // ============================
  const CalcView = () => {
    const [screen, setScreen] = useState('');

    const add = (v) => setScreen((prev) => prev + v);
    const clear = () => setScreen('');
    const del = () => setScreen((prev) => prev.slice(0, -1));

    // FUNCIÓN CLAVE 
    const calcular = () => {
      try {
        // separa números y operadores
        const parts = screen.split(/([+\-*/])/);

        let result = Number(parts[0]);

        for (let i = 1; i < parts.length; i += 2) {
          const op = parts[i];
          const num = Number(parts[i + 1]);

          if (op === '+') result += num;
          else if (op === '-') result -= num;
          else if (op === '*') result *= num;
          else if (op === '/') result /= num;
        }

        setScreen(result.toString());
      } catch {
        setScreen('Error');
      }
    };

    return (
      <>
        <h2>Calculadora</h2>

        <div style={{ width: 230 }}>
          <input
            value={screen}
            readOnly
            style={{ width: '100%', textAlign: 'right', marginBottom: 10 }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
            <button onClick={clear} style={{ gridColumn: 'span 2' }}>AC</button>
            <button onClick={del}>DEL</button>
            <button onClick={() => add('/')}>/</button>

            {[7,8,9].map(n => <button key={n} onClick={() => add(n)}>{n}</button>)}
            <button onClick={() => add('*')}>*</button>

            {[4,5,6].map(n => <button key={n} onClick={() => add(n)}>{n}</button>)}
            <button onClick={() => add('-')}>-</button>

            {[1,2,3].map(n => <button key={n} onClick={() => add(n)}>{n}</button>)}
            <button onClick={() => add('+')}>+</button>

            <button onClick={() => add(0)} style={{ gridColumn: 'span 2' }}>0</button>
            <button onClick={() => add('.')}>.</button>
            <button onClick={calcular}>=</button>
          </div>
        </div>

        <hr />
        <button onClick={() => setView('home')}>Volver</button>
      </>
    );
  };

  // VISTA 3: BUSCADOR API (NUEVA PANTALLA)
  // ==========================================
  const VistaAPI = () => {
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(false);

    // FUNCIÓN PARA BUSCAR EN DISNEY
    const buscarDatos = async () => {
      if (!busqueda) return;
      setCargando(true);
      try {
        const respuesta = await fetch(`https://api.disneyapi.dev/character?name=${busqueda}`);
        const datos = await respuesta.json();
        
        if (datos.data) {
          // Disney puede devolver un objeto o un array, lo normalizamos
          const listaDisney = Array.isArray(datos.data) ? datos.data : [datos.data];
          setResultados(listaDisney.slice(0, 4)); // Tomamos los primeros 4
        } else {
          setResultados([]); 
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setCargando(false);
      }
    };

    // VISTA DE DETALLE (Cuando haces clic en una tarjeta)
    if (itemSeleccionado) {
      return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '15px', textAlign: 'center', backgroundColor: '#fff' }}>
          <h2>{itemSeleccionado.name}</h2>
          <img 
            src={itemSeleccionado.imageUrl} 
            alt={itemSeleccionado.name} 
            style={{ width: '250px', borderRadius: '10px', marginBottom: '20px' }} 
          />
          <div style={{ textAlign: 'left', padding: '0 20px' }}>
            <p><strong>Películas:</strong> {itemSeleccionado.films?.length > 0 ? itemSeleccionado.films.slice(0,3).join(", ") : "No disponible"}</p>
            <p><strong>Series:</strong> {itemSeleccionado.tvShows?.length > 0 ? itemSeleccionado.tvShows.slice(0,3).join(", ") : "No disponible"}</p>
          </div>
          <button onClick={() => setItemSeleccionado(null)} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
            Volver a resultados
          </button>
        </div>
      );
    }

    // PANTALLA PRINCIPAL DEL BUSCADOR
    return (
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Buscador Disney API</h2>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center' }}>
          <input 
            type="text" 
            placeholder="Ej: Mickey Mouse, Elsa..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ width: '300px', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button onClick={buscarDatos} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
            Buscar
          </button>
        </div>

        {cargando && <p style={{ textAlign: 'center' }}>Buscando personajes de Disney...</p>}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '15px' 
        }}>
          {resultados.map((personaje) => (
            <div key={personaje._id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px', 
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={personaje.imageUrl} 
                alt={personaje.name} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} 
              />
              
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{personaje.name}</h3>
                {/* Disney no tiene 'species', mostramos su primera película como referencia */}
                <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#777' }}>
                  {personaje.films?.length > 0 ? personaje.films[0] : "Personaje Disney"}
                </p>
                
                <button 
                  onClick={() => setItemSeleccionado(personaje)}
                  style={{ 
                    marginTop: 'auto', 
                    padding: '8px', 
                    fontSize: '12px', 
                    cursor: 'pointer',
                    width: '100%',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd'
                  }}
                >
                  Ver Información
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <hr />
          <button onClick={() => setView('home')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
            ⬅ Volver al Menú Principal
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {view === 'home' && (
        <>
          <h1>Menú</h1>
          <button onClick={() => setView('sum')}>Suma</button>
          <button onClick={() => setView('calc')}>Calculadora</button>
          <button onClick={() => setView('api')}>API</button>
        </>
      )}

      {view === 'sum' && <SumaView />}
      {view === 'calc' && <CalcView />}
      {view === 'api' && <VistaAPI />}
    </>
  );
}