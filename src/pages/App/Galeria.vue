<template>
    <ToolBar titulo="Acerca..." ruta="Inicio" :esApp="true"></ToolBar>
    <!-- Fotos -->
    <Galeria :esAbm="false"></Galeria>
</template>

<script setup>
// Components
import Galeria from '@/components/Galeria.vue';
import ToolBar from '@/components/ToolBar.vue';
</script>