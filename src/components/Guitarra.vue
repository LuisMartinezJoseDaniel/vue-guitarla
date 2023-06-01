<script setup lang="ts">
import { IGuitarra } from "../interfaces/guitarra.interface";

interface Props {
  guitarra: IGuitarra;
}

const { guitarra } = defineProps<Props>();
defineEmits(["agregar-carrito"]); // definir un evento
</script>

<template>
  <div class="col-md-6 col-lg-4 my-4 row align-items-center">
    <div class="col-4">
      <img
        class="img-fluid"
        :src="`/img/${guitarra.imagen}.jpg`"
        :alt="`Imagen de ${guitarra.nombre}`"
      />
    </div>
    <div class="col-8">
      <h3 class="text-black fs-4 fw-bold text-uppercase">
        {{ guitarra.nombre }}
      </h3>

      <p>
        {{ guitarra.descripcion }}
      </p>
      <p class="fw-black text-primary fs-3">${{ guitarra.precio }}</p>
      <!-- al dar click se manda a llamar el evento pasando el id -->
      <button
        type="button"
        class="btn btn-dark w-100"
        @click="$emit('agregar-carrito', guitarra)"
      >
        Agregar al Carrito
      </button>
    </div>
  </div>
  <!-- FIN GUITARRA -->
</template>

<style lang="scss" scoped></style>
