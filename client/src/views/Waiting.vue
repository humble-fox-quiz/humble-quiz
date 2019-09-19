<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card text-left">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>Nama Room</b>
            <button class="btn btn-danger btn-sm">Delete Room</button>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between">Player 1 <button class="btn btn-sm btn-warning"> Leave Room </button> </li>
              <li class="list-group-item d-flex justify-content-between">Player 2 <button class="btn btn-sm btn-warning"> Leave Room </button> </li>
              <li class="list-group-item d-flex justify-content-between">Player 3 <button class="btn btn-sm btn-warning"> Leave Room </button> </li>
              
            </ul>
            <button class="btn btn-primary my-3" style="width:100%">Start</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>