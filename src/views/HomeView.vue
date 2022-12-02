<template>
  <div class="list">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
    ></PokemonCard>
    <div class="pagination-container">
      <pagination
        v-model="page"
        :records="records"
        :per-page="perPage"
        @paginate="getPokemons"
        :options="options"
      />
    </div>
  </div>
</template>

<script setup>
import PokemonCard from "@/components/PokemonCard.vue";
import { inject, ref } from "vue";

const axios = inject("axios");
const pokemons = ref([]);
const page = ref(1);
const perPage = ref(25);
const records = ref(0);
const options = { theme: "bulma" };

const getPokemons = () => {
  pokemons.value = [];
  axios
    .get(
      `https://pokeapi.co/api/v2/pokemon?limit=${perPage.value}&offset=${
        (page.value - 1) * perPage.value
      }`
    )
    .then(({ data }) => {
      records.value = data.count;
      console.log("data.results :>> ", data.results);
      data.results.forEach((element) => {
        axios.get(element.url).then((pokemonDetails) => {
          pokemons.value.push(pokemonDetails.data);
        });
      });
    });
};
getPokemons();
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 50px 0;
}
</style>
<style>
.VuePagination__count.VuePagination__count {
  display: none;
}
</style>
