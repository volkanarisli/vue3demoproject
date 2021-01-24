<template>
  <div class="user-profile">
    <div>
      <div class="user-profile__user-panel">
        <h1 class="user-profile__username">@{{ user.username }}</h1>
        <div class="user-profile__admin-badge" v-if="user.isAdmin">Admin</div>
        <div class="user-profile__follower-count">
          <strong>Followers: </strong> {{ followers }}
        </div>
        <form
          class="user-profile__create-twoot"
          @submit.prevent="createNewTwoot"
        >
          <label for="newTwoot"><strong>New Twoot</strong></label>
          <textarea v-model="newTwootContent" id="newTwoot" rows="4" />
          <div class="user-profile_create-twoot-type">
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
        </form>
      </div>
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

<style>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
  padding: 50px 5%;
}
.user-profile__user-panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #dfe3e8;
  margin-bottom: auto;
}
.user-profile__admin-badge {
  background: rebeccapurple;
  color: white;
  border-radius: 5px;
  margin-right: auto;
  padding: 0 10px;
  font-weight: bold;
  margin-bottom: 20px;
}
.user-profile__twoots-wrapper {
  display: grid;
  grid-gap: 10px;
  margin-bottom: auto;
}
.twoot-item {
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #dfe3e8;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.25s ease;
}
h1 {
  margin: 0;
}
.user-profile__create-twoot {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>
