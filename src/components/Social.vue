<template>
    <v-card elevation="0" rounded="0" class="position-absolute bottom-0 w-100" color="rgb(0, 0, 0, 0)">

            <v-row justify="center" dense>
                <v-col v-for="(contacto, i) in contactoStore.contactos" :key="i" cols="auto">
                    <v-card :href="contacto.href" class="pa-2" color="rgb(0, 0, 0, 0)" rel="noopener noreferer"
                        target="_blank" width="50" variant="text">
                        <v-avatar :icon="contacto.Social.icono"></v-avatar>
                    </v-card>
                </v-col>
            </v-row>

    </v-card>
</template>

<script setup>

// Stores
import { useContactoStore } from "@/stores/contacto";
const contactoStore = useContactoStore()

</script>