<template>
  <div>
    <PageHeader>Sites</PageHeader>
    <div class="table-container">
      <ActionButton
        class="addButton"
        :internal="true"
        url=""
        @clicked="displayCreateModal"
        >Add site</ActionButton
      >
      <Table
        :items="sites"
        :table-actions="tableActions"
        :skipped-properties="['id']"
        :is-loading="isLoadingSites"
        :clickable-rows="true"
        @row-clicked="displayEditModal"
        :deletable-items="true"
        @action-clicked="executeAction"
        @delete-clicked="deleteSite"
      ></Table>
      <transition name="fade">
        <CreateSiteModal
          v-if="showCreateModal"
          @closed="closeModals"
          @handled="loadSites"
        />
        <EditSideModal
          v-if="showEditModal"
          @closed="closeModals"
          @handled="loadSites"
          :initial-site="siteToEdit"
        />
        <SiteCdnModal
          v-if="showCdnModal"
          :site-id="selectedSiteCdnId"
          @closed="closeModals"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { fromUTCToCurrentDate } from "../javascript-services/datetimeoffsetservice.js";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import ActionButton from "../components/buttons/ActionButton";
import CreateSiteModal from "../components/Sites/CreateSiteModal";
import EditSideModal from "../components/Sites/EditSideModal";
import SiteCdnModal from "../components/Sites/SiteCdnModal";

export default {
  name: "Sites",
  components: {
    Table,
    PageHeader,
    ActionButton,
    CreateSiteModal,
    EditSideModal,
    SiteCdnModal
  },
  data() {
    return {
      sites: [],
      showCreateModal: false,
      showEditModal: false,
      showCdnModal: false,
      isLoadingSites: false,
      siteToEdit: null,
      selectedSiteCdnId: null,
      tableActions: ["CDN"]
    };
  },
  methods: {
    loadSites() {
      this.isLoadingSites = true;
      new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_BASE_URL + "api/siteinfo/index",
          method: "GET"
        })
          .then(resp => {
            this.sites = resp.data;
            this.sites = this.sites.map(site => {
              site.startDate = fromUTCToCurrentDate(
                site.startDate
              ).toLocaleDateString();
              site.dueDate = fromUTCToCurrentDate(
                site.dueDate
              ).toLocaleDateString();
              return site;
            });
            resolve(resp);
            this.isLoadingSites = false;
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    displayCreateModal() {
      this.showCreateModal = true;
    },
    closeModals() {
      this.showCreateModal = false;
      this.showEditModal = false;
      this.showCdnModal = false;
    },
    displayEditModal(siteInfoId) {
      this.siteToEdit = this.sites.filter(s => {
        return s.id === siteInfoId;
      })[0];
      this.showEditModal = true;
    },
    executeAction(action, value) {
      switch (action) {
        case "CDN":
          this.showCdnModal = true;
          this.selectedSiteCdnId = value;
          break;
      }
    },
    deleteSite(siteInfoId) {
      new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_BASE_URL + `api/siteinfo/${siteInfoId}`,
          method: "DELETE"
        })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            if (error.response.status !== 404) {
              reject(error);
            }

            this.sites = this.sites.filter(site => {
              return site.id !== siteInfoId;
            });
          });
      });
    }
  },
  mounted() {
    this.loadSites();
  }
};
</script>

<style scoped lang="scss">
.table-container {
  width: 75%;
  margin: 0 auto;
}

.addButton {
  float: right;
  margin-bottom: 25px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 800px) {
  .table-container {
    padding: 10px;
    width: calc(100vw - 20px);
  }
}
</style>
