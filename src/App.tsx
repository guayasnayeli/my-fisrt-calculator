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

  return (
    <>
      {view === 'home' && (
        <>
          <h1>Menú</h1>
          <button onClick={() => setView('sum')}>Suma</button>
          <button onClick={() => setView('calc')}>Calculadora</button>
        </>
      )}

      {view === 'sum' && <SumaView />}
      {view === 'calc' && <CalcView />}
    </>
  );
}