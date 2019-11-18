const DIMENSION = 40
const TILE_WIDTH = 50 // pixels
const PLAYER_WIDTH = 30
const PLAYER_WEAPON_WIDTH = 64
const PLAYER_WEAPON_HEIGHT = 48
const ZOMBIE_WIDTH = 30
const BLOOD_STAIN_WIDTH = 50
const VIEWPORT_PADDING = 200
const HEALTH_BAR_MAX_WIDTH = 40
const HEALTH_BAR_HEIGHT = 8
const REGEN_POD_WIDTH = 20

const HEALTH_BAR_OFFSET = 40
const WALL_STATE = 1
const CORNER_STATE = 2
const SPAWNER_STATE = 3
const PLAYER_SPAWNPOINT_STATE = 4

const PLAYER_ACC = 2
const ZOMBIE_MAX_ACC = 1.3
const ZOMBIE_MIN_ACC = 1
const PLAYER_INERTIA = 0.4
const ZOMBIE_INERTIA = 0.2
const ZOMBIE_STUNNED_DELAY = 1000

const ZOMBIE_MAX_HEALTH = 50
const PLAYER_MAX_HEALTH = 200

const ZOMBIE_EASY_BASE_COUNT = 5
const ZOMBIE_REGULAR_BASE_COUNT = 8
const ZOMBIE_HARD_BASE_COUNT = 12
const ZOMBIE_EASY_INCR_COUNT = 2
const ZOMBIE_REGULAR_INCR_COUNT = 4
const ZOMBIE_HARD_INCR_COUNT = 6
const ZOMBIE_DEATH_ANIMATION_DELAY = 250 // ms
const ZOMBIE_REGULAR_DAMAGE = 20
// const ZOMBIE_REGULAR_DAMAGE = 0
const ZOMBIE_REGULAR_ATTACK_COOLDOWN = 1000

const BLOOD_STAIN_INTERVAL = 0 // ms
const BLOOD_STAIN_LIFETIME = 20000 // 20 seconds
const BLOOD_FADE_DELAY = 500

const REGEN_POD_INTERVAL = 10000
const REGEN_POD_VALUE = 150
const NOTIF_INTERVAL = 3000

const BLOOD_Z_ORDER = 100
const PLAYER_Z_ORDER = 200
const PLAYER_HEALTH_BAR_Z_ORDER = 300
const PLAYER_WEAPON_Z_ORDER = 300
const ZOMBIE_Z_ORDER = 200
const WALL_Z_ORDER = 50
const BULLET_Z_ORDER = 150
const REGEN_POD_Z_ORDER = 150

const WEAPON_COUNT = 8

/* -------------------------------------------------------------------------- */
/*                                   COLORS                                   */
/* -------------------------------------------------------------------------- */
const WALL_COLOR = 0x1b2a49
const CORNER_COLOR = 0x465881
const SPAWNER_COLOR = 0xb6b7b8
const GROUND_COLOR = 0xc9d1d3
const TILE_OUTLINE_COLOR = 0x1f6650
const HEALTH_BAR_COLOR = 0xa8ff3e
const HEALTH_BAR_BACKGROUND_COLOR = 0xff4949
const HEALTH_BAR_OUTLINE_COLOR = 0x333333
const REGEN_POD_COLOR = 0xc70d3a

const PLAYER_OUTLINE_COLOR = 0x4dd599
const PLAYER_COLOR = 0x00918e

const SCORE_RANGE = [0.8, 1]
const REGULAR_ZOMBIE_KILL_SCORE = 7000

const ZOMBIE_OUTLINE_COLOR = 0x1f6650
const ZOMBIE_COLOR = 0x6f9a8d

