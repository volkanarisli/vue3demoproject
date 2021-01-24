<template>
  <div class="user-profile">
    <div>
      <div class="user-profile__user-panel">
        <h1 class="user-profile__username">@{{ user.username }}</h1>
        <div class="user-profile__admin-badge" v-if="user.isAdmin">Admin</div>
        <div class="user-profile__follower-count">
          <strong>Followers: </strong> {{ followers }}
        </div>
      </div>
      <form
        class="user-profile__create-twoot"
        @submit.prevent="createNewTwoot"
        :class="{ '--exceeded': newTwootCharacterCount > 180 }"
      >
        <label for="newTwoot"
          ><strong>New Twoot</strong>{{ newTwootCharacterCount }}/180</label
        >
        <textarea v-model="newTwootContent" id="newTwoot" rows="4" />
        <div class="create-twoot-panel__submit">
          <div class="create-twoot-type">
            <label for="newTwootType"><strong>Type: </strong></label>
            <select id="newTwootType" v-model="selectedTwootType">
              <option
                v-for="(option, index) in twootTypes"
                :value="option.value"
                :key="index"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
          <button>Twoot!</button>
        </div>
      </form>
    </div>
    <div class="user-profile__twoots-wrapper">
      <twoot-item
        v-for="twoot in user.twoots"
        :key="twoot.id"
        :twoot="twoot"
        :username="user.username"
        @favoriteTwoot="toggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import TwootItem from "./TwootItem.vue";
export default {
  name: "App",
  components: {
    TwootItem,
  },
  data() {
    return {
      newTwootContent: "",
      selectedTwootType: "instant",
      twootTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant" },
      ],
      followers: 0,
      user: {
        id: 1,
        username: "_deneme",
        firstName: "foo",
        lastName: "bar",
        email: "foo@gmail.com",
        isAdmin: true,
        twoots: [
          { id: 1, content: "Twotter is amazing!!" },
          { id: 2, content: "Hello world" },
        ],
      },
    };
  },
  watch: {
    followers(newVal, oldVal) {
      if (oldVal < newVal)
        console.log(`${this.user.username} has gained a follower!`);
    },
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    newTwootCharacterCount() {
      return this.newTwootContent.length;
    },
  },
  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavorite(id) {
      console.log(id);
    },
    createNewTwoot() {
      if (this.newTwootContent && this.selectedTwootType !== "draft") {
        this.user.twoots.unshift({
          id: this.user.twoots.length + 1,
          content: this.newTwootContent,
        });
        this.newTwootContent = "";
      }
    },
  },
  mounted() {
    this.followUser();
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
  padding: 50px 5%;
  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;
    margin-bottom: auto;
    h1 {
      margin: 0;
    }
    .user-profile__admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    }
  }
  .user-profile__create-twoot {
    margin-top: 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    textarea {
      border: 1px solid #dfe3e8;
      border-radius: 5px;
    }
    .create-twoot-panel__submit {
      display: flex;
      justify-content: space-between;
      .create-twoot-type {
        padding: 10px 0;
      }
      button {
        padding: 5px 20px;
        margin: auto 0;
        border-radius: 5px;
        border: none;
        background-color: deeppink;
        color: white;
        font-weight: bold;
      }
    }
    &.--exceeded {
      color: red;
      border-color: red;
      .create-twoot-panel__submit {
        button {
          background-color: red;
          color: white;
        }
      }
    }
  }
  .user-profile__twoots-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
}
</style>
