<template>
  <v-form>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-toolbar dark>
              <v-toolbar-title>Criar</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mr-1" @click="submit()">
                  <v-icon>mdi-plus-box</v-icon>Criar
                </v-btn>
                <v-btn class="mr-1" @click="clear">
                  <v-icon>mdi-restart</v-icon>Reset
                </v-btn>
              </v-card-actions>
            </v-toolbar>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="3">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              label="Nome"
              required
              @input="$v.name.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="3">
            <v-text-field
              v-model="addrress"
              :error-messages="addrressErrors"
              label="Morada"
              required
              @input="$v.addrress.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="postCode"
              :error-messages="postCodeErrors"
              label="Codigo Postal"
              required
              @input="$v.postCode.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="freg"
              :error-messages="fregErrors"
              label="Freguesia"
              required
              @input="$v.freg.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="tele"
              :error-messages="teleErrors"
              label="Telefone"
              required
              @input="$v.tele.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import axios from "axios";
import { mapActions } from "vuex";
import "vuetify/dist/vuetify.min.css";
export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    tele: { required },
    addrress: { required },
    postCode: { required },
    freg: { required }
  },
  name: "create",
  components: {},

  data: () => ({
    api: process.env.VUE_APP_REST_API,
    name: "",
    tele: "",
    addrress: "",
    postCode: "",
    freg: ""
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Obrigatório.");
      return errors;
    },
    teleErrors() {
      const errors = [];
      if (!this.$v.tele.$dirty) return errors;
      !this.$v.tele.required && errors.push("Obrigatório.");
      return errors;
    },
    addrressErrors() {
      const errors = [];
      if (!this.$v.addrress.$dirty) return errors;
      !this.$v.addrress.required && errors.push("Obrigatório.");
      return errors;
    },
    postCodeErrors() {
      const errors = [];
      if (!this.$v.postCode.$dirty) return errors;
      !this.$v.postCode.required && errors.push("Obrigatório.");
      return errors;
    },
    fregErrors() {
      const errors = [];
      if (!this.$v.freg.$dirty) return errors;
      !this.$v.freg.required && errors.push("Obrigatório.");
      return errors;
    }
  },

  methods: {
    ...mapActions(["addNames"]),
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        axios
          .post(this.api, {
            nome: this.name,
            telefone: this.tele,
            morada: this.addrress,
            codigo_postal: this.postCode,
            freguesia: this.freg
          })
          .then(response => {
            console.log(response);
            this.$store.commit("addData", response.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.addrress = "";
      this.tele = "";
      this.postCode = "";
      this.freg = "";
    }
  }
};
</script>


<style>
</style>