<template>
  <section id="landing-page">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h1>Humble Quiz</h1>
          <input
            autofocus
            type="text"
            class="form-control text-center my-3"
            placeholder="Enter Your Name"
          />
          <button class="btn btn-primary">Enter</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "landing"
};
</script>

<style>
#landing-page {
  display: flex;
  align-items: center;
  height: 100vh;
}
</style>