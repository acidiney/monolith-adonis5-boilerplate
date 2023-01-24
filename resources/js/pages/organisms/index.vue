<template>
  <account-layout>
    <div>
      <app-page-hero title="Organismos" sub-title="Lista de organismos existentes" />
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <app-filter>
            <app-dropdown :openModal="toogleModal" class="col" />
          </app-filter>
          <!-- <app-table :columns="columns" :rows="rows" @paginate="(page) => setFilter('page', page)">
          </app-table> -->
          <a-table bordered :columns="columns" :data-source="rows" size="small">
            <!-- <template v-slot:name="text">
              <a>{{ text }}</a>
            </template> -->
            <!-- <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
            <span slot="tags" slot-scope="tags">
              <a-tag
                v-for="tag in tags"
                :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
             -->
            <template v-slot:action>
              <span>
                <a>Invite 一 {{ record.name }}</a>
                <a-divider type="vertical" />
                <a>Delete</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
              </span>
            </template>
          </a-table>

          <app-create-organism-modal
            :visible="visible"
            :handleOk="toogleModal"
            :handleCancel="toogleModal"
          />
        </div>
      </div>
    </div>
  </account-layout>
</template>
<script>
import { ref, watch, inject } from 'vue'
import AppFilter from '../../core/components/app-filter.vue'
import AppDropdown from './components/AppDropdown.vue'
import { Inertia } from '@inertiajs/inertia'
import { filter } from 'lodash'

import AppCreateOrganismModal from './components/CreateOrganismModal.vue'

export default {
  components: {
    AppFilter,
    AppDropdown,
    AppCreateOrganismModal
  },
  computed: {
    columns() {
      return [
        {
          dataIndex: 'name',
          key: 'name',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          scopedSlots: { customRender: 'tags' },
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ]
    },
    rows() {
      return [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ]
    },
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
    }
  },
  methods: {
    toogleModal () {
      this.visible = !this.visible
    }
  },
  setup() {
    const $http = inject('$http')
    const loadOrganisms = (filter) => {
      console.log($http)
      $http.organism
        .index(filter)
        .then((rea) => rea.json())
        .then((a) => {
          console.log(a)
        })
    }

    const filters = ref({
      page: 1,
      search: '',
      perPage: 10,
    })

    const setFilter = (key, value) => {
      filters.value = {
        ...filters.value,
        [key]: value,
      }
    }

    watch(filters, () => {
      loadOrganisms(filters.value)
    })

    return { filters, setFilter }
  },
}
</script>
