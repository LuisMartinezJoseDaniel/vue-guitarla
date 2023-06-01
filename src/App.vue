<!--  setup -> utiliza composition API-->
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

import { db } from "./data/guitarras";
import { IGuitarra, ICarrito } from "./interfaces/guitarra.interface";

import Guitarra from "./components/Guitarra.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const guitarras = ref<IGuitarra[]>([]);
const carrito = ref<ICarrito[]>([]);
const guitarra = ref<IGuitarra>();

const agregarCarrito = (guitarra: IGuitarra) => {
  const productoExiste = carrito.value.findIndex(
    (producto) => producto.id === guitarra.id
  );
  if (productoExiste >= 0) {
    carrito.value[productoExiste].cantidad++;
  } else {
    const item: ICarrito = { ...guitarra, cantidad: 1 };
    carrito.value.push(item);
  }
};

const decrementarCantidad = (id: number) => {
  const productoEnCarrito = carrito.value.findIndex(
    (producto) => producto.id === id
  );
  if (carrito.value[productoEnCarrito].cantidad <= 1) {
    carrito.value.splice(productoEnCarrito, 1); // si la cantidad es menor o igual a 0 removerlo del carrito
  } else {
    carrito.value[productoEnCarrito].cantidad--;
  }
};

const incrementarCantidad = (id: number) => {
  const productoEnCarrito = carrito.value.findIndex(
    (producto) => producto.id === id
  );
  carrito.value[productoEnCarrito].cantidad++;
};

const eliminarDelCarrito = (id: number) => {
  carrito.value = carrito.value.filter((producto) => producto.id !== id);
};

const vaciarCarrito = () => {
  const isConfirmed = confirm(
    "¿Estas seguro de que quieres vaciar el carrito?"
  );
  if (!isConfirmed) return;

  carrito.value = [];
};

const guardarLocalStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito.value));
};

watch(carrito, () => guardarLocalStorage(), {
  deep: true, // revisar cuando los atributos cambia
});

onMounted(() => {
  guitarras.value = db;
  guitarra.value = db[3]; // Guitarra del Header
  carrito.value = localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito")!)
    : [];
});
</script>

<template>
  <Header
    :carrito="carrito"
    :guitarra="guitarra"
    @incrementar-cantidad="incrementarCantidad"
    @decrementar-cantidad="decrementarCantidad"
    @eliminar-del-carrito="eliminarDelCarrito"
    @agregar-carrito="agregarCarrito"
    @vaciar-carrito="vaciarCarrito"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>

    <div class="row mt-5">
      <!-- @agregar-carrito ->  component event -->
      <Guitarra
        v-for="guitarra in guitarras"
        :key="guitarra.id"
        :guitarra="guitarra"
        @agregar-carrito="agregarCarrito"
      />
    </div>
  </main>

  <Footer />
</template>
