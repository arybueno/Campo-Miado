const tabuleiro = document.getElementById("tabuleiro");
const gatosRestantesEl = document.getElementById("gatos-restantes");
const tempoEl = document.getElementById("tempo");
const btn = document.getElementById("recomecar");
const select = document.getElementById("dificuldade");

let linhas = 8;
let colunas = 8;
let totalGatos = 10;

let grid = [];
let tempo = 0;
let timer = null;
let iniciou = false;
let faltam;
let abrir;

function mudarDificuldade() {
  const val = select.value;
  if (val === "facil") { linhas = 8; colunas = 8; totalGatos = 10; }
  else if (val === "medio") { linhas = 12; colunas = 12; totalGatos = 20; }
  else { linhas = 16; colunas = 16; totalGatos = 40; }
}

function iniciar() {
  mudarDificuldade();
  tabuleiro.style.gridTemplateColumns = `repeat(${colunas}, 40px)`;
  tabuleiro.innerHTML = "";

  grid = [];
  for (let i = 0; i < linhas; i++) {
    let row = [];
    for (let j = 0; j < colunas; j++) {
      row.push({ gato: false, v: 0, aberta: false, flag: false });
    }
    grid.push(row);
  }

  iniciou = false;
  clearInterval(timer);
  tempo = 0;
  tempoEl.textContent = "0s";

  faltam = linhas * colunas - totalGatos;
  abrir = totalGatos;
  gatosRestantesEl.textContent = abrir;

  criarTela();
}

function criarTela() {
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      const c = document.createElement("div");
      c.className = "celula";
      c.dataset.l = i;
      c.dataset.c = j;

      c.onclick = () => clicar(i, j);
      c.oncontextmenu = (e) => {
        e.preventDefault();
        marcar(i, j);
      };

      tabuleiro.appendChild(c);
    }
  }
}

function colocarGatos(pl, pc) {
  let colocados = 0;

  while (colocados < totalGatos) {
    let l = Math.floor(Math.random() * linhas);
    let c = Math.floor(Math.random() * colunas);

    if (grid[l][c].gato) continue;
    if (l === pl && c === pc) continue;

    grid[l][c].gato = true;
    colocados++;
  }

  // contar vizinhos
  for (let l = 0; l < linhas; l++) {
    for (let c = 0; c < colunas; c++) {
      if (grid[l][c].gato) continue;

      let n = 0;
      for (let dl = -1; dl <= 1; dl++) {
        for (let dc = -1; dc <= 1; dc++) {
          let ll = l + dl;
          let cc = c + dc;
          if (ll >= 0 && ll < linhas && cc >= 0 && cc < colunas) {
            if (grid[ll][cc].gato) n++;
          }
        }
      }
      grid[l][c].v = n;
    }
  }
}

function iniciarTempo() {
  iniciou = true;
  timer = setInterval(() => {
    tempo++;
    tempoEl.textContent = tempo + "s";
  }, 1000);
}

function clicar(l, c) {
  if (!iniciou) {
    colocarGatos(l, c);
    iniciarTempo();
  }

  let cel = grid[l][c];
  let el = tabuleiro.children[l * colunas + c];

  if (cel.aberta || cel.flag) return;

  cel.aberta = true;
  el.classList.add("revelada");

  if (cel.gato) {
    el.textContent = "🐱";
    perdeu();
    return;
  }

  faltam--;

  if (cel.v > 0) {
    el.textContent = cel.v;
  } else {
    // abrir em volta
    for (let dl = -1; dl <= 1; dl++) {
      for (let dc = -1; dc <= 1; dc++) {
        let ll = l + dl, cc = c + dc;
        if (ll >= 0 && ll < linhas && cc >= 0 && cc < colunas)
          clicar(ll, cc);
      }
    }
  }

  if (faltam === 0) ganhou();
}

function marcar(l, c) {
  let cel = grid[l][c];
  let el = tabuleiro.children[l * colunas + c];

  if (cel.aberta) return;

  cel.flag = !cel.flag;

  if (cel.flag) {
    el.textContent = "🚩";
    abrir--;
  } else {
    el.textContent = "";
    abrir++;
  }

  gatosRestantesEl.textContent = abrir;
}

function mostrarGatos() {
  for (let l = 0; l < linhas; l++)
    for (let c = 0; c < colunas; c++)
      if (grid[l][c].gato) {
        const el = tabuleiro.children[l * colunas + c];
        el.classList.add("revelada");
        el.textContent = "🐱";
      }
}

function ganhou() {
  clearInterval(timer);
  mostrarGatos();
  alert("Você ganhou! 😸");
}

function perdeu() {
  clearInterval(timer);
  mostrarGatos();
  alert("Você perdeu 😿");
}

btn.onclick = iniciar;
select.onchange = iniciar;

iniciar();
