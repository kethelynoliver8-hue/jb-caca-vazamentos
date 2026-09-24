# JB Caça Vazamentos

Site estático com banner, Serviços, Orçamento, Galeria, Regiões de atendimento, Dúvidas e rodapé. Abra `index.html` no navegador para visualizar.

## Imagens

- Logo original: `assets/logo/jb-caca-vazamentos.png`. Troque este arquivo por outro com o mesmo nome caso a empresa envie uma atualização, preservando fundo transparente e proporções.
- Banner original sem textos: `assets/images/banner.webp`. O fundo cobre toda a página inicial, inclusive a área do cabeçalho. Substitua esse arquivo mantendo o nome e as proporções quando houver uma versão atualizada.
- A ilustração 3D da parede intacta usada em Serviços está em `assets/images/servicos-tubulacao.webp`. Troque esse arquivo pelo mesmo nome se houver atualização.
- Para uma arte vertical no celular, salve-a em `assets/images/banner-mobile.webp` e atualize a segunda imagem em `background-image` e seu enquadramento na regra `.site-shell` dentro de `@media(max-width:760px)` em `styles.css`. Nunca coloque textos ou botões dentro da imagem.


## Contato e conteúdo

- Para trocar o telefone, atualize em `index.html` todos os links fixos `https://wa.me/5548996081492?text=...`: cabeçalho “Atendimento 24h”, hero “Ligar agora” e “Chamar no WhatsApp”, Orçamento “É urgente? Ligar agora”, Serviços, Regiões, FAQ e rodapé. Os botões “Ligar agora” usam exatamente o mesmo link do botão “Chamar no WhatsApp”, inclusive a mensagem: `Olá! Vim através do site, preciso de atendimento.` Atualize também a URL `https://wa.me/5548996081492` montada pelo formulário em `script.js`. O número exibido no rodapé permanece como `tel:+5548996081492`; atualize o link e o texto visível se o telefone mudar. O formato `tel:` inclui `+` e código do país; o formato `wa.me/` usa apenas os dígitos.
- Para evitar cache antigo no GitHub Pages, aumente o número em `styles.css?v=3` e `script.js?v=3` no `<head>` de `index.html` a cada publicação.
- As seções `#servicos`, `#orcamento`, `#galeria`, `#regioes` e `#duvidas` estão implementadas. O rodapé fica após Dúvidas.
- Ao adicionar fotos da galeria, coloque-as em `assets/images/`. Guarde eventuais prints de avaliações no mesmo diretório e inclua avaliações somente quando forem fornecidas e autorizadas.
- Quando houver domínio definitivo, adicione a tag canonical ao `<head>` de `index.html`.

## Publicar no GitHub Pages

1. Extraia o ZIP e envie **o conteúdo** da pasta `jb-caca-vazamentos` para a raiz de um repositório GitHub, mantendo `index.html` na raiz.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**, escolha a branch principal e a pasta **/(root)**; salve.
4. Aguarde o link aparecer em **Settings → Pages**. Todos os caminhos do projeto são relativos e funcionam também em um repositório de projeto.

Não há bibliotecas externas nem etapa de compilação.

## Formulário de orçamento

O formulário valida os campos no navegador e abre uma conversa no WhatsApp com os dados preenchidos. Não armazena nem envia dados a um servidor. A data mínima de agendamento é calculada pelo calendário de `America/Sao_Paulo`, com pelo menos um dia de antecedência.

## Galeria — correspondência das 13 imagens

As fotografias originais foram convertidas para WebP sem cortes nem alterações de conteúdo. Substitua os arquivos correspondentes em `assets/images/` para atualizar a galeria; mantenha os nomes e ajuste as dimensões e os textos alternativos em `index.html` se a nova foto for diferente.

| Nº | Arquivo original | Arquivo no site |
|---:|---|---|
| 1 | `ChatGPT Image 23 de set. de 2026, 17_01_50.png` | `assets/images/galeria-01.webp` |
| 2 | `ChatGPT Image 23 de set. de 2026, 17_04_27.png` | `assets/images/galeria-02.webp` |
| 3 | `ChatGPT Image 23 de set. de 2026, 17_06_34.png` | `assets/images/galeria-03.webp` |
| 4 | `ChatGPT Image 23 de set. de 2026, 17_08_30.png` | `assets/images/galeria-04.webp` |
| 5 | `ChatGPT Image 23 de set. de 2026, 17_09_50.png` | `assets/images/galeria-05.webp` |
| 6 | `ChatGPT Image 23 de set. de 2026, 17_11_21.png` | `assets/images/galeria-06.webp` |
| 7 | `ChatGPT Image 23 de set. de 2026, 17_12_56.png` | `assets/images/galeria-07.webp` |
| 8 | `ChatGPT Image 23 de set. de 2026, 17_14_53.png` | `assets/images/galeria-08.webp` |
| 9 | `ChatGPT Image 23 de set. de 2026, 17_16_33.png` | `assets/images/galeria-09.webp` |
| 10 | `ChatGPT Image 23 de set. de 2026, 17_18_33.png` | `assets/images/galeria-10.webp` |
| 11 | `ChatGPT Image 23 de set. de 2026, 17_24_57.png` | `assets/images/galeria-11.webp` |
| 12 | `ChatGPT Image 23 de set. de 2026, 17_27_17.png` | `assets/images/galeria-12.webp` |
| 13 | `ChatGPT Image 23 de set. de 2026, 17_29_04.png` | `assets/images/galeria-13.webp` |

Os pares corrigidos a partir dos quatro anexos mais recentes são **galeria-05 ANTES (17_09_50(3)) → galeria-06 DEPOIS (17_11_21(3))** e **galeria-08 ANTES (17_14_53(3)) → galeria-07 DEPOIS (17_12_56(3))**. A numeração 1–4 destes anexos é distinta dos números dos arquivos da galeria; o segundo par aparece na ordem 08 → 07 no mosaico e no visualizador. Todas as 13 fotografias seguem exibidas. Os arquivos 05, 06, 07 e 08 foram reconvertidos diretamente dos quatro anexos desta revisão.

## Carrossel

A galeria apresenta onze cartões: nove fotografias individuais e dois pares de antes/depois, cada um em um cartão indivisível. A faixa usa toda a largura disponível; a quantidade visível varia com a largura da tela e a proporção natural das fotos. No celular, um cartão pode aparecer com parte do seguinte visível. Setas, indicadores e gesto de deslizar permitem navegar sem reprodução automática. As treze fotografias continuam presentes.

### Imagens dos cartões

Cada cartão usa `galeria-XX-thumb.webp` (miniatura otimizada, imagem inteira com `object-fit: contain`). Ao abrir o visualizador, o atributo `data-full` carrega a versão `galeria-XX.webp` em resolução maior. Ao substituir uma foto, gere novamente as duas versões e atualize os atributos `width` e `height` da miniatura no HTML. O carrossel navega por rolagem nativa sem reprodução automática; as setas mudam de cartão imediatamente.

### Apresentação fotográfica

Os cartões individuais acompanham a proporção original da foto e têm altura aproximada de 300 px no desktop; não há moldura ou faixas laterais. Os pares permanecem juntos em um cartão mais largo. A navegação calcula a posição real de cada cartão, pois suas larguras variam. Ao trocar imagens por arquivos com outra proporção, atualize as regras `.gallery-carousel .gallery-slide:nth-child(...)` em `styles.css`.

## Dúvidas frequentes

As oito perguntas e respostas estão em `index.html`, na seção `#duvidas`. Cada item usa `<details>` e `<summary>` para permitir abertura e fechamento com mouse, toque e teclado, inclusive sem JavaScript. O link de WhatsApp ao final usa a mesma mensagem dos demais botões de contato.

## Regiões e mapa

A lista de sete cidades está no bloco `#regioes` de `index.html`, em botões `.region-city` com o atributo `data-city`. Para atualizar a área atendida, edite esses botões e, se a cidade principal mudar, atualize também a seleção inicial (`is-selected`, `aria-pressed="true"`), o `src` e o `title` do iframe e o link `#regions-map-link`. `script.js` acrescenta `Santa Catarina, Brasil` ao nome selecionado e troca iframe, link e destaque sem recarregar a página.

O iframe usa a incorporação pública de pesquisa `https://maps.google.com/maps?q=...&output=embed`, sem chave de API, adequada à publicação estática; o link “Abrir no Google Maps” usa a [URL documentada do Google Maps](https://developers.google.com/maps/documentation/urls/get-started). Este iframe **não** usa a Maps Embed API (`/maps/embed/v1/...`), que exige chave do Google Cloud. Caso a incorporação pública deixe de funcionar ou o Google mude esse formato, obtenha os códigos de incorporação de cada cidade em **Google Maps → Compartilhar → Incorporar um mapa**, substitua os endereços em `index.html` e atualize a função `selectRegion` em `script.js` para escolher entre os sete endereços. O link externo permanece disponível para cada seleção.

## Detalhes de fundo

- **Bolhas:** `BUBBLE_COUNTS` em `script.js` controla a quantidade em desktop, tablet e celular. No mesmo bloco, `between(4, 10)` e `between(11, 18)` controlam tamanhos, `between(.08, .35)` a opacidade e `between(14, 28)` a duração em segundos. O CSS está em `DETALHE: BOLHAS DE FUNDO` em `styles.css`.
- **Brilho do formulário:** no bloco `DETALHE: BRILHO ATRÁS DO CARD` em `styles.css`, ajuste `--card-glow` para a cor e o valor `30%` no `radial-gradient` para a intensidade.
- **Grade da Galeria:** no bloco `DETALHE: GRADE BLUEPRINT`, ajuste `--blueprint-line` para a cor, `7%` nos gradientes de `.gallery-section::before` para a opacidade e `--blueprint-cell` para o tamanho da célula.

## Sinal do detector no banner

O SVG `.detector-signal` está dentro de `.detection-effects` em `index.html`, compartilhando o enquadramento `cover` da arte original. Seus atributos `x`, `y`, `width` e `height` no HTML garantem dimensões pequenas mesmo se o CSS não carregar; o CSS permite ajustar `--signal-x` e `--signal-y` nas coordenadas da imagem de 1672 × 941 px, `--signal-size` para o tamanho, `--signal-color` para a cor, `--signal-screen-bg` para o fundo que oculta o ícone original e `--signal-speed` para a duração do ciclo. Em telas de até 760 px, o efeito acompanha a regra já existente que oculta `.detection-effects`.
