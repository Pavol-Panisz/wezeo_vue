<template>
  <input @keyup.enter="addItem()" v-model="input">
  <button @click="addItem()">add to list</button>
  
  <h2>Položky:</h2>
  <ul>
    <!-- the v-for wouldnt work without the :key thing, dont exactly 
      understand why. Its recommended to use this though whenever 
      possible-->
    <li v-for="item in validList" :key="item.id">
      {{ item.text }} 
      {{ item.id }}
      <span @click="deleteItem(item)" class="delete-btn">X</span>
    </li>
    
  </ul>

  <hr>
  <h2>Zmazané:</h2>
  <ul>
    <li v-for="item in deletedList" :key="item.id">
      <span class="deleted-item">{{ item.text }}</span> {{ item.id }}
    </li>
  </ul>

</template>

<script>
  
  // declaring the todo-list component, which is reusable
  export default {
    name: "todo-list",

    // notice how the data properties are declared as functions - 
    // that makes them reactive.
    // (in comparison, you could instead do the non reactive "data: []" )
    data() {
      return {
        input: "",
        list: [] // {id: 1, text: "ahoj", is_deleted: false}
      }
    },
    // just like data, but you use it whenever you have a variable 
    // whose value depends on another variable
    computed: {
      validList() {
        return this.list.filter(item => !item.is_deleted)
      },
      deletedList() {
        return this.list.filter(item => item.is_deleted)
      }
    },
    methods: {
      addItem() {
        this.list.push({
          id: this.list.length + 1,
          text: this.input,
          is_deleted: false
        })
        this.input = ""
        console.log("added " + this.input)
      },
      deleteItem(item) {
        item.is_deleted = true
        console.log("deleting item " + item.text + " that has id " + item.id)
      }
    }
  }
</script>

<style>
  body {
    margin: 0px;
  }
  .deleted-item {
    text-decoration: line-through;
  }
  .delete-btn {
    margin-left: 15px;
    color: red;
  }
  .delete-btn:hover {
    margin-left: 15px;
    color: black;
    font-weight: bold;
  }

</style>
