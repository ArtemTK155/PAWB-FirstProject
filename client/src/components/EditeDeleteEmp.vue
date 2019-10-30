<template>
  <v-data-table :headers="headers" :items="testingData" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nome" :label="options.nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.morada" :label="options.morada"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.codigo_postal" :label="options.codigo_postal"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.freguesia" :label="options.freguesia"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.telefone" :label="options.telefone"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-lead-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-trash-can-outline</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  name: "editeDelete",
  data: () => ({
    dialog: false,
    options: {
      nome: "Nome",
      morada: "Morada",
      codigo_postal: "Codigo Postal",
      freguesia: "Freguesia",
      telefone: "Telefone"
    },
    headers: [
      { text: "Nome", value: "nome" },
      { text: "Morada", value: "morada" },
      { text: "Codigo Postal", value: "codigo_postal" },
      { text: "Freguesia", value: "freguesia" },
      { text: "Telefone", value: "telefone" },
      { text: "Actions", value: "action" }
    ],
    tableData: [],
    selectedItem: [],
    editedIndex: -1,
    editedItem: {
      nome: "",
      morada: "",
      codigo_postal: "",
      freguesia: "",
      telefone: ""
    },
    defaultItem: {
      nome: "",
      morada: "",
      codigo_postal: "",
      freguesia: "",
      telefone: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    testingData() {
      return this.$store.state.tesData;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async getableData() {
      try {
        const response = await axios.get("http://localhost:4000/empresas");
        this.tableData = response.data;
        this.$store.state.tesData = response.data;
        response;
      } catch (error) {
        console.error(error);
      }
    },

    initialize() {
      this.getableData();
    },

    async itemToDelete(_id) {
      try {
        const response = await axios.delete(
          "http://localhost:4000/empresas/" + _id
        );
        //this.tableData = response.data;
        //this.$store.state.tesData = response.data;
        response;
      } catch (error) {
        console.error(error);
      }
    },

    async itemToEdit(_id) {
      try {
        const response = await axios.post(
          "http://localhost:4000/empresas/" + _id,
          this.editedItem
        );
        console.log("item to edit");
        console.log(response);
        //this.tableData = response.data;
        //this.$store.state.tesData = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    editItem(item) {
      this.editedIndex = this.tableData.indexOf(item);
      this.selectedItem = item;
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.tableData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tableData.splice(index, 1);
      this.itemToDelete(item._id);
    },

    close() {
      this.dialog = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem);
        this.itemToEdit(this.editedItem._id);
      } else {
        this.tableData.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>