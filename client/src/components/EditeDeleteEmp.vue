<template>
  <v-row>
    <v-col>
      <v-data-table
        v-model="selected"
        show-select
        :headers="headers"
        :items="testingData"
        :search="search"
        :single-select="singleSelect"
        item-key="_id"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-card-title>
            <v-text-field v-model="search" label="Search" single-line></v-text-field>
          </v-card-title>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-lead-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-trash-can-outline</v-icon>
        </template>
      </v-data-table>
      <template>
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
      </template>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "editeDelete",
  data() {
    return {
      singleSelect: false,
      selected: [],
      search: "",
      api: process.env.VUE_APP_REST_API,
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
        { text: "Codigo Postal", value: "codigo_postal", filterable: false },
        { text: "Freguesia", value: "freguesia" },
        { text: "Telefone", value: "telefone" },
        { text: "Actions", value: "action", filterable: false }
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
    };
  },

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
        const response = await axios.get(this.api);
        //this.tableData = response.data;
        this.$store.state.tesData = response.data;
        //console.log(response.data);
        //this.tableData = this.$store.state.tesData;
      } catch (error) {
        console.error(error);
      }
    },

    initialize() {
      this.getableData();
    },

    async itemToDelete(_id) {
      try {
        const response = await axios.delete(this.api + "/" + _id);
        response;
      } catch (error) {
        console.error(error);
      }
    },

    async itemToEdit(_id) {
      try {
        const response = await axios.post(
          this.api + "/" + _id,
          this.editedItem
        );
        response;
      } catch (error) {
        console.error(error);
      }
    },

    editItem(item) {
      this.editedIndex = this.$store.state.tesData.indexOf(item);
      this.selectedItem = item;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialog2 = true;
      if (Object.keys(this.selected).length !== 0) {
        this.deleteSelected();
      } else {
        const index = this.$store.state.tesData.indexOf(item);
        confirm("Are you sure you want to delete this item?") &&
          this.$store.state.tesData.splice(index, 1);
        this.itemToDelete(item._id);
      }
    },

    deleteSelected() {
      if (confirm("Are you sure you want to delete selected items?")) {
        this.selected.forEach(element => {
          const index = this.$store.state.tesData.indexOf(element);
          this.$store.state.tesData.splice(index, 1);
          this.itemToDelete(element._id);
        });
      }
      this.selected = [];
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
        Object.assign(
          this.$store.state.tesData[this.editedIndex],
          this.editedItem
        );
        this.itemToEdit(this.editedItem._id);
      } else {
        this.$store.state.tesData.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>