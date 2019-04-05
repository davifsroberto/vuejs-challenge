<template>

  <div id="Board">

    <b-col>
      <b-card class="board-card">
        
        <!-- Head Task - Init -->
        <input type="text" class="border-0 font-weight-bold" :maxlength="20" v-bind:value="board.title">

        <b-button class="position-absolute btn-close" size="sm" v-on:click="$emit('close', board.id)"><i class="fa fa-times" aria-hidden="true"></i></b-button>            
        <hr>
        <!-- Head Task - End -->


        <!-- Insert Task - Init -->
        <b-form inline class="mt-4" v-on:submit.prevent>          
          <b-input class="mb-2 mr-sm-2 mb-sm-0" placeholder="Tarefa" v-model="task" :maxlength="17" @keyup.enter.native="add"></b-input>
        
          <b-button variant="primary" :disabled="task.length < 1" @click="add">Go!</b-button>
        </b-form>
        <!-- Insert Task - End -->


        <!-- Btns Actions - Init -->
        <section class="mt-3 mb-3">
          <b-button :disabled="this.board.tasks.length == 0" size="sm" @click="sort('asc')">
            <i class="fa fa-chevron-up" aria-hidden="true"></i>            
          </b-button>

          <b-button :disabled="this.board.tasks.length == 0" size="sm" @click="sort('desc')">          
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
          </b-button>
          
          <b-button class="position-absolute btn-danger btn-close" size="sm" :disabled="this.board.tasks.length == 0" @click="removeAll">          
            <i class="fa fa-times" aria-hidden="true">&nbsp;Deletar Todos</i>
          </b-button>
        </section>
        <!-- Btns Actions - End -->


        <!-- List Tasks - Init -->
        <draggable class="list-group mt-1 mb-1" ghost-class="ghost" :group="{name: 'task'}" :list="board.tasks" @start="dragging = true" @end="dragging = false">
          <div class="list-group-item" v-for="(task, id) in board.tasks" :key="task.id">
            {{ `#${task.id}: ${task.name}` }}    

            <!-- Remove Task - Init -->
            <b-button class="position-absolute btn-danger btn-close" size="sm" @click="remove(id)">          
              <i class="fa fa-times-circle" aria-hidden="true"></i>
            </b-button>       
            <!-- Remove Task - End -->

          </div>
        </draggable>
        <!-- List Tasks - End -->

      </b-card>
    </b-col>

  </div>

</template>

<script>
import draggable from 'vuedraggable'

let id = 1;

export default {
  name: 'Board',

  components: {
    draggable
  },

  props: [
    'board'
  ],

   data() {
    return {
      task: ''
    }
  },
  
  methods: {
    add: function() {      
      this.board.tasks.push({ name: this.task, id: id++ })
    },

    remove: function(id) {   
      this.board.tasks.splice(id, 1)
    },

    removeAll: function() {      
      this.board.tasks = []
    },

    sort(direction) {
      this.board.tasks = _.orderBy(this.board.tasks, [t => t.name], [direction])
    },    
    
  }

}
</script>

<style scoped>
.btn-close{
  right: 1.5em;
}
.Board-card{
  max-width: 22rem;
}
</style>

