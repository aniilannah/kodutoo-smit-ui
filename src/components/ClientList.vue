<template>
  <div id="app">
    <h1>Kontaktide haldus</h1>


    <form @submit.prevent="addContact">
      <input type="text" v-model="newContact.fullName" placeholder="Täisnimi" required />
      <input type="text" v-model="newContact.codeName" placeholder="Salajane nimi" required />
      <input type="text" v-model="newContact.phoneNumber" placeholder="Telefoninumber" required />
      <button type="submit">Lisa uus kontakt</button>
    </form>


    <button @click="toggleShowContacts">
      {{ showContacts ? 'Peida kõik kontaktid' : 'Näita kõiki kontakte' }}
    </button>


    <div v-if="showContacts">
      <input
          type="text"
          v-model="searchQuery"
          @input="searchAndFilterContacts"
          placeholder="Otsi kontakti (nimi, salajane nimi või telefon)"
      />


      <button @click="sortContacts('asc')">Sorteeri A-Z</button>
      <button @click="sortContacts('desc')">Sorteeri Z-A</button>


      <ul>
        <li v-for="contact in filteredContacts" :key="contact.id">
          {{ contact.fullName }} ({{ contact.codeName }}) - {{ contact.phoneNumber }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { fetchAllContacts, addContact, searchAndFilterContacts } from "@/api/clientlist";


export default {
  data() {
    return {
      searchQuery: "",
      contacts: [],
      filteredContacts: [],
      newContact: {
        fullName: "",
        codeName: "",
        phoneNumber: "",
      },
      showContacts: false,
      sortOrder: 'asc',
    };
  },
  methods: {
    toggleShowContacts() {
      if (this.showContacts === true) {
        this.showContacts = false;
      } else {
        this.showContacts = true;
      }
    },


    async fetchContacts() {
      const response = await fetchAllContacts();
      this.contacts = response;
      this.filteredContacts = response;
    },


    async addContact() {
      const response = await addContact(this.newContact);
      this.contacts.push(response);
      this.filteredContacts.push(response);
      this.newContact = { fullName: "", codeName: "", phoneNumber: "" };
    },


    async searchAndFilterContacts() {
      if (this.searchQuery === "") {
        this.filteredContacts = this.contacts;
      } else {
        const response = await searchAndFilterContacts(this.searchQuery);
        this.filteredContacts = response;
      }
    },


    sortContacts(order) {
      if (order === 'asc') {
        this.filteredContacts.sort(function(a, b) {
          if (a.fullName < b.fullName) {
            return -1;
          }
          if (a.fullName > b.fullName) {
            return 1;
          }
          return 0;
        });
      } else if (order === 'desc') {
        this.filteredContacts.sort(function(a, b) {
          if (a.fullName < b.fullName) {
            return 1;
          }
          if (a.fullName > b.fullName) {
            return -1;
          }
          return 0;
        });
      }
    }
  },
  mounted() {
    this.fetchContacts();
  },
};
</script>
