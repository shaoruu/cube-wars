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

const PLAYER_ACC = 1
const ZOMBIE_MAX_ACC = 1.3
const ZOMBIE_MIN_ACC = 1
const PLAYER_INERTIA = 0.4
const ZOMBIE_INERTIA = 0.2
const ZOMBIE_STUNNED_DELAY = 1000

const ZOMBIE_MAX_HEALTH = 50
const PLAYER_MAX_HEALTH = 200

const ZOMBIE_BASE_COUNT = 15
const ZOMBIE_INCR_COUNT = 4
const ZOMBIE_DEATH_ANIMATION_DELAY = 250 // ms
const ZOMBIE_REGULAR_DAMAGE = 20
const ZOMBIE_REGULAR_ATTACK_COOLDOWN = 1000

const BLOOD_STAIN_INTERVAL = 100 // ms
const BLOOD_STAIN_LIFETIME = 20000 // 20 seconds
const BLOOD_FADE_DELAY = 500

const REGEN_POD_INTERVAL = 5000
const REGEN_POD_VALUE = 150

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
const REGULAR_ZOMBIE_KILL_SCORE = 8000

const ZOMBIE_OUTLINE_COLOR = 0x1f6650
const ZOMBIE_COLOR = 0x6f9a8d

/* -------------------------------------------------------------------------- */
/*                                    GUNS                                    */
/* -------------------------------------------------------------------------- */
const GUNS_DATA = [
  {
    name: 'Regular Pistol',
    // ms
    cooldown: 100,
    bulletForce: 10,
    bulletMass: 50,
    bulletColor: 0xf1fa3c,
    bulletRadius: 3,
    bulletDamage: 10,
    bulletDurability: 1,
    scoreThreshold: 0
  },
  {
    name: 'Regular Pistol',
    // ms
    cooldown: 1000,
    bulletForce: 5,
    bulletMass: 50,
    bulletColor: 0xf89d13,
    bulletRadius: 1,
    bulletDamage: 10,
    bulletDurability: 1,
    scoreThreshold: 0
  },
  {
    name: 'Regular Pistol',
    // ms
    cooldown: 1000,
    bulletForce: 5,
    bulletMass: 50,
    bulletColor: 0xf89d13,
    bulletRadius: 1,
    bulletDamage: 10,
    bulletDurability: 1,
    scoreThreshold: 0
  },
  {
    name: 'Regular Pistol',
    // ms
    cooldown: 1000,
    bulletForce: 5,
    bulletMass: 50,
    bulletColor: 0xf89d13,
    bulletRadius: 1,
    bulletDamage: 10,
    bulletDurability: 1,
    scoreThreshold: 0
  },
  {
    name: 'Regular Pistol',
    // ms
    cooldown: 1000,
    bulletForce: 5,
    bulletMass: 50,
    bulletColor: 0xf89d13,
    bulletRadius: 1,
    bulletDamage: 10,
    bulletDurability: 1,
    scoreThreshold: 0
  },
  {
    name: 'Regular Pistol',
    // ms
    cooldown: 1000,
    bulletForce: 5,
    bulletMass: 50,
    bulletColor: 0xf89d13,
    bulletRadius: 1,
    bulletDamage: 10,
    bulletDurability: 1,
    scoreThreshold: 0
  },
  {
    name: 'Regular Pistol',
    // ms
    cooldown: 1000,
    bulletForce: 5,
    bulletMass: 50,
    bulletColor: 0xf89d13,
    bulletRadius: 1,
    bulletDamage: 10,
    bulletDurability: 1,
    scoreThreshold: 0
  },
  {
    name: 'Regular Pistol',
    // ms
    cooldown: 1000,
    bulletForce: 5,
    bulletMass: 50,
    bulletColor: 0xf89d13,
    bulletRadius: 1,
    bulletDamage: 10,
    bulletDurability: 1,
    scoreThreshold: 0
  }
]

/* -------------------------------------------------------------------------- */
/*                                  GENERATED                                 */
/* -------------------------------------------------------------------------- */
const MAP_WIDTH = DIMENSION * TILE_WIDTH
const MAP_HEIGHT = DIMENSION * TILE_WIDTH

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
