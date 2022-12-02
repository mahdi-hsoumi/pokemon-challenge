<template>
  <div @click="seePokemon" class="pokemon-card">
    <img :src="`${pokemon.sprites.front_default}`" alt="" />
    <h3>
      {{ pokemon.name }}
    </h3>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
const $router = useRouter();
const seePokemon = () => {
  $router.push(`/${props.pokemon.name}`);
};
</script>

<style lang="scss" scoped>
.pokemon-card {
  margin: 25px;
  padding: 25px;
  width: 300px;
  height: 250px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 5px;
  cursor: pointer;
  img {
    width: 150px;
  }
  h3 {
    text-transform: capitalize;
    font-size: 25px;
    font-weight: 600;
  }
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}
</style>
