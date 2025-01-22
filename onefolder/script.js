const imagesContainer = document.getElementById('images-container');
const totalImages = 10;

const overlayFileNames = {
    items: [
        { name: "American Soccer.png", rarity: 1 }, { name: "Baseball Ball.png", rarity: 2 },
        { name: "Basketball Ball.png", rarity: 3 }, { name: "Boiling Ball.png", rarity: 4 },
        { name: "Briefcase.png", rarity: 5 }, { name: "Plant.png", rarity: 6 },
        { name: "Suitcase.png", rarity: 7 }, { name: "Tennis ball.png", rarity: 8 }
    ],
    pets: [
        { name: "Brown Rabbit.png", rarity: 1 }, { name: "Brown Snake.png", rarity: 2 },
        { name: "Brown Turtle.png", rarity: 3 }, { name: "Cat.png", rarity: 4 },
        { name: "Chick.png", rarity: 5 }, { name: "Dog.png", rarity: 6 },
        { name: "Ghost.png", rarity: 7 }, { name: "Gray Mouse.png", rarity: 8 },
        { name: "Green Snake.png", rarity: 9 }, { name: "Green turtle.png", rarity: 10 },
        { name: "Pink Butterfly.png", rarity: 11 }, { name: "Robot.png", rarity: 12 },
        { name: "White Duck.png", rarity: 13 }, { name: "White Mouse.png", rarity: 14 },
        { name: "White Rabbit.png", rarity: 15 }, { name: "Yellow Butterfly.png", rarity: 16 },
        { name: "Yellow Duck.png", rarity: 17 }
    ],
    thoughts: [
        { name: "Airpods.png", rarity: 1 }, { name: "Apple.png", rarity: 2 },
        { name: "Bicycle.png", rarity: 3 }, { name: "Blue Skates.png", rarity: 4 },
        { name: "Cake.png", rarity: 5 }, { name: "Camera.png", rarity: 6 },
        { name: "Cheeseburger.png", rarity: 7 }, { name: "Cherries.png", rarity: 8 },
        { name: "Chesse.png", rarity: 9 }, { name: "Chocolate ice cream.png", rarity: 10 },
        { name: "Clock.png", rarity: 11 }, { name: "Coffe.png", rarity: 12 },
        { name: "Desktop.png", rarity: 13 }, { name: "Fan.png", rarity: 14 },
        { name: "Fish.png", rarity: 15 }, { name: "French Fries.png", rarity: 16 },
        { name: "Frozen Rainbow.png", rarity: 17 }, { name: "Gameboy.png", rarity: 18 },
        { name: "Gift.png", rarity: 19 }, { name: "Green Mushroom.png", rarity: 20 },
        { name: "Hard Drive.png", rarity: 21 }, { name: "Heart.png", rarity: 22 },
        { name: "Ipad.png", rarity: 23 }, { name: "Mirror.png", rarity: 24 },
        { name: "Money bag.png", rarity: 25 }, { name: "Moon.png", rarity: 26 },
        { name: "Nintendo Switch Green.png", rarity: 27 }, { name: "Nintendo Switch Yellow.png", rarity: 28 },
        { name: "Nintendo.png", rarity: 29 }, { name: "Old Radio.png", rarity: 30 },
        { name: "Old TV.png", rarity: 31 }, { name: "Orange.png", rarity: 32 },
        { name: "Ovni.png", rarity: 33 }, { name: "Pear.png", rarity: 34 },
        { name: "Pink Skates.png", rarity: 35 }, { name: "Pizza.png", rarity: 36 },
        { name: "Plane.png", rarity: 37 }, { name: "Pokeball.png", rarity: 38 },
        { name: "Ps5.png", rarity: 39 }, { name: "Pumpkin.png", rarity: 40 },
        { name: "Ramen.png", rarity: 41 }, { name: "Red Mushroom.png", rarity: 42 },
        { name: "Skateboard.png", rarity: 43 }, { name: "Soup.png", rarity: 44 },
        { name: "Star.png", rarity: 45 }, { name: "strawberry.png", rarity: 46 },
        { name: "Sword.png", rarity: 47 }, { name: "Tea.png", rarity: 48 },
        { name: "Turntable.png", rarity: 49 }, { name: "Vine.png", rarity: 50 },
        { name: "Walkman.png", rarity: 51 }, { name: "Watermelon.png", rarity: 52 },
        { name: "Xbox X Series.png", rarity: 53 }, { name: "Yellow Mushroom.png", rarity: 54 }
    ]
};

