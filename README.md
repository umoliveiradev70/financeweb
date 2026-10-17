# FinanceWEB

Site de Finanças para estudo.

Portal financeiro em português com temas off-white e preto/azul-marinho, cotações, histórico de moedas, conversor BRL/USD/EUR/GBP, bolsas do Brasil/EUA/Europa, notícias, agenda econômica e favoritos locais.

## Executar

Node.js 20 ou posterior, sem instalação de dependências:

```sh
npm start
# http://127.0.0.1:4173
npm test
npm run check
```

O conteúdo de `dist/` é estático e pode ser servido em qualquer hospedagem HTTPS.

## Dados

- AwesomeAPI: câmbio e histórico diário. Consultas de câmbio a cada 60 segundos quando a aba está visível; sem chave, sujeitas a cache/limites do fornecedor. Horários das cotações são exibidos em Brasília. Histórico carregado por moeda e período, com cache na sessão.
- Frankfurter v2: referência diária alternativa quando AwesomeAPI falha; explicitamente identificada, sem variação intradiária.
- TradingView: painéis incorporados de mercados, notícias e agenda; preserva atribuição. Dados e disponibilidade dependem do fornecedor e das licenças de cada mercado. CFDs são identificados. Há fallback para a fonte e opção de tentar novamente quando o script não carrega.
- Nenhuma cotação é inventada. Falhas mostram indisponibilidade ou mantêm a última cotação com horário e aviso.
- Conversão indicativa usando bid e taxas cruzadas, sem IOF, spread ou tarifas.
- Não é um feed de negociação com garantia de latência. Uso profissional em tempo real exige contratação/licenciamento dos dados pertinentes.

Tema e favoritos são armazenados em localStorage. Não há autenticação, cadastro, banco de dados nem execução de ordens. Serviços externos recebem conexões do navegador. Fontes e limitações estão acessíveis pela interface.

## Estrutura

- `dist/index.html`: estrutura semântica e interface.
- `dist/styles.css`: temas e responsividade.
- `dist/app.js`: fontes, widgets e interações.
- `dist/finance.js`: parsing monetário, conversão e normalização.
- `tests/finance.test.mjs`: casos de valores monetários e dados incorretos.
- `server.mjs`: prévia HTTP local, restrita a `dist/`.
