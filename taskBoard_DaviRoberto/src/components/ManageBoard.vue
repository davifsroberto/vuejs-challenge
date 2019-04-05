<template>

  <div id="manageBoard">

    <div class="text-center mt-5 mb-5">
      <img src="https://talentflux.com/i/logo_black.png">
      <h1>Task Board</h1>
    </div>

    <!-- List Board - Init -->
    <draggable class="d-inline-flex mt-4" ghost-class="ghost" :list="columns" @start="dragging = true" @end="dragging = false">
      <board class="mb-3 d-inline-flex board" v-for="c in columns" :key="c.id" v-bind:board="c" v-on:close="removeColumn"></board>        
    </draggable>
    <!-- List Board - End -->

    <!-- Add Board - Init -->
    <button type="button" title="Adicionar Board" class="btn btn-outline-info btn-add-board" @click="addColumn"><i class="fa fa-plus" aria-hidden="true"></i></button>
    <!-- Add Board - End -->
    
  </div>

</template>

<script>
import Board from './Board.vue'
import draggable from 'vuedraggable'

let id = 1

export default {
  name: 'ManageBoard',
  
  components: {
    'board': Board,
    draggable
  },

  data () {
    return {
      columns: []
    }
  },

  methods: {
    addColumn: function () {
      this.columns.push({
        id: id++,
        title: 'New Column', 
        tasks: []
      })
    },

    removeColumn: function (id) {            
      this.columns = this._.remove(this.columns, function(n) {
        return n.id != id
      })
    }
  },

  mounted() {    
    this.columns = [
      {
        id:0,
        title:'Board Inicial',
        tasks:[]
      }
    ]
  }
  
}
</script>

<style scoped>
.btn-add-board {
  border-radius: 50%;
  font-size: 1.1em;
  height: 2.3em;
  left: 4em;
  top: 10.3em;
  position: fixed;
  float: left;
}
.board {
  width: 21em;
}
</style>