/* -------------------------------------------------------------------------- */
/*                                    GUNS                                    */
/* -------------------------------------------------------------------------- */
const GUNS_DATA = [
  {
    name: 'Regular Pistol',
    // ms
    cooldown: 300,
    bulletForce: 10,
    bulletMass: 50,
    bulletColor: 0x444444,
    bulletRadius: 4,
    bulletDamage: 40,
    // bulletDamage: 1000,
    bulletDurability: 1,
    scoreThreshold: 0
  },
  {
    name: 'Handy Handgun',
    // ms
    cooldown: 300,
    bulletForce: 15,
    bulletMass: 50,
    bulletColor: 0x333333,
    bulletRadius: 4,
    bulletDamage: 20,
    bulletDurability: 2,
    scoreThreshold: 20000
  },
  {
    name: '50 cal Sniper Rifle',
    // ms
    cooldown: 800,
    bulletForce: 15,
    bulletMass: 50,
    bulletColor: 0x222222,
    bulletRadius: 4,
    bulletDamage: 40,
    bulletDurability: 5,
    scoreThreshold: 60000
  },
  {
    name: 'Radioactive Laser-Mock',
    // ms
    cooldown: 50,
    bulletForce: 20,
    bulletMass: 100,
    bulletColor: 0x003f5c,
    bulletRadius: 4,
    bulletDamage: 0.5,
    bulletDurability: 1,
    scoreThreshold: 130000
  },
  {
    name: 'Dripping L85',
    // ms
    cooldown: 500,
    bulletForce: 15,
    bulletMass: 50,
    bulletColor: 0x85ef47,
    bulletRadius: 4,
    bulletDamage: 50,
    bulletDurability: 1,
    scoreThreshold: 240000
  },
  {
    name: 'Lightning Uzi',
    // ms
    cooldown: 100,
    bulletForce: 15,
    bulletMass: 50,
    bulletColor: 0xf1fa3c,
    bulletRadius: 5,
    bulletDamage: 8,
    // bulletDamage: 1000,
    bulletDurability: 2,
    scoreThreshold: 350000
  },
  {
    name: 'Mini Cannon Gun',
    // ms
    cooldown: 1000,
    bulletForce: 10,
    bulletMass: 500,
    bulletColor: 0xf89d13,
    bulletRadius: 10,
    bulletDamage: 40,
    // bulletDamage: 1000,
    bulletDurability: 5,
    scoreThreshold: 500000
  },
  {
    name: "Shrek's Rocket Gun",
    // ms
    cooldown: 1500,
    bulletForce: 5,
    bulletMass: 50,
    bulletColor: 0xa8ff3e,
    bulletRadius: 15,
    bulletDamage: 10,
    bulletDurability: 8,
    scoreThreshold: 800000
  }
]

/* -------------------------------------------------------------------------- */
/*                                  GENERATED                                 */
/* -------------------------------------------------------------------------- */
const MAP_WIDTH = DIMENSION * TILE_WIDTH
const MAP_HEIGHT = DIMENSION * TILE_WIDTH

const EASY = 'EASY'
const REGULAR = 'REGULAR'
const HARD = 'HARD'

const OFF = 'OFF'
const ON = 'ON'

// prettier-ignore
const DEFAULT_SMALL_MAP= [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,3,3,1,1,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1],
  [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
  [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
  [1,0,0,2,2,0,0,0,0,0,0,0,0,0,0,2,2,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,3,1,1,0,0,1,1,3,0,0,0,0,0,1],
  [1,0,0,0,2,1,1,2,2,1,1,2,2,1,1,2,0,0,0,1],
  [1,0,0,0,2,1,1,2,2,1,1,2,2,1,1,2,0,0,0,1],
  [1,0,0,0,0,0,3,1,1,0,0,1,1,3,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,2,2,0,0,0,0,0,0,0,0,0,0,2,2,0,0,1],
  [1,0,0,1,1,0,0,0,0,4,0,0,0,0,0,1,1,0,0,1],
  [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
  [1,3,3,1,1,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

// prettier-ignore
const DEFAULT_BIG_MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,3,3,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,3,3,0,1],
  [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,1,1,3,3,1,1,0,0,0,1,1,0,0,0,1,1,3,3,1,1,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,2,2,0,0,0,1,1,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,0,0,2,2,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,1,1,0,0,0,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,1,1,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,2,1,1,2,0,0,0,1,1,0,0,0,2,1,1,2,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,2,1,1,2,0,0,0,1,1,0,0,0,2,1,1,2,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,2,1,1,2,0,0,0,1,1,0,0,0,2,1,1,2,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,2,1,1,2,0,0,0,1,1,0,0,0,2,1,1,2,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,1,1,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,1,1,0,0,0,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,2,2,0,0,0,1,1,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,0,0,2,2,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,1,1,3,3,1,1,0,0,0,1,1,0,0,0,1,1,3,3,1,1,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1],
  [1,0,3,3,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,3,3,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]
