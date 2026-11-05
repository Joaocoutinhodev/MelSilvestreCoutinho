# Mel Silvestre Coutinho 🍯 &bull; Mel Natural & Artesanal em Garrafa de Vidro 1L

Site institucional e e-commerce artesanal de alta conversão da marca **Mel Silvestre Coutinho**, com sede e distribuição em **Vila Velha - ES** e mel silvestre colhido e engarrafado na florada nativa de **Linhares - ES**.

---

## 🌟 Principais Recursos da Versão Atual

1. **Design System Oficial Mel Silvestre Coutinho**:
   - **Paleta de Cores**: Off-White (`#F9F8F6`), Verde Floresta Escuro (`#1A362D`), Dourado Metálico (`#B89454`) e Preto Carvão (`#222222`).
   - **Tipografia Clássica & Editorial**: *Playfair Display* para títulos com traços finos e elegantes combinada com *Montserrat* para leitura moderna e limpa.
   - **Componentes de UI Minimalistas**: Botões com cantos retos (0px border-radius), divisores finos de 1px em dourado e respiro visual amplo (whitespace generoso).
   - **Logotipo Oficial**: Abelha geométrica em traços lineares finos (`img/logo-mel-silvestre-coutinho.jpg`).

2. **Modelo Institucional de Curadoria**:
   - A empresa atua exclusivamente com curadoria e revenda de mel silvestre 100% puro (sem fabricação industrial própria).
   - Sede e distribuição em Vila Velha (ES), com colheita e envase nas matas de Linhares (ES).

3. **Foto Real da Garrafa Mel Silvestre Coutinho & Galeria Focal Autêntica**:
   - Imagem autêntica da garrafa de 1L com tampa de rolha na vitrine principal (`img/garrafa-coutinho.jpg`).
   - Vistas focais interativas (*Garrafa Inteira*, *Tampa de Rolha*, *Tom Âmbar Puro* e *Apresentação*).

4. **Explicação Científica sobre Cristalização & Perenidade**:
   - **Cristalização**: Esclarecimento de que o Mel Silvestre Mel Silvestre Coutinho **praticamente não cristaliza** devido à alta concentração natural de frutose da florada silvestre, mantendo-se límpido e 100% puro.
   - **Por que Vidro de 1L**: Material inerte, zero microplásticos e preservação integral dos nutrientes.
   - **Sem Validade**: Baixíssima umidade (<18%), acidez protetora (pH 3,2 a 4,5) e ação enzimática natural.

5. **Explorador Interativo de Benefícios**:
   - Filtro interativo por categorias: Remédio & Imunidade, Pré-Treino & Energia, Substituto do Açúcar, Gastronomia & Molhos, Ciência & Nutrição.

6. **Logística Transparente & Checkout Direto para WhatsApp**:
   - **Flag de Localização**: Divisão inteligente entre Grande Vitória (sede em Vila Velha) com validação de endereço e Outras Regiões / Brasil com frete cotado diretamente pelo WhatsApp.
   - Mensagens formatadas e limpas, sem menções institucionais obsoletas.

---

## 🚀 Como Executar o Site

1. Dê dois cliques em **`abrir-site.bat`** ou abra o arquivo **`index.html`** no navegador padrão.
2. Para rodar a suíte de testes automatizados:
   ```bash
   node test-suite.js
   ```

---

## ⚙️ Configurações do Vendedor

No arquivo **`script.js`**, os dados da marca estão centralizados no topo:

```javascript
const CONFIG = {
  sellerPhone: "5527999494212", // (27) 99949-4212
  brandName: "Mel Silvestre Coutinho",
  origin: "Vila Velha - Espírito Santo (Florada em Linhares)",
  product: {
    id: "mel-silvestre-1l",
    name: "Mel Silvestre 100% Puro",
    package: "Garrafa de Vidro de 1 Litro (~1,4kg)",
    price: 60.00,
    image: "img/garrafa-coutinho.jpg"
  }
};
```

---

## 📱 Formato da Mensagem Gerada para o WhatsApp

### Exemplo: Cliente da Grande Vitória
```text
🍯 *NOVO PEDIDO - MEL SILVESTRE COUTINHO*
_Mel Silvestre 100% Puro & Cru • Vila Velha - ES_

Olá! Gostaria de fazer meu pedido de Mel Silvestre pelo site da Mel Silvestre Coutinho:

📦 *Produto:* Mel Silvestre 100% Puro
🍶 *Embalagem:* Garrafa de Vidro de 1 Litro (~1,4kg)
🔢 *Quantidade:* 2 garrafa(s) de 1 Litro
💰 *Valor Unitário:* R$ 60,00
💵 *Subtotal dos Produtos:* R$ 120,00

--------------------------------
📍 *Região de Entrega:* Grande Vitória (ES) - Sede Vila Velha
🏙️ *Município:* Vila Velha
🏘️ *Bairro:* Praia da Costa
🏠 *Endereço Completo:* Av. Hugo Musso, 120, Apto 401
🛵 *Entrega Local:* Combinar taxa de entrega e horário com o entregador

--------------------------------
👤 *Nome do Cliente:* Carlos Alberto
💳 *Forma de Pagamento:* Pix

Fico no aguardo para confirmarmos o pedido e o envio. Muito obrigado!
```
