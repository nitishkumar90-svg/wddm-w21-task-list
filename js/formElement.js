import TaskList from './TaskList.js'

// Define the form class for the <form-tag> Element
export default class Form extends HTMLElement {

    constructor(todoList) {
        super()

        this.root = this.attachShadow({ mode: `open` })

        const eleStyle = document.createElement(`style`)
        const txtStyle = document.createTextNode(`
          ul {
            padding-left: 0;
            list-style: none;
          }
          
          input {
              height: 2em;
              width: 10em;
              border-radius: 0.5em;
              outline:none;
          }

          button {
            height: 2.4em;
            border-radius: 0.5em;
            width: 5em;
            margin-left: 1em;
            outline:none;
          }

          .error {
            border: 0.1em solid red;
            animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            perspective: 1000px;
          }

          @keyframes shake {
            10%, 90% {
              transform: translate3d(-1px, 0, 0);
            }
            
            20%, 80% {
              transform: translate3d(2px, 0, 0);
            }
          
            30%, 50%, 70% {
              transform: translate3d(-4px, 0, 0);
            }
          
            40%, 60% {
              transform: translate3d(4px, 0, 0);
            }
          }
          `)
        eleStyle.appendChild(txtStyle)
        this.root.appendChild(eleStyle)


        this.list = new TaskList(todoList)

        const formTag = document.createElement(`form`)
        formTag.setAttribute(`name`, `newtask`)

        const txtELem = document.createElement(`input`)
        txtELem.setAttribute(`name`, `taskname`)
        txtELem.setAttribute(`type`, `text`)

        const btnElem = document.createElement(`button`)
        btnElem.setAttribute(`type`, `submit`)
        btnElem.innerText = `Add`
        btnElem.addEventListener('click', event => {
            txtELem.classList.remove(`error`)
            if (txtELem.value.trim() === ``)
                txtELem.classList.add(`error`)
            else {
                this.list.addNewTask(txtELem.value)
                this.list.refreshList()
            }
            event.preventDefault()
        })

        formTag.appendChild(txtELem)
        formTag.appendChild(btnElem)

        this.root.appendChild(formTag)

    }

}

// Add a <task-item> CUSTOM element
window.customElements.define(`form-tag`, Form)
