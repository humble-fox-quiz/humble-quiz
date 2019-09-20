<template>
  <div class="card">
      <div class="card-body">
          <h5 class="card-title">{{question.index}}</h5>
          <p class="card-text">{{question.content}}</p>
      </div>
  <div class="card-footer">
    <div class="row mb-4">
        <div v-for="(choice,index) in question.choices" :key="index" :choice="choice"  class="col-3">
          <button class="btn btn-primary" @click="answer=choice">{{choice}}</button>
        </div>
    </div>
      
</div>    
      
  </div>
</template>

<script>
export default {
    props : {
        question : Object
    },
    data(){
        return {
            answer : ""
        }
    },
    methods : {
        
    }

}
</script>

<style>

</style>
