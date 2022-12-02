<template>
  <div class="details">
    <div @click="goBack" class="go-back"></div>
    <h1>{{ pokemon.name }}</h1>
    <div class="details-container">
      <div class="characteristics">
        <h3>Base Experience: {{ pokemon.base_experience }}</h3>
        <h3>height: {{ pokemon.height }}</h3>
        <h3>weight: {{ pokemon.weight }}</h3>
        <h3>Abilities</h3>
        <div class="abilities">
          <p
            v-for="({ ability }, index) in pokemon.abilities"
            :key="`ability-${index}`"
          >
            {{ ability.name }}
          </p>
        </div>
      </div>
      <vue-picture-swipe :items="images"></vue-picture-swipe>
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const axios = inject("axios");
const $route = useRoute();
const $router = useRouter();

const pokemon = ref({});
const images = ref([]);

axios
  .get(`https://pokeapi.co/api/v2/pokemon/${$route.params.id}`)
  .then((pokemonDetails) => {
    pokemon.value = pokemonDetails.data;

    for (const property in pokemon.value.sprites) {
      if (typeof pokemon.value.sprites[property] === "string") {
        images.value.push({
          src: pokemon.value.sprites[property],
          thumbnail: pokemon.value.sprites[property],
          w: 600,
          h: 400,
          title: property,
        });
      }
    }
  });

const goBack = () => {
  $router.push(`/`);
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 600;
  text-transform: capitalize;
  text-align: left;
}
.go-back {
  position: absolute;
  top: 10px;
  left: 20px;
  height: 50px;
  width: 50px;
  cursor: pointer;
  background-image: url("https://www.svgrepo.com/show/128399/left-arrow.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.details-container {
  padding: 0 40px;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .characteristics {
    padding-top: 40px;
    text-align: left;
    h3 {
      font-size: 24px;
    }
    .abilities {
      display: flex;
      p {
        display: block;
        color: white;
        background: #485fc7;
        border-radius: 20px;
        margin: 0 5px;
        padding: 5px 10px;
      }
    }
  }
}
</style>
<style lang="scss">
.details {
  width: 90vh;
  max-height: 400px;
  overflow: hidden;
  .my-gallery {
    max-width: 500px;
  }
  figure {
    img {
      width: 150px;
    }
  }
}
</style>
