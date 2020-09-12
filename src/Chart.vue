<template>
  <sunburst
    :data="tree"
    :min-angle-displayed="0"
    color-scheme="schemeSet3"
    @clickNode="nodeClicked"
  >
    <!-- Add behaviors -->
    <template slot-scope="{ on, actions }">
      <highlightOnHover v-bind="{ on, actions }" />
      <zoomOnClick v-bind="{ on, actions }" />
    </template>

    <!-- Add information to be displayed on top the graph -->
    <nodeInfoDisplayer
      slot="top"
      slot-scope="{ nodes }"
      :current="nodes.mouseOver"
      :root="nodes.root"
      description="всех трат"
    />

    <!-- Add bottom legend -->
    <breadcrumbTrail
      slot="legend"
      slot-scope="{ nodes, colorGetter, width }"
      :current="nodes.mouseOver"
      :root="nodes.root"
      :colorGetter="colorGetter"
      :from="nodes.clicked"
      :width="width"
      :item-width="width / 4"
    />
  </sunburst>
</template>

<script>
import {
  breadcrumbTrail,
  highlightOnHover,
  nodeInfoDisplayer,
  sunburst,
  zoomOnClick
} from 'vue-d3-sunburst'
import 'vue-d3-sunburst/dist/vue-d3-sunburst.css'

export default {
  props: ['tree'],
  components: {
    breadcrumbTrail,
    highlightOnHover,
    nodeInfoDisplayer,
    sunburst,
    zoomOnClick
  },
  data() {
    return {}
  },
  methods: {
    nodeClicked(info) {
      let node = info.node
      const path = []

      path.push(node.data.name)
      while (node.parent) {
        node = node.parent
        path.push(node.data.name)
      }
      path.reverse()
      this.$emit('pathSelected', path)
    }
  }
}
</script>
