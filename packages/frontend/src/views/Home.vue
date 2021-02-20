<template>
  <v-container>
    <v-card :loading="submitting">
      <v-card-title> Login </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" class="mx-0">
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit">
                <v-row>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Username"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="username"
                      :error-messages="errors"
                      label="Username"
                      :disabled="submitting"
                      required
                      clearable
                      prepend-icon="mdi-account"
                    ></v-text-field>
                  </validation-provider>
                </v-row>
                <v-row>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Password"
                    rules="required"
                  >
                    <v-text-field
                      v-model="password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                      required
                      :disabled="submitting"
                      :error-messages="errors"
                      prepend-icon="mdi-lock"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </validation-provider>
                </v-row>
                <v-btn :loading="submitting" type="submit" :disabled="invalid"
                  >Login</v-btn
                >
              </form>
            </validation-observer>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-row align="center" justify="space-around">
          <v-btn :href="loginGithub" outlined
            ><v-icon left> mdi-github-circle </v-icon>Login with Github</v-btn
          >
          <v-btn :href="loginGoogle" outlined
            ><v-icon left> mdi-google </v-icon>Login with Google</v-btn
          >
          <v-btn :href="loginTwitter" outlined
            ><v-icon left> mdi-twitter </v-icon>Login with Twitter</v-btn
          >
        </v-row>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" color="red">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts" src="./home.ts"></script>
