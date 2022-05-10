<template>
  <v-app>
      <div class="d-flex justify-center">
      <h1 id="addTodo">Add ToDo</h1>
    </div>
    <div class="d-flex justify-center">
      <v-col cols="6" style="margin: 0px auto;">
        <v-text-field v-model="newToDo" label="Add Todo" solo></v-text-field>
      </v-col>
    </div>
    <div class="d-flex justify-center">
      <v-btn @click="addToDo()" v-on:keyup.13="addToDo()" color="primary">Add ToDo</v-btn>
    </div>

<!-- uncompleted todos -->
<div class="d-flex justify-center">
  <h1>Unompleted ToDo</h1>
</div>
<div v-for="todo in uncompletedTodos" :key="todo._id">
  <v-card class="mx-auto" color="white" dark max-width="800">
    <v-card-text class="font-weight-bold title blue--text">
    {{ todo.title }}
      <v-list-item id="todo-list-item" class="grow">
        <v-btn @click="updateTodo(todo._id)" class="mx-2" small color="green"> Done </v-btn>
       <v-btn @click="deleteTodo(todo._id)" class="mx-2" small color="red"> Delete </v-btn>
      </v-list-item>
    </v-card-text>
  </v-card>
</div>
<!-- completed todos -->
<div class="d-flex justify-center">
  <h1>Completed ToDo</h1>
</div>
<div v-for="todo in completedTodos" :key="todo._id">
  <v-card class="mx-auto" color="blue" dark max-width="800">
    <v-card-text class="font-weight-bold title white--text">
    {{ todo.title }}
      <v-list-item id="todo-list-item" class="grow">
        <v-btn @click="deleteTodo(todo._id)" class="mx-2" small 
        color="red"> Delete </v-btn>
      </v-list-item>
    </v-card-text>
  </v-card>
</div>
  </v-app>
</template>

<script>
  import axios from 'axios';
  export default{

    data: ()=> ({
      newToDo: "",
      uncompletedTodos : [],
      completedTodos : [],
    }),
    methods: {

      addToDo(){
        axios.post("http://localhost:3000/todo/add",{

          todo: this.newToDo

        })
        .then(response=>{
            this.message = response.data;
            this.created()
            this.newToDo = ""
        });
      },
      created() {
        // fetch uncompleted task
        axios.get("http://localhost:3000/todo/uncompleted")
        .then(response => {
          this.uncompletedTodos = response.data;
        })
        .catch(error => console.log(error));
        // fetch completed task
        axios.get("http://localhost:3000/todo/completed")
        .then(response => {
          this.completedTodos = response.data;

        })
        .catch(error => console.log(error));
      },

      deleteTodo(todoID) {
        axios
        .delete("http://localhost:3000/todo/" + todoID)
        .then(response => {
          console.log(response.data);
          this.created()
        });
      },

      updateTodo(todoID) {
        console.log(todoID)
        axios.put("http://localhost:3000/todo/complete/" + todoID)
        .then(response => {
          console.log(response.data);
          this.created()
        });
      }

    },
    mounted(){
      this.created()
    }

  }
</script>