let assignedOverlaysMap = {};

function sanitizeFileName(fileName) {
    return fileName.replace(/#/g, '%23');
}

function getRandomOverlay(overlays) {
    const totalRarity = overlays.reduce((sum, overlay) => sum + overlay.rarity, 0);
    let random = Math.random() * totalRarity;
    for (const overlay of overlays) {
        if (random < overlay.rarity) {
            return overlay.name;
        }
        random -= overlay.rarity;
    }
}

function assignOverlays(index) {
    const assignedOverlays = {};
    Object.keys(overlayFileNames).forEach(category => {
        const overlays = overlayFileNames[category];
        assignedOverlays[category] = getRandomOverlay(overlays);
    });
    assignedOverlaysMap[index] = assignedOverlays;
    return assignedOverlaysMap[index];
}

function regenerateOverlays() {
    assignedOverlaysMap = {};
    localStorage.removeItem('assignedOverlaysMap');
    for (let i = 1; i <= totalImages; i++) {
        assignOverlays(i);
    }
    localStorage.setItem('assignedOverlaysMap', JSON.stringify(assignedOverlaysMap));
    imagesContainer.innerHTML = '';
    for (let i = 1; i <= totalImages; i++) {
        showImage(i);
    }
}

function loadAssignedOverlays() {
    const storedOverlays = localStorage.getItem('assignedOverlaysMap');
    if (storedOverlays) {
        assignedOverlaysMap = JSON.parse(storedOverlays);
    } else {
        regenerateOverlays();
    }
}

function showImage(index) {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'image-container';

    const img = document.createElement('img');
    img.src = `./${index}.png`;
    img.alt = `CrazyHamsters #${index}`;
    imageDiv.appendChild(img);

    const overlayPaths = ['items', 'pets', 'thoughts'];
    const overlayElements = [];

    const assignedOverlays = assignedOverlaysMap[index];

    const effects = ['fall', 'float', 'fire', 'water', 'lightning', 'shake', 'spin', 'pulse', 'bounce', 'flash', 'wobble', 'swing'];
    overlayPaths.forEach((path, i) => {
        const overlay = document.createElement('div');
        overlay.className = `overlay ${effects[i % effects.length]}`;
        const overlayFileName = assignedOverlays[path];
        const overlayUrl = `./${sanitizeFileName(overlayFileName)}`;
        overlay.style.backgroundImage = `url(${overlayUrl})`;
        imageDiv.appendChild(overlay);
        overlayElements.push(overlay);

        overlay.addEventListener('click', () => {
            overlay.style.transform =
                overlay.style.transform === 'scale(1.5)' ? 'scale(1)' : 'scale(1.5)';
        });
    });

    if (overlayElements.length > 0) {
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons-container';
        const buttonColors = ['red', 'green', 'blue'];

        overlayPaths.forEach((path, i) => {
            const button = document.createElement('button');
            button.textContent = path.charAt(0).toUpperCase();
            button.style.backgroundColor = buttonColors[i];
            button.addEventListener('click', () => {
                overlayElements[i].style.display =
                    overlayElements[i].style.display === 'none' ? 'block' : 'none';
            });
            buttonsDiv.appendChild(button);
        });

        imageDiv.appendChild(buttonsDiv);

        imageDiv.addEventListener('click', () => {
            buttonsDiv.style.visibility =
                buttonsDiv.style.visibility === 'hidden' ? 'visible' : 'hidden';
        });
    }

    imagesContainer.appendChild(imageDiv);
}

loadAssignedOverlays();
for (let i = 1; i <= totalImages; i++) {
    showImage(i);
}

function regenerateOverlaysFromConsole() {
    regenerateOverlays();
    console.log('Overlays regenerados y las imágenes recargadas.');
}