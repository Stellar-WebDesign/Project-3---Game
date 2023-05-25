const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

// The above code establishes what text and option-buttons apply to.
// The code below makes sure you have no states set When the game is started.

let state = {}

function startgame() {
    state = {}
    showTextNode(1)
}

// This portion covers what a TextNode is and where to find it.

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    
// The questions (in a specific textnode) should be connected to the option buttons.
// Then move on to the next option we provide and make a new button.

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

// For options, apply it to the "btn" class and put the option text in it.
// Base what text is put in the individual option buttons off that textNode's stuff.
// The EventListener is waiting for us to click the buttons and it reacts accordingly.

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

// Below is telling it to go to the next TextNode when an option is selected.
// or to restart the game if the nextText number is lesser than or equal to 0.

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startgame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

// The following is each question and it's options!
// The ID clarifies which question it is, and nextText uses that to know 
// - which question to go to next.

// SetState says if you've done something yet or not, like if you've gotten a drink.

const textNodes = [
    {
        id: 1,
        text: "You've walked into a bar. What do you do?",
        options: [
            {
                text: 'Talk to the lonely man in the corner',
                setState: { talkedtolonelyman: true },
                nextText: 2
            },
            {
                text: "Buy yourself a drink",
                setState: { drunk: true },
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: "The man starts telling you a story.",
        options: [
            {
                text: 'Ignore Him',
                requiredState: (currentState) => currentState.talkedtolonelyman,
                setState: { talkedtolonelyman: true, drunk: false },
                nextText: 7
            },
            {
                text: 'Listen',
                nextText: 5
            },
         ]
    },
    {
        id: 3,
        text: "The bartender offers you today's special. Do you...",
        options: [
            {
                text: 'Order It',
                nextText: 6
            },
            {
                text: 'Decline Offer',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: "The bartender is offended and kicks you out.",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: "You had a mostly one-sided discussion. Apparently, he works in a zoo or something.",
        options: [
            {
                text: 'OK',
                nextText: 8 
            }
        ]
    }, 
    {
        id: 6,
        text: "You order the special. It tastes sour.",
        options: [
            {
                text: 'OK',
                nextText: 8 
            }
        ]
    }, 
    {
        id: 7,
        text: "The lonely man notices that you weren't listening. He gets mad and smashes you over the head with a shot glass.",
        options: [
            {
                text: 'Ouch.',
                nextText: -1 
            }
        ]
    },    
    {
        id: 8,
        text: "CRASH! Suddenly, an elephant crashes through the wall! What do you do?",
        options: [
            {
                    text: 'Save the man!',
                    nextText: 11
            },
            {
                    text: 'Save your drink!',
                    requiredState: (currentState) => currentState.drunk,
                    nextText: 10
            },
            {
                    text: 'Give the elephant a smooch.',
                    nextText: 9
            }
            
        ]
    },
    {
        id: 9,
        text: "Unfortunately, the elephant eats you before you can romance him.",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: "The special drink you ordered gives you super speed! You quickly grab the rest of your drink and run away.",
        options: [
            {
                text: 'You survived! Congratulations.',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: "You jump in front of the lonely man, putting yourself between him and the elephant. The man runs away.",
        options: [
            {
                text: '...',
                nextText: 12
            },
         ]
    },
    {
        id: 12,
        text: "Tell me, did this man know you?",
        options: [
            {
                text: 'Yes',
                requiredState: (currentState) => currentState.talkedtolonelyman,
                nextText: 13
            },
            {
                text: 'No',
                nextText: 14
            },
         ]
    },
    {
        id: 13,
        text: "Just as you're about to be elephant-ed to death, the man returns, holding a whistle in his hand.",
        options: [
            {
                text: 'Take the whistle',
                nextText: 17
            },
            {
                text: 'Not take the whistle.',
                nextText: 18
            }
         ]
    },
    {
        id: 14,
        text: "The elephant swings it's trunk at you. The force of it slams you into the wall.",
        options: [
            {
                text: 'OK',
                nextText: 15
            }
         ]
    },
    {
        id: 15,
        text: "As you lose consciousness, you hear one final sound...",
        options: [
            {
                text: '...',
                nextText: 16
            }
         ]
    },    
    {
        id: 16,
        text: "'BRWHHHEHHHHRHRRRRRR!!!' (the beautiful cry of an elephant.)",
        options: [
            {
                text: 'Aw man! :(',
                nextText: -1
            }
         ]
    },
    {
        id: 17,
        text: "The man looks at you like you just kicked a puppy. He shoves you into the elephant's line of wrath.",
        options: [
            {
                text: '... Why did you think that would be a good idea?',
                nextText: -1
            }
        ]
    },
    {
        id: 18,
        text: "The man smiles at you and blows his whistle.",
        options: [
            {
                text: 'OK',
                nextText: 19
            }
        ]
    },
    {
        id: 19,
        text: "The elephant suddenly stops destroying stuff. The man shoo-es him away like a pet dog.",
        options: [
            {
                text: 'OK',
                nextText: 20
            }
        ]
    },
    {
        id: 20,
        text: "The man explains that he works at the zoo the elephant escaped from.",
        options: [
            {
                text: 'Small world, huh?',
                nextText: 21
            }
        ]
    },
    {
        id: 21,
        text: "Congratulations! You've survived, and made a new friend along the way!",
        options: [
            {
                text: 'Restart?',
                nextText: -1
            }
        ]
    }
]

// Once all this is done, restart the game.

startgame()



/* template 
    {
        id: #
        text: "asdf",
        options: [
            {
                text: 'option1text',
                requiredState: (currentState) => currentState.-,
                setState: { -: true, -: false },
                nextText: #
            },
            {
                text: 'option2text',
                requiredState: (currentState) => currentState.-,
                setState: { -: true },
                nextText: #
            },
            {
                text: 'option3text',
                nextText: #   
            }
        ]
    },
*/