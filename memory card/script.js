
        const emojis = ['🍎', '🍌', '🍒', '🍇', '🍓', '🥝', '🍑', '🍊'];
        let cards = [];
        let flipped = [];
        let matched = [];
        let moves = 0;
        let canFlip = true;

        function initGame() {
            const gameBoard = document.getElementById('gameBoard');
            gameBoard.innerHTML = '';
            
            cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
            
            cards.forEach((emoji, index) => {
                const card = document.createElement('button');
                card.className = 'card';
                card.textContent = '?';
                card.dataset.emoji = emoji;
                card.dataset.index = index;
                card.addEventListener('click', () => flipCard(card));
                gameBoard.appendChild(card);
            });
        }

        function flipCard(card) {
            if (!canFlip || flipped.length === 2 || flipped.includes(card) || card.classList.contains('matched')) {
                return;
            }

            card.classList.add('flipped');
            card.textContent = card.dataset.emoji;
            flipped.push(card);

            if (flipped.length === 2) {
                canFlip = false;
                moves++;
                document.getElementById('moves').textContent = moves;

                setTimeout(() => {
                    checkMatch();
                }, 800);
            }
        }

        function checkMatch() {
            const [card1, card2] = flipped;

            if (card1.dataset.emoji === card2.dataset.emoji) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matched.push(card1.dataset.index);
                matched.push(card2.dataset.index);
                flipped = [];
                canFlip = true;

                document.getElementById('matched').textContent = `${matched.length / 2}/8`;

                if (matched.length === cards.length) {
                    winGame();
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
                flipped = [];
                canFlip = true;
            }
        }

        function winGame() {
            canFlip = false;
            document.getElementById('finalMoves').textContent = moves;
            document.getElementById('winMessage').classList.add('show');
        }

        function resetGame() {
            flipped = [];
            matched = [];
            moves = 0;
            canFlip = true;
            document.getElementById('moves').textContent = '0';
            document.getElementById('matched').textContent = '0/8';
            document.getElementById('winMessage').classList.remove('show');
            initGame();
        }

        function resetStats() {
            moves = 0;
            document.getElementById('moves').textContent = '0';
            document.getElementById('winMessage').classList.remove('show');
        }

        initGame();
    