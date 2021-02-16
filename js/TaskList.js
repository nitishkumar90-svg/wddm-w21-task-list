import TaskItem from './TaskItem.js'

/*
const loadTaskView = ({id, complete, task}) => {
  return `<task-item data-id="${id}" data-complete="${complete}" data-task="${task}"></task-item>`
}

// A function that will build an entire list based on an Array of data
export const renderList = (taskAr) => {
  //document.getElementById(`tasks`).innerHTML = taskAr.map(loadTaskView).join('\n')
}
 */

export default class TaskList extends HTMLElement {

  list = null

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

    // Build an empty list
    this.list = document.createElement(`ul`)

    /*    // Add all of the <task-item> elements to the empty list
        const loadTaskView = ({id, complete, task}) => {
          return `<task-item data-id="${id}" data-complete="${complete}" data-task="${task}"></task-item>`
        }
        eleList.innerHTML = todoList.map(loadTaskView).join(`\n`)
    */
    todoList.forEach((item) => {
      const aTask = new TaskItem(item)
      aTask.addEventListener('taskChanged', event => { console.log('Task Complete?', aTask.complete) })
      this.list.appendChild(aTask)
    })

    this.root.appendChild(this.list)

  }

  addNewTask(name, insertOnTop) {
    // Figure out what the next available id is
    const aTask = new TaskItem({ id: 4, task: name, complete: false })
    aTask.addEventListener('taskChanged', event => { console.log('Task Complete?', aTask.complete) })
    if (!insertOnTop)
      this.list.appendChild(aTask)
    else
      this.list.insertBefore(aTask, this.list.childNodes[0]);
  }

  refreshList() {    
    debugger
    this.root.appendChild(this.list)
  }

}

window.customElements.define(`task-list`, TaskList)
