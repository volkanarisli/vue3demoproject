<template>
  <form
    class="user-profile__create-twoot"
    @submit.prevent="createNewTwoot"
    :class="{ '--exceeded': state.newTwootCharacterCount > 180 }"
  >
    <label for="newTwoot"
      ><strong>New Twoot</strong>{{ newTwootCharacterCount }}/180</label
    >
    <textarea v-model="state.newTwootContent" id="newTwoot" rows="4" />
    <div class="create-twoot-panel__submit">
      <div class="create-twoot-type">
        <label for="newTwootType"><strong>Type: </strong></label>
        <select id="newTwootType" v-model="state.selectedTwootType">
          <option
            v-for="(option, index) in state.twootTypes"
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
</template>

<script>
import { reactive, computed } from "vue";
export default {
  name: "CreateTwootPanel",
  setup(props, ctx) {
    const state = reactive({
      newTwootContent: "",
      selectedTwootType: "instant",
      twootTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant" },
      ],
    });
    const newTwootCharacterCount = computed(() => state.newTwootContent.length);
    function createNewTwoot() {
      if (state.newTwootContent && state.selectedTwootType !== "draft") {
        ctx.emit("add-twoot", state.newTwootContent);
        state.newTwootContent = "";
      }
    }

    return {
      state,
      newTwootCharacterCount,
      createNewTwoot,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>