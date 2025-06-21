const buttons = [
  ['AC', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['()', '0', '.', '=']
];

const numberSet = new Set(['0','()','1','2','3','4','5','6','7','8','9','AC']);
const display = document.getElementById('display');

function createButtons() {
  const grid = document.getElementById('buttons');
  grid.innerHTML = '';
  buttons.flat().forEach(label => {
    const btn = document.createElement('button');
    btn.className = 'fancy-box';
    if (numberSet.has(label)) btn.classList.add('number');
    btn.textContent = label;
    grid.appendChild(btn);
  });
}

// Calculator logic
function setupCalculatorLogic() {
  let current = '';
  document.querySelectorAll('.fancy-box').forEach(btn => {
    btn.onclick = () => {
      const val = btn.textContent;
      if (val === 'AC') current = '';
      else if (val === '=') {
        try {
          let expr = current.replace(/×/g, '*').replace(/÷/g, '/');
          current = eval(expr).toString();
        } catch { current = 'Error'; }
      }
      else if (val === '±') {
        if (current.startsWith('-')) current = current.slice(1);
        else current = '-' + current;
      }
      else current += val;
      display.textContent = current;
    };
  });
}

// --- Multiple Bouncing Balls Physics ---

const ballCount = 5;
const ballSize = 100;
const speed = 2;

const gradients = [
  'radial-gradient(circle at 30% 30%, #4dc9e6, #210cae)',
  'linear-gradient(45deg, #f3f520, #59d102)',
  'radial-gradient(circle at 30% 30%, #7ef29d, #0f68a9)',
  'linear-gradient(45deg, #fcb0f3, #3d05dd)',
  'radial-gradient(circle at 30% 30%, #ff512f, #dd2476)'
];

const balls = [];

const ballsContainer = document.getElementById('balls-container');
ballsContainer.style.position = 'fixed';
ballsContainer.style.top = '0';
ballsContainer.style.left = '0';
ballsContainer.style.width = '100vw';
ballsContainer.style.height = '100vh';
ballsContainer.style.overflow = 'hidden';
ballsContainer.style.pointerEvents = 'none';
ballsContainer.style.zIndex = '0';

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createBalls() {
  for (let i = 0; i < ballCount; i++) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.background = gradients[i % gradients.length];
    ball.style.position = 'absolute';
    ball.style.width = `${ballSize}px`;
    ball.style.height = `${ballSize}px`;
    ball.style.borderRadius = '50%';

    const x = random(0, window.innerWidth - ballSize);
    const y = random(0, window.innerHeight - ballSize);

    const angle = random(0, 2 * Math.PI);
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    balls.push({ el: ball, x, y, vx, vy });
    ballsContainer.appendChild(ball);
  }
}

function animateBalls() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  balls.forEach(ball => {
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Wall collisions
    if (ball.x <= 0 || ball.x + ballSize >= width) {
      ball.vx = -ball.vx;
      ball.x = Math.max(0, Math.min(ball.x, width - ballSize));
    }

    if (ball.y <= 0 || ball.y + ballSize >= height) {
      ball.vy = -ball.vy;
      ball.y = Math.max(0, Math.min(ball.y, height - ballSize));
    }

    ball.el.style.left = `${ball.x}px`;
    ball.el.style.top = `${ball.y}px`;
  });

  requestAnimationFrame(animateBalls);
}

window.onload = () => {
  createButtons();
  setupCalculatorLogic();
  display.textContent = '';
  createBalls();
  animateBalls();
};
