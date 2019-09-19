<template>
  <section id="home-page">
    <div class="container">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-between align-items-center my-5">
          <h2>Humble Quiz</h2>
          <button class="btn btn-primary">Create Room</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card text-left">
            <div class="card-header d-flex justify-content-between">
              <b>Nama Room</b>
              <b>Game Master</b> 
            </div>
            <div class="card-body">
              <button class="btn btn-sm btn-primary" style="width:100%"> Join </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "home"
};
</script>
