/**
 * Store catalog.
 *
 * Prices are stored in the smallest currency unit (cents for USD). The shape is
 * deliberately provider-agnostic so a Shopify, Stripe, or custom catalog can
 * hydrate the same UI later without changing the components.
 */

export const fulfillmentTypes = [
  'digital',
  'print_on_demand',
  'third_party_fulfillment',
  'self_fulfilled',
];

export const products = [
  {
    id: 'print-mathematics-robotics-001',
    slug: 'mathematics-of-robotics',
    name: 'The Mathematics of Robotics',
    tagline: 'A visual field guide to the mathematics behind robotic motion.',
    description: 'A dense but legible map of coordinate frames, kinematics, Jacobians, trajectories, and the ideas that connect them.',
    category: 'prints',
    price: 3500,
    currency: 'USD',
    images: [
      { id: 'front', render: 'robotics-map', alt: 'The Mathematics of Robotics technical wall print' },
      { id: 'detail', render: 'robotics-detail', alt: 'Detail view of the robotics mathematics print' },
    ],
    type: 'Technical wall print',
    variants: [
      { id: '18x24', options: { Size: '18 × 24 in' }, price: 3500, available: true },
      { id: '24x36', options: { Size: '24 × 36 in' }, price: 4900, available: true },
    ],
    specifications: [
      { label: 'Dimensions', value: '18 × 24 in / 24 × 36 in' },
      { label: 'Material', value: '200 gsm archival matte paper' },
      { label: 'Manufacturing process', value: 'Giclée pigment print' },
      { label: 'Documentation', value: 'Reference index included' },
      { label: 'Country of manufacture', value: 'Produced nearest to destination' },
    ],
    inventory: { tracked: true, quantity: 42, status: 'in_stock' },
    fulfillmentType: 'print_on_demand',
    shipping: { estimate: '5–9 business days', summary: 'Ships rolled in a rigid protective tube.' },
    digitalFiles: [],
    included: ['One archival technical print', 'Reference index', 'Protective shipping tube'],
    featured: true,
  },
  {
    id: 'print-control-systems-001',
    slug: 'control-systems-map',
    name: 'The Control Systems Map',
    tagline: 'Feedback, stability, state space, and estimation on one sheet.',
    description: 'A connected reference for classical and modern control — designed for the wall beside the desk where systems get tuned.',
    category: 'prints',
    price: 3500,
    currency: 'USD',
    images: [
      { id: 'front', render: 'control-map', alt: 'The Control Systems Map technical wall print' },
      { id: 'detail', render: 'control-detail', alt: 'Detail view of feedback-loop diagrams' },
    ],
    type: 'Technical wall print',
    variants: [
      { id: '18x24', options: { Size: '18 × 24 in' }, price: 3500, available: true },
      { id: '24x36', options: { Size: '24 × 36 in' }, price: 4900, available: true },
    ],
    specifications: [
      { label: 'Dimensions', value: '18 × 24 in / 24 × 36 in' },
      { label: 'Material', value: '200 gsm archival matte paper' },
      { label: 'Manufacturing process', value: 'Giclée pigment print' },
      { label: 'Documentation', value: 'Notation guide included' },
      { label: 'Country of manufacture', value: 'Produced nearest to destination' },
    ],
    inventory: { tracked: true, quantity: 37, status: 'in_stock' },
    fulfillmentType: 'print_on_demand',
    shipping: { estimate: '5–9 business days', summary: 'Ships rolled in a rigid protective tube.' },
    digitalFiles: [],
    included: ['One archival technical print', 'Notation guide', 'Protective shipping tube'],
    featured: true,
  },
  {
    id: 'print-embedded-systems-001',
    slug: 'embedded-systems-map',
    name: 'The Embedded Systems Map',
    tagline: 'The stack from electrons and buses to firmware and real-time systems.',
    description: 'A compact systems view of embedded engineering: power, digital logic, processors, interfaces, firmware, timing, and debugging.',
    category: 'prints',
    price: 3500,
    currency: 'USD',
    images: [
      { id: 'front', render: 'embedded-map', alt: 'The Embedded Systems Map technical wall print' },
      { id: 'detail', render: 'embedded-detail', alt: 'Detail view of processor and interface diagrams' },
    ],
    type: 'Technical wall print',
    variants: [
      { id: '18x24', options: { Size: '18 × 24 in' }, price: 3500, available: true },
      { id: '24x36', options: { Size: '24 × 36 in' }, price: 4900, available: true },
    ],
    specifications: [
      { label: 'Dimensions', value: '18 × 24 in / 24 × 36 in' },
      { label: 'Material', value: '200 gsm archival matte paper' },
      { label: 'Manufacturing process', value: 'Giclée pigment print' },
      { label: 'Documentation', value: 'Interface legend included' },
      { label: 'Country of manufacture', value: 'Produced nearest to destination' },
    ],
    inventory: { tracked: true, quantity: 33, status: 'in_stock' },
    fulfillmentType: 'print_on_demand',
    shipping: { estimate: '5–9 business days', summary: 'Ships rolled in a rigid protective tube.' },
    digitalFiles: [],
    included: ['One archival technical print', 'Interface legend', 'Protective shipping tube'],
    featured: true,
  },
  {
    id: 'notebook-engineer-001',
    slug: 'engineers-notebook',
    name: 'The Engineer’s Notebook',
    tagline: 'A working notebook for calculations, diagrams, and experiments.',
    description: 'Dot-grid and engineering reference pages bound in a durable, bench-ready notebook with room for the untidy reality of building.',
    category: 'desk',
    price: 2900,
    currency: 'USD',
    images: [
      { id: 'front', render: 'notebook', alt: 'Black Engineer’s Notebook' },
      { id: 'inside', render: 'notebook-detail', alt: 'Engineering reference pages inside the notebook' },
    ],
    type: 'Engineering notebook',
    variants: [
      { id: 'a5-hardcover', options: { Format: 'A5 hardcover' }, price: 2900, available: true },
    ],
    specifications: [
      { label: 'Dimensions', value: '148 × 210 mm' },
      { label: 'Mass', value: '410 g' },
      { label: 'Material', value: 'Clothbound board, 100 gsm paper' },
      { label: 'Manufacturing process', value: 'Smyth sewn binding' },
      { label: 'Country of manufacture', value: 'United Kingdom' },
    ],
    inventory: { tracked: true, quantity: 18, status: 'in_stock' },
    fulfillmentType: 'third_party_fulfillment',
    shipping: { estimate: '4–8 business days', summary: 'Ships in a recyclable rigid mailer.' },
    digitalFiles: [],
    included: ['192 numbered pages', 'Engineering reference section', 'Two ribbon markers'],
    featured: true,
  },
  {
    id: 'desk-mat-engineering-001',
    slug: 'engineering-desk-mat',
    name: 'Engineering Desk Mat',
    tagline: 'A quiet work surface with the references you reach for most.',
    description: 'A low-contrast technical desk reference for electronics, mechanics, mathematics, and units — useful without becoming visual noise.',
    category: 'desk',
    price: 4500,
    currency: 'USD',
    images: [
      { id: 'front', render: 'desk-mat', alt: 'Engineering Desk Mat with technical reference grid' },
      { id: 'detail', render: 'desk-mat-detail', alt: 'Detail view of the desk mat reference markings' },
    ],
    type: 'Technical desk reference',
    variants: [
      { id: 'medium', options: { Size: '700 × 300 mm' }, price: 4500, available: true },
      { id: 'large', options: { Size: '900 × 400 mm' }, price: 5900, available: true },
    ],
    specifications: [
      { label: 'Dimensions', value: '700 × 300 mm / 900 × 400 mm' },
      { label: 'Mass', value: '620 g / 980 g' },
      { label: 'Material', value: 'Micro-texture polyester, natural rubber' },
      { label: 'Manufacturing process', value: 'Dye-sublimation print, stitched edge' },
      { label: 'Country of manufacture', value: 'Taiwan' },
    ],
    inventory: { tracked: true, quantity: 24, status: 'in_stock' },
    fulfillmentType: 'third_party_fulfillment',
    shipping: { estimate: '6–10 business days', summary: 'Ships rolled, never folded.' },
    digitalFiles: [],
    included: ['One technical desk mat', 'Care guide'],
    featured: true,
  },
  {
    id: 'digital-engineering-os-001',
    slug: 'engineering-os',
    name: 'Engineering OS',
    tagline: 'A connected knowledge system for research, design, and experiments.',
    description: 'A structured digital workspace for turning references into decisions, decisions into builds, and builds into documented knowledge.',
    category: 'digital',
    price: 4900,
    currency: 'USD',
    images: [
      { id: 'overview', render: 'engineering-os', alt: 'Engineering OS digital knowledge system overview' },
      { id: 'detail', render: 'engineering-os-detail', alt: 'Engineering OS project and experiment views' },
    ],
    type: 'Digital engineering knowledge system',
    variants: [
      { id: 'personal', options: { License: 'Personal' }, price: 4900, available: true },
      { id: 'studio', options: { License: 'Small studio' }, price: 9900, available: true },
    ],
    specifications: [
      { label: 'Format', value: 'Markdown, CSV, PDF' },
      { label: 'Documentation', value: 'Setup guide and example project' },
      { label: 'CAD availability', value: 'CAD library structure included' },
      { label: 'Firmware', value: 'Firmware release workflow included' },
      { label: 'Updates', value: 'All v1.x updates included' },
    ],
    inventory: { tracked: false, quantity: null, status: 'available' },
    fulfillmentType: 'digital',
    shipping: null,
    digitalFiles: [
      { name: 'Engineering OS workspace', format: 'ZIP' },
      { name: 'Setup and operating guide', format: 'PDF' },
    ],
    included: ['Complete workspace system', 'Example robotics project', 'Setup guide', 'All v1.x updates'],
    featured: true,
  },
];

export const categoryLabels = {
  all: 'All',
  prints: 'Prints',
  desk: 'Desk',
  digital: 'Digital',
  tools: 'Tools',
  electronics: 'Electronics',
  robotics: 'Robotics',
};

export const visibleCategories = ['all', ...Array.from(new Set(products.map((product) => product.category)))];

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);

