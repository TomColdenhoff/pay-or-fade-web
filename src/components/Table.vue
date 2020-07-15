<template>
  <div>
    <table>
      <thead v-if="!isLoading">
        <th
          v-for="(value, key, index) in filteredHeaderObject"
          v-bind:key="index"
        >
          {{ wordify(key) }}
        </th>
        <th v-for="value in tableActions" :key="value"></th>
        <th v-if="deletableItems"></th>
      </thead>
      <thead v-else>
        <th></th>
      </thead>
      <tbody v-if="!isLoading">
        <tr
          v-for="value in items"
          v-bind:key="value.id"
          @click="clickableRows ? onRowClick(value.id) : () => {}"
          :class="{ clickable: clickableRows }"
        >
          <td
            v-for="(value, key) in getFilteredDataObject(value)"
            v-bind:key="key"
          >
            {{ value }}
          </td>
          <td v-for="(action, key) in tableActions" v-bind:key="key">
            <span
              class="table-action"
              @click.stop="onActionClick(action, value.id)"
              >{{ action }}</span
            >
          </td>
          <td v-if="deletableItems">
            <i
              class="fas fa-trash-alt"
              @click.stop="onDeleteClick(value.id)"
            ></i>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <LoadingDotsLoader />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LoadingDotsLoader from "./loaders/LoadingDotsLoader";
export default {
  name: "Table",
  components: {
    LoadingDotsLoader
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    skippedProperties: {
      type: Array
    },
    clickableRows: {
      type: Boolean,
      required: true
    },
    deletableItems: {
      type: Boolean
    },
    tableActions: {
      type: Array
    }
  },
  computed: {
    filteredHeaderObject() {
      if (this.skippedProperties === undefined || this.items.length === 0)
        return this.items[0];

      return Object.keys(this.items[0])
        .filter(key => !this.skippedProperties.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: this.items[0][key]
          };
        }, {});
    }
  },
  methods: {
    wordify(value) {
      if (typeof value !== "string" || value.length === 0) return value;

      const regex = /([A-Z][a-z]*)/;
      let newValue = value[0].toUpperCase() + value.slice(1);
      return newValue.split(regex).join(" ");
    },
    getFilteredDataObject(value) {
      return Object.keys(value)
        .filter(key => !this.skippedProperties.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: value[key]
          };
        }, {});
    },
    onRowClick(selector) {
      this.$emit("row-clicked", selector);
    },
    onActionClick(action, value) {
      this.$emit("action-clicked", action, value);
    },
    onDeleteClick(selector) {
      this.$emit("delete-clicked", selector);
    }
  }
};
</script>

<style scoped lang="scss">
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;

  th {
    background-color: var(--button-color);
    color: var(--button-text-color);
    text-align: left;
    font-size: 1.15em;
    line-height: 1.15em;
    height: 50px;
  }

  th:first-of-type {
    padding-left: 30px;
    border-top-left-radius: 25px;
  }

  th:last-of-type {
    border-top-right-radius: 25px;
  }

  tbody {
    text-align: left;
    tr {
      height: 50px;
      border-bottom: 2px solid var(--divider-shadow-color);
      z-index: -1;

      td:first-of-type {
        padding-left: 30px;
      }
    }

    tr:nth-child(even) {
      background-color: var(--table-row-even-color);
    }

    tr:hover {
      background-color: var(--table-row-hover-color);
    }
  }
}

.clickable {
  cursor: pointer;
}

.table-action {
  font-weight: bolder;
}

.table-action:hover {
  color: var(--button-hover-color);
}

.fa-trash-alt {
  font-size: 1.1em;
  color: var(--error-box-color);
}

.fa-trash-alt:hover {
  color: var(--error-hover-color);
}

@media (max-width: 800px) {
  div {
    overflow: scroll;
    width: 100%;
    padding: 1px;
  }

  table {
    width: 150%;
  }

  th {
    border-right: 4px solid var(--button-color);
  }

  th:last-of-type {
    border-right: 0;
  }
}
</style>
