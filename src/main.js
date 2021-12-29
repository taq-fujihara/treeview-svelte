import TreeView from './lib/TreeView.svelte'

const root = {
  id: 'id',
  text: 'text',
  children: [
    {
      id: 'id1',
      text: 'text1',
      children: [
        {
          id: 'id1-1',
          text: 'text1-1',
        },
        {
          id: 'id1-2',
          text: 'text1-2',
        },
      ],
    },
    {
      id: 'id2',
      text: 'text2',
      children: [
        {
          id: 'id2-1',
          text: 'text2-1',
        },
        {
          id: 'id2-2',
          text: 'text2-2',
        },
        {
          id: 'id2-3',
          text: 'text2-3',
          children: [
            {
              id: 'id2-3-1',
              text: 'text2-3-1',
            },
            {
              id: 'id2-3-2',
              text: 'text2-3-2',
            },
          ],
        },
      ],
    },
    {
      id: 'id3',
      text: 'text3',
      children: [
        {
          id: 'id3-1',
          text: 'text3-1',
        },
        {
          id: 'id3-2',
          text: 'text3-2',
        },
        {
          id: 'id3-3',
          text: 'text3-3',
        },
      ],
    },
  ],
}

// for (let i = 0; i < 400; i++) {
//   root.children[0].children.push({
//     id: `bulk-${i}`,
//     text: `bulk ${i}`
//   })
// }

const treeView = new TreeView({
  target: document.getElementById('app'),
  props: { root },
})

export default treeView
