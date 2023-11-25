import { useState } from 'react';

function Circulo() {
    const [historico, setHistorico] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [posicao, setPosicao] = useState({ x: null, y: null });
    const [indiceHistorico, setIndiceHistorico] = useState(0);
    const [elementosRemovidos, setElementosRemovidos] = useState([])

    const handleClick = (event) => {
        const { clientX, clientY } = event;

        const novoHistorico = [...historico.slice(0, indiceHistorico + 1), { x: clientX, y: clientY }];
        setHistorico(novoHistorico);
        setIndiceHistorico(novoHistorico.length -1);
        setPosicao({ x: clientX, y: clientY });
    };

    const handleDesfazer = () => {
        if (indiceHistorico > 0) {
            const ultimoRemovido = historico[indiceHistorico];
            setElementosRemovidos([...elementosRemovidos, ultimoRemovido]);

            setIndiceHistorico(indiceHistorico - 1);
            setPosicao(historico[indiceHistorico - 1]);

            historico.pop(length-1)
        }
    };

    const handleRefazer = () => {
        if (indiceHistorico <= historico.length - 1) {
            const ultimoAdicionado = elementosRemovidos[elementosRemovidos.length - 1];
            setHistorico([...historico, ultimoAdicionado]);

            setIndiceHistorico(indiceHistorico + 1);
            setPosicao(historico[indiceHistorico + 1]);

            setElementosRemovidos(elementosRemovidos.slice(0, elementosRemovidos.length - 1));
        }
    };

    return (
        <div>
        <div
            onClick={handleClick}
            style={{ position: 'relative', width: '100vw', height: '95vh', border: '1px solid #000' }}
        >
            {historico.map((p, index) => (
            <div
                key={index}
                style={{
                position: 'absolute',
                left: p.x - 10,
                top: p.y - 10,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'blue',
                }}
            ></div>
            ))}
        </div>
        <button onClick={(e) => { e.preventDefault(); handleDesfazer(); }} disabled={indiceHistorico == 0}>
            Desfazer
        </button>
        <button onClick={(e) => { e.preventDefault(); handleRefazer(); }} disabled={elementosRemovidos <= 0}>
            Refazer
        </button>
        </div>
    );
}

export default Circulo;
