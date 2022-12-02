<template>
  <div class="home">
    <h1>dzadza</h1>
  </div>
</template>

<script setup>
// import HelloWorld from "@/components/HelloWorld.vue";
import { inject } from "vue";

const axios = inject("axios");

axios.get("https://pokeapi.co/api/v2/pokemon/ditto").then((data) => {
  console.log("data :>> ", data);
});
</script>
