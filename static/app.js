class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'), // Fixed selectors
            chatBox: document.querySelector('.chatbox__support'), // Fixed selectors
            sendButton: document.querySelector('.send__button'), // Fixed selectors
        };

        this.state = false;
        this.message = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;
        openButton.addEventListener('click', () => this.toggleState(chatBox)); // Fixed event type
        sendButton.addEventListener('click', () => this.onSendButton(chatBox)); // Fixed event type

        const node = chatBox.querySelector('input');
        node.addEventListener('keyup', ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatBox) {
        this.state = !this.state;

        // Show or hide the box
        if (this.state) {
            chatBox.classList.add('chatbox--active'); // Fixed variable name
        } else {
            chatBox.classList.remove('chatbox--active'); // Fixed variable name
        }
    }

    onSendButton(chatBox) {
        let textField = chatBox.querySelector('input'); // Fixed variable name
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.message.push(msg1);

        // Replace with your actual API endpoint
        fetch('/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            let msg2 = { name: "Sam", message: data.answer };
            this.message.push(msg2);
            this.updateChatText(chatBox);
            textField.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle the error here, e.g., display an error message to the user
            this.updateChatText(chatBox);
            textField.value = '';
        });
    }

    updateChatText(chatBox) {
        var html = '';
        this.message.slice().reverse().forEach(function (item, index) { // Fixed slice method
            if (item.name == "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatMessage = chatBox.querySelector('.chatbox__messages'); // Fixed variable name
        chatMessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
