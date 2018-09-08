<template>
  <v-card class="loginCard">
    <v-card-title>
      Login or Signup!
    </v-card-title>
    <v-card-text>
      <v-text-field
      label="Username"
      placeholder="Placeholder"
      outline
      ></v-text-field>
      <v-text-field
      label="Password"
      placeholder="Placeholder"
      outline
      ></v-text-field>
      <v-btn color="success">Login</v-btn>
    </v-card-text>
  </v-card>
</template>

<style>
.loginCard {
  margin: 20px;
}
</style>

