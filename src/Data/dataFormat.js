[
  {
    label: '{{"Tasks"}}',
    icon: '{{"icons.IconListCheck"}}',
    tasks: [
      '{{repeat(10,20)}}',
      {
        id: '{{guid()}}',
        title: '{{lorem(4, "words")}}',
        desc: '{{lorem(1, "sentences")}}',
        completed: '{{bool()}}',
        createdon: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        completedon: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        duedate: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        fav: '{{bool()}}',
        note: '{{random(lorem(2, "sentences"), lorem(1, "sentences"), "")}}',
        steps: [
          '{{repeat(0,5)}}',
          {
            id: '{{guid()}}',
            text: '{{lorem(1, "sentences")}}',
            completed: '{{bool()}}'
          }
        ]
      }]
  },
  {
    label: '{{"Shopping"}}',
    icon: '{{"icons.IconShoppingCart"}}',
    tasks: [
      '{{repeat(10,20)}}',
      {
        id: '{{guid()}}',
        title: '{{lorem(3, "words")}}',
        desc: '{{lorem(1, "sentences")}}',
        completed: '{{bool()}}',
        createdon: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        completedon: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        duedate: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        fav: '{{bool()}}',
        note: '{{random(lorem(2, "sentences"), lorem(1, "sentences"), "")}}',
        steps: [
          '{{repeat(0,5)}}',
          {
            id: '{{guid()}}',
            text: '{{lorem(1, "sentences")}}',
            completed: '{{bool()}}'
          }
        ]
      }]
  },
  {
    label: '{{"Work"}}',
    icon: '{{"icons.IconBuildingSkyscraper"}}',
    tasks: [
      '{{repeat(10,20)}}',
      {
        id: '{{guid()}}',
        title: '{{lorem(2, "words")}}',
        desc: '{{lorem(1, "sentences")}}',
        completed: '{{bool()}}',
        createdon: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        completedon: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        duedate: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        fav: '{{bool()}}',
        note: '{{random(lorem(2, "sentences"), lorem(1, "sentences"), "")}}',
        steps: [
          '{{repeat(0,5)}}',
          {
            id: '{{guid()}}',
            text: '{{lorem(1, "sentences")}}',
            completed: '{{bool()}}'
          }
        ]
      }]
  },
  {
    label: '{{"School"}}',
    icon: '{{"icons.IconBackpack"}}',
    tasks: [
      '{{repeat(10,20)}}',
      {
        id: '{{guid()}}',
        title: '{{lorem(6, "words")}}',
        desc: '{{lorem(1, "sentences")}}',
        completed: '{{bool()}}',
        createdon: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        completedon: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        duedate: '{{date(new Date(2021, 0, 1), new Date(), "DD, MMM d, YYYY")}}',
        fav: '{{bool()}}',
        note: '{{random(lorem(2, "sentences"), lorem(1, "sentences"), "")}}',
        steps: [
          '{{repeat(0,5)}}',
          {
            id: '{{guid()}}',
            text: '{{lorem(1, "sentences")}}',
            completed: '{{bool()}}'
          }
        ]
      }]
  }
]