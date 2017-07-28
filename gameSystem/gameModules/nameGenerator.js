const Math = require('mathjs');

const nameGenerator = function() {

    return {
        getName: function () {
            const symbols = [
                ['a', 'o', 'u', 'i', 'e'],
                ['l', 'n', 'r'],
                ['m', 'b', 'v', 'g', 'd', 'z', 'j'],
                ['p', 'f', 'k', 't', 's', 'h']
            ];

            const nameTemplate = new Array(Math.floor(Math.random() * 6) + 3);

            for(let n = 0; n < nameTemplate.length; n++) {
                nameTemplate[n] = Math.floor(Math.random() * 2);
            }

            for(let i = 1; i < nameTemplate.length; i++) {
                if(nameTemplate[i] === 0) {
                    if(nameTemplate[i - 1] === 0) {
                        nameTemplate.splice(i, 0, 1);
                        i += 1
                    }
                } else {
                    if(nameTemplate[i - 1] === 1 && nameTemplate[i + 1] === 1) {
                        nameTemplate.splice(i, 0, 0);
                        i += 1
                    }
                }
            }

            let prev = 0;

            function generateWithRules() {
                let num = Math.floor(Math.random() * (symbols.length - 1)) + 1;

                if((num === 2 || num === 3) && (prev === 2 || prev === 3)) {
                    return generateWithRules();
                }
                return num
            }

            for(let s = 0; s < nameTemplate.length; s++) {
                if(nameTemplate[s] === 0) {
                    nameTemplate[s] = symbols[0][Math.floor(Math.random() * (symbols[0].length))]
                } else {
                    let symbolsLine = generateWithRules();
                    prev = symbolsLine;
                    let symb = Math.floor(Math.random() * (symbols[symbolsLine].length));
                    nameTemplate[s] = symbols[symbolsLine][symb]
                }
            }

            return nameTemplate.join('').replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            }).replace(/e$|o$|u$/, function (s) {
                switch (s) {
                    case 'e': return 'et';
                    case 'o': return 'os';
                    case 'u': return 'ur'
                }
            });
        },
        getTextID: function () {
            let stringID = '';
            for(let i = 0; i < 10; i++) {
                stringID += parseInt(Math.random(1, 9).toFixed(0)).toString(16)
            }
            return stringID
        }
    }
};

module.exports = nameGenerator;
