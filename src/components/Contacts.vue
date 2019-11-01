<template lang="pug">
.contacts
  .contact-wrap
    .search
      input(placeholder="Search" v-model="searchQuery")
    .contact(v-for="user in filteredList" @click="openContact(user)")
      .avatar
        img(:src="user.avatar")
      .info
        .name {{ user.name }}
        .company {{ user.company }}
        .job-title {{ user.designation }}
  .modal-wrap(v-if="showModal" @click="closeModal($event)")
    .modal(@click.stop)
      .action-bar
        .ib.delete-btn(@click='deleteSelected(modalData.id)')
          img(src="https://fonts.gstatic.com/s/i/materialicons/delete/v1/24px.svg")
        .ib.edit-btn(@click='edit')
          img(src="https://fonts.gstatic.com/s/i/materialicons/edit/v1/24px.svg")
        // .ib.close-btn
        //   img(src="https://fonts.gstatic.com/s/i/materialicons/close/v1/24px.svg")
      .contact
        .avatar
          img(:src="modalData.avatar")
        .info
          .id
            .info-label ID
            .info-value(v-if="!editMode") {{ modalData.id }}
            .edit(v-if="editMode")
              input(v-model="modalData.id")
          .email
            .info-label EMAIL
            .info-value(v-if="!editMode") {{ modalData.email }}
            .edit(v-if="editMode")
              input(v-model="modalData.email")
          .name
            .info-label NAME
            .info-value(v-if="!editMode") {{ modalData.name }}
            .edit(v-if="editMode")
              input(v-model="modalData.name")
          .company
            .info-label COMPANY
            .info-value(v-if="!editMode") {{ modalData.company }}
            .edit(v-if="editMode")
              input(v-model="modalData.company")
          .job-title
            .info-label DESIGNATION
            .info-value(v-if="!editMode") {{ modalData.designation }}
            .edit(v-if="editMode")
              input(v-model="modalData.designation")
        .save-btn
          button(v-if="editMode" @click='save(modalData)') Save
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['users']),
    filteredList() {
      const value = this.searchQuery.toUpperCase();
      return this.users.filter(user => user.email.toUpperCase().indexOf(value) > -1
      || user.name.toUpperCase().indexOf(value) > -1);
    },
  },
  methods: {
    ...mapActions(['deleteById', 'updateUser']),
    openContact(user) {
      this.modalData = user;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editMode = false;
    },
    deleteSelected(id) {
      this.showModal = false;
      this.modalData = {
        id: '',
        email: '',
        name: '',
        company: '',
        designation: '',
        avatar: '',
      };
      this.deleteById(id);
    },
    edit() {
      this.editMode = true;
    },
    save(newData) {
      this.editMode = false;
      this.updateUser(newData);
    },
  },
  data() {
    return {
      searchQuery: '',
      showModal: false,
      editMode: false,
      modalData: {
        id: '',
        email: '',
        name: '',
        company: '',
        designation: '',
        avatar: '',
      },
    };
  },
};
</script>

<style lang="scss">
@mixin box-shadow($top, $left, $blur, $color, $inset: false) {
  @if $inset {
    -webkit-box-shadow:inset $top $left $blur $color;
    -moz-box-shadow:inset $top $left $blur $color;
    box-shadow:inset $top $left $blur $color;
  } @else {
    -webkit-box-shadow: $top $left $blur $color;
    -moz-box-shadow: $top $left $blur $color;
    box-shadow: $top $left $blur $color;
  }
}

.ib {
  display: inline-block;
}
.contacts {
  .contact-wrap {
    margin-left: 5%;
    .search {
      width: 90%;
      input {
        margin-left: -10px;
        width: 100%;
        padding: 10px;
      }
    }
    .contact {
      @include box-shadow(0, 1px, 2px, rgba(0, 0, 0, 0.2));
      cursor: pointer;
      width: 90%;
      display: flex;
      margin-top: 10px;
      .avatar {
          flex: 1;
          max-width: 100%;
          img {
            margin-top: 10px;
            object-fit: cover;
            vertical-align: middle;
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
      }
      .info {
        flex: 2;
        margin-left: 5%;
        padding: 20px;
        .name {
          color: rgb(2, 53, 87);
          font-weight: bold;
        }
        .company {
          margin-top: 10px;
        }
      }
      &:hover {
        @include box-shadow(0, 2px, 3px, rgba(0, 67, 112, 0.788));
      }
    }
  }
  .modal-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 67, 112, 0.788);
    .modal {
      position: fixed;
      max-width: 100%;
      width: 300px;
      margin-left: -150px;
      background: white;
      @include box-shadow(0, 2px, 3px, rgba(0, 67, 112, 0.788));
      top: 20px;
      left: 50%;
      padding: 20px;
      .info-label {
        font-weight: bold;
        font-size: 14px;
      }
      .info-value {
        margin-bottom: 10px;
        font-size: 14px;
      }
      .action-bar {
        .ib {
          margin-right: 10px;
          button {
            border: none;
            border-radius: 5px;
          }
        }
      }
      .avatar {
        img {
          max-width: 200px;
          max-height: 200px;
        }
      }
    }
  }
}
</style>
