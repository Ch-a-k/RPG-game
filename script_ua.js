let xp = 0
let health = 100
let gold = 50
let currentWeapon = 0
let fighting
let monsterHealth
let inventory = ["кулак"]

const button1 = document.querySelector('#button1')
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterName = document.querySelector("#monsterName")
const monsterHealthText = document.querySelector("#monsterHealth")
const weapons = [
  { name: 'кулак', power: 5 },
  { name: 'кинджал', power: 30 },
  { name: 'молот', power: 50 },
  { name: 'меч', power: 100 }
]
const monsters = [
  {
    name: "Слимак",
    level: 2,
    health: 15
  },
  {
    name: "Кабан",
    level: 8,
    health: 60
  },
  {
    name: "дракон",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Міська площа",
    "button text": ["В магазин", "В печеру", "Атакувати дракона"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Ви на Міській площі в місті Даларан. Ви бачите вивіску 'Магазин'."
  },
  {
    name: "магазин",
    "button text": ["10 здоров'я (10 монет)", "Нова зброя (30 монет)", "На Міську площу"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Ви зайшли в магазин. Що бажаєте купити ?"
  },
  {
    name: "печера",
    "button text": ["Атакувати слимака", "Атакувати кабана", "На міську площу"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Ви заходите в печеру. Ви бачите деяких монстрів."
  },
  {
    name: "атакувати",
    "button text": ["Атакувати", "Ухилятись", "Бігти"],
    "button functions": [attack, dodge, goTown],
    text: "Ви атакуєте монстра."
  },
  {
    name: "Вбив монстра",
    "button text": ["На міську площу", "На міську площу", "На міську площу"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Монстр кричить "АРРР!" поки вмирає. Ви отримуєте очки досвіду та знаходите золото.'
  },
  {
    name: "програш",
    "button text": ["ПОВТОР?", "ПОВТОР?", "ПОВТОР?"],
    "button functions": [restart, restart, restart],
    text: "Ви померли &#x2620;"
  },
  {
    name: "перемога",
    "button text": ["ПОВТОР?", "ПОВТОР?", "ПОВТОР?"],
    "button functions": [restart, restart, restart],
    text: "Ви перемогли дракона! ВИ ПЕРЕМОГЛИ ГРУ! &#x1F389;"
  },
  {
    name: "пасхалка",
    "button text": ["2", "8", "Йти на міську площу?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Ви знайшли пасхалку(секретну гру). Виберіть номер вище. Буде випадковим чином вибрано десять чисел від 0 до 10. Якщо вибране вами число збігається з одним із випадкових чисел, ви виграєте! Якщо ні - втратите 10 здоров'я. Удачі! Москалів - на ножі!"
  }
]


// initialize buttons
button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon

function update(location) {
  monsterStats.style.display = "none"
  button1.innerText = location["button text"][0]
  button2.innerText = location["button text"][1]
  button3.innerText = location["button text"][2]
  button1.onclick = location["button functions"][0]
  button2.onclick = location["button functions"][1]
  button3.onclick = location["button functions"][2]
  text.innerHTML = location.text
}

function goTown() {
  update(locations[0])
}

function goStore() {
  update(locations[1])
}

function goCave() {
  update(locations[2])
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10
    health += 10
    goldText.innerText = gold
    healthText.innerText = health
  } else {
    text.innerText = "У вас недостатньо золота, щоб купити здоров'є."
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30
      currentWeapon++
      goldText.innerText = gold
      let newWeapon = weapons[currentWeapon].name
      text.innerText = "Тепер у вас є " + newWeapon + "."
      inventory.push(newWeapon)
      text.innerText += "У вашому інвентарі є: " + inventory
    } else {
      text.innerText = "У вас недостатньо золота, щоб купити зброю."
    }
  } else {
    text.innerText = "У вас вже є найпотужніша зброя!"
    button2.innerText = "Продати зброю (+15 монет)"
    button2.onclick = sellWeapon
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15
    goldText.innerText = gold
    let currentWeapon = inventory.shift()
    text.innerText = "Ви продали " + currentWeapon + "."
    text.innerText += " У вашому інвентарі є: " + inventory
  } else {
    text.innerText = "Не продавай свою єдину зброю!" + " У вашому інвентарі є: " + inventory
  }
}

function fightSlime() {
  fighting = 0
  goFight()
}

function fightBeast() {
  fighting = 1
  goFight()
}

function fightDragon() {
  fighting = 2
  goFight()
}

function goFight() {
  update(locations[3])
  monsterHealth = monsters[fighting].health
  monsterStats.style.display = "block"
  monsterName.innerText = monsters[fighting].name
  monsterHealthText.innerText = monsterHealth
}

function attack() {
  text.innerText = "  " + monsters[fighting].name + " атакує."
  text.innerText += " Ви атакуєте його своїм " + weapons[currentWeapon].name + "ом" + "."
  health -= getMonsterAttackValue(monsters[fighting].level)
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1
  } else {
    text.innerText += " Ви промахнулись."
  }
  healthText.innerText = health
  monsterHealthText.innerText = monsterHealth
  if (health <= 0) {
    lose()
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame()
    } else {
      defeatMonster()
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Ваш " + inventory.pop() + " зламався."
    currentWeapon--
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp))
  console.log(hit)
  return hit > 0 ? hit : 0
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20
}

function dodge() {
  text.innerText = "Ви ухиляєтесь від атаки " + monsters[fighting].name + "а"
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7)
  xp += monsters[fighting].level
  goldText.innerText = gold
  xpText.innerText = xp
  update(locations[4])
}

function lose() {
  update(locations[5])
}

function winGame() {
  update(locations[6])
}

function restart() {
  xp = 0
  health = 100
  gold = 50
  currentWeapon = 0
  inventory = ["кулак"]
  goldText.innerText = gold
  healthText.innerText = health
  xpText.innerText = xp
  goTown()
}

function easterEgg() {
  update(locations[7])
}

function pickTwo() {
  pick(2)
}

function pickEight() {
  pick(8)
}

function pick(guess) {
  const numbers = []
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11))
  }
  text.innerText = "Ви вибрали " + guess + ". Ось випадкові числа:\n"
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n"
  }
  if (numbers.includes(guess)) {
    text.innerText += "Правильно! Ви виграєте 20 монет!"
    gold += 20
    goldText.innerText = gold
  } else {
    text.innerText += "Неправильно! Ви втрачаєте 10 здоров'я!"
    health -= 10
    healthText.innerText = health
    if (health <= 0) {
      lose()
    }
  }
}


// LANGUAGE Toggle Button
// Функція, що перемикає мову та переадресовує користувача
function switchLanguage() {
  var currentLanguage = localStorage.getItem('language') || 'en'
  var newLanguage = currentLanguage === 'en' ? 'ua' : 'en' // Перемикаємо мову

  localStorage.setItem('language', newLanguage) // Зберігаємо мову в localStorage

  var url = newLanguage === 'en' ? 'index.html' : 'index_ua.html' // Визначаємо URL відповідно до мови
  window.location.href = url // Перенаправляємо користувача
}

// Додаємо обробник події для кнопки
document.getElementById('languageSwitcher').addEventListener('click', switchLanguage)

// Музика Вкл/Викл
var audio = document.getElementById("myAudio")

function toggleMusic() {
  if (audio.paused) {
    audio.play()
  } else {
    audio.pause()
  }
}