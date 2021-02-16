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
          }`)
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
            this.list.addNewTask(txtELem.value)
            event.preventDefault()
        })

        formTag.appendChild(txtELem)
        formTag.appendChild(btnElem)

        this.root.appendChild(formTag)

    }

}

// Add a <task-item> CUSTOM element
window.customElements.define(`form-tag`, Form)
