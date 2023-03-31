import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from '../use-cases/render-todo';
import { Todo } from './models/todo.model';


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    // DeleteTodo: '.destroy',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const NewTodoInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    // const todoDeleteTodo = document.querySelector( ElementIDs.DeleteTodo );

    //Listeners
    NewTodoInput.addEventListener('keyup', (event) => {

        if( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    }) 

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute( 'data-id' ) );
        displayTodos();
    })

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if (!element || !isDestroyElement) return;

        todoStore.deleteTodo( element.getAttribute( 'data-id' ) );
        displayTodos();
    })

}