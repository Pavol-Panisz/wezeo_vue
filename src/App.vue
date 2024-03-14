<template>
  <div class="center margin-top-100">
    <div id="main-content">

      <h1 id="heading">Todo List</h1>

      <input @keyup.enter="addItem()" v-model="input" id="input-field" autofocus>
      <button @click="addItem()">Pridať</button>
      
      <hr>

      <h2>Položky:</h2>
      <ul>
        <!-- the v-for wouldnt work without the :key thing, dont exactly 
          understand why. Its recommended to use this though whenever 
          possible-->
        <li v-for="(item, index) in validItems" :key="`${index}`" class="undeleted-li">
          <span class="undeleted-text">
            {{ item.text }}
          </span>
          <button @click="deleteItem(item)" class="delete-btn">X</button>
          
        </li>
        
      </ul>
      <hr>
      <h2>Zmazané:</h2>
      <ul>
        <li v-for="item in deletedItems" :key="item.id">
          <div class="deleted-item">
            {{ item.text }}
          </div>
        </li>
      </ul>

    </div>
  </div>
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
        items: [] // {text: "ahoj", is_deleted: false}
      }
    },
    // just like data, but you use it whenever you have a variable 
    // whose value depends on another variable
    computed: {
      validItems() {
        return this.items.filter(item => !item.is_deleted)
      },
      deletedItems() {
        return this.items.filter(item => item.is_deleted)
      },
    },
    methods: {
      addItem() {
        if (this.input.trim() === "") return;

        this.items.push({
          text: this.input,
          is_deleted: false
        })
        console.log("added " + this.input)
        this.input = ""
      },
      deleteItem(item) {
        item.is_deleted = true
        console.log("deleting item " + item.text)
      }
    }
  }
</script>

<style>
  body, h2 {
    margin: 0px;
  }
  hr {
    margin: 30px 0px;
  }
  li {
    border-bottom: 1px dotted black;
  }

  #main-content {
    width: 300px;
  }
  #heading {
    width: fit-content; 
    margin: auto; 
    margin-bottom: 60px;
  }
  #input-field {
    margin-right: 20px;
  }
  
  .center {
    width: 100%;
  } 
  .center > * {
    margin: auto;
  }
  .margin-top-100 {
    margin-top: 100px;
  }
  .deleted-item {
    text-decoration: line-through;
    width: 200px; 
    word-wrap: break-word;
  }
  .delete-btn {
    border: none;
    background-color: red; 
    padding: 3px 5px;
    margin: 2px;
    border-radius: 3px;
    height: fit-content;
    display: inline-block;
    font-family: Arial, Helvetica, sans-serif;
  }
  .delete-btn:hover {
    color: white;
  }
  .undeleted-text {
    display: inline-block; 
    width: 200px; 
    word-wrap: break-word;
  }
  .undeleted-li {
    display: flex;
    column-gap: 10px;
    width: 100%; 
    height: max-content; 
  }

</style>
