<template>
    <v-sheet
      class="mx-auto"
      max-width="600"
    >
      <v-slide-group
        show-arrows
      >
        <v-slide-group-item
          v-for="n in 25"
          :key="n"
          v-slot="{ isSelected, toggle }"
        >
          <v-btn
            :color="isSelected ? 'primary' : undefined"
            class="ma-2"
            rounded
            @click="toggle"
          >
            Options {{ n }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </template>