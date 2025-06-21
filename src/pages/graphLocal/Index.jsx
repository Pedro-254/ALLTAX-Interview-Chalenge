import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList} from 'recharts';
import './Style.css';

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];

const gerarDadosGrafico = (vendasArray) => {
  return vendasArray.map((valor, index) => ({
    mes: meses[index],
    vendas: valor
  }));
};

function GraphLocal() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [vendas, setVendas] = useState({});

  useEffect(() => {
    fetch('/dados.json')
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data.categorias);
        setVendas(data.vendas);
      });
  }, []);

  const dadosGrafico = marcaSelecionada ? gerarDadosGrafico(vendas[marcaSelecionada]) : [];

  return (
    <div style={{ width: '100%'}}>
      {/* Selects */}
      <div className="Selects">

        <div>
          <p>Categoria: </p>
          <select
            value={categoriaSelecionada}
            onChange={(e) => {
              setCategoriaSelecionada(e.target.value);
              setProdutoSelecionado('');
              setMarcaSelecionada('');
            }}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.nome} value={categoria.nome}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Produto: </p>
          <select
            value={produtoSelecionado}
            onChange={(e) => {
              setProdutoSelecionado(e.target.value);
              setMarcaSelecionada('');
            }}
            disabled={!categoriaSelecionada}
          >
            <option value="">Selecione um produto</option>
            {categorias
              .find((categoria) => categoria.nome === categoriaSelecionada)
              ?.produtos.map((produto) => (
                <option key={produto.nome} value={produto.nome}>
                  {produto.nome}
                </option>
              ))}
          </select>
        </div>

        <div>
          <p>Marca: </p>
          <select
            value={marcaSelecionada}
            onChange={(e) => setMarcaSelecionada(e.target.value)}
            disabled={!produtoSelecionado}
          >
            <option value="">Selecione uma marca</option>
            {categorias
              .find((categoria) => categoria.nome === categoriaSelecionada)
              ?.produtos.find((produto) => produto.nome === produtoSelecionado)
              ?.marcas.map((marca) => (
                <option key={marca} value={marca}>
                  {marca}
                </option>
              ))}
          </select>
        </div>

      </div>

      {/* Título */}
      <h2 style={{ textAlign: 'center' }}>
        {marcaSelecionada ? `Vendas por Mês: ${marcaSelecionada}` : 'Selecione uma marca'}
      </h2>

      {/* Gráfico */}
      <div style={{ width: '100%', height: 500 }}>
        <ResponsiveContainer>
          <LineChart
            data={dadosGrafico}
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid/>
            <XAxis 
              label={{
                value: 'Meses',
                position: 'center',
                dy: 10
              }}
              dataKey="mes"
              padding={{left: 50, right: 50}}
            />
            <YAxis
              label={{
                value: 'Vendas',
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: 20
              }}
            />
            <Line
              dataKey="vendas"
              stroke="#00A8FF"
              strokeWidth={2}
              isAnimationActive={false}
            >
              <LabelList dataKey="vendas" position="top" />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GraphLocal;
