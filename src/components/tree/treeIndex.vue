<style scoped>
</style>
<template>
  <div>
    <h5>递归组件</h5>

      <tree :treeList='testArr' :toggle='true'></tree>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import tree from "@/components/tree/tree.vue";
@Component({
  components: { tree }
})
export default class TreeIndex extends Vue {
    testArr = [
    {
      name: "title1",
      showChildren: true,
      children: [
        {
          name: "title1-1",
          showChildren: true,
          children: [{ name: "title-1-1" }]
        },
        {
          name: "title1-2",
          showChildren: true,
          children: [{ name: "title-1-1" }]
        }
      ]
    },
    {
      name: "title2",
      showChildren: true,
      children: [
        {
          name: "title1-1",
          showChildren: true,
          children: [{ name: "title-1-1" }]
        },
        {
          name: "title1-2",
          showChildren: true,
          children: [{ name: "title-1-1" }]
        }
      ]
    },
    {
      name: "title3",
      showChildren: true
    }
  ];
}
</script>
<style scope>
</style>


