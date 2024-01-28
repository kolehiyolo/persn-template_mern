users = [
  {
    "_id": {
      "$oid": "65773b179407d34564bd6ed9"
    },
    name: {
      first: 'Monkey',
      middle: 'D.',
      last: 'Luffy'
    },
    main_role: 'Captain',
    projects: [
    ],
    tasks: [
    ],
    profile_picture: 'https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png/revision/latest?cb=20200429191518',
    user_name: 'futurePirateKing01',
    password: '12341234'
  }
]

tasks = [
  {
    "_id": {
      "$oid": "657740999407d34564bd6eed"
    },
    "name": "Destroy Punk Hazard Factory",
    "start": "2023-12-12",
    "due": "2023-12-31",
    "done": False,
    "owner": "65773b179407d34564bd6ed9",
    "project": "65773f7c9407d34564bd6ee7",
    "priority": "High",
    "description": "",
  }
]

'Go to Punk Hazard',
'Destroy Punk Hazard Factory',
'Beat Caesar Clown',
'Go to Dressrosa',
'Free the Tontatta',
'Destroy SMILE Factory',
'Beat Donquixote Doflamingo',
'Go to Wano',
'Rouse the Samurai',
'Go to Onigashima',
'Execute the Raid',
'Fight Kaido'

projects = [
  {
    id: '',
    name: 'Beat Kaido',
    description: "We need to beat the Yonko, and we'll do Kaido first",
    priority: 'High',
    done: false,
    start: '2023-12-12',
    due: '2023-12-31',
    members: [
      {
        id: '65773b179407d34564bd6ed9',
        role: 'Captain'
      },
      {
        id: '65773bd49407d34564bd6edb',
        role: 'Swordsman'
      }
    ],
    tasks: [
    ]
  }
]
