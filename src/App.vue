<template>
  <div style="width: 100; margin-top: 100px">
  <div style="margin: auto; width: 300px">
    <input @keyup.enter="addItem()" v-model="input" style="margin-right: 20px" autofocus>
    <button @click="addItem()">Pridať</button>
    
    <hr>

    <h2>Položky:</h2>
    <ul>
      <!-- the v-for wouldnt work without the :key thing, dont exactly 
        understand why. Its recommended to use this though whenever 
        possible-->
      <li v-for="item in validList" :key="`item-${item.id}`" class="undeleted-li">
        <span class="undeleted-text">
          {{ item.text }}
        </span>
        <button @click="deleteItem(item)" class="delete-btn">X</button>
        
      </li>
      
    </ul>
    <hr>
    <h2>Zmazané:</h2>
    <ul>
      <li v-for="item in deletedList" :key="item.id">
        <div class="deleted-item" style="width: 200px; word-wrap: break-word;">
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
      },
      getItem(id) {
        return this.list.filter(item => item.id == id)
      }
    },
    methods: {
      addItem() {
        if (this.input.trim() === "") return;

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
  h2 {
    margin: 0px;
  }
  hr {
    margin: 30px 0px;
  }
  li {
    border-bottom: 1px dotted black;
  }
  .deleted-item {
    text-decoration: line-through;
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
    /* background-color: aqua; */
  }

</style>
