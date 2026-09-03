/* ==========================================================================
   Owensboro Home Expo — single source of truth for show data.
   EDIT THIS FILE to update the countdown and the vendor directory.
   (Date text that appears in page copy also lives in the HTML — see README.)
   ========================================================================== */

window.EXPO = {
  year: 2027,

  /* Countdown target = doors open, Saturday 10:00 AM Central.
     ISO-8601 with the -06:00 offset (US Central Daylight Time in March). */
  startsAt: '2027-03-13T10:00:00-06:00',

  /* Confirmed 2027 show dates. To change them site-wide, use ./update-dates.sh
     rather than editing here — the dates also appear in page copy, titles,
     meta descriptions and the structured data on the home page. */
  dates: 'March 13–14, 2027',
  saturday: 'Saturday, March 13',
  sunday: 'Sunday, March 14',
  hoursSat: '10:00 AM – 5:00 PM',
  hoursSun: '11:00 AM – 4:00 PM',

  venue: 'Owensboro Convention Center',
  address: '501 West 2nd Street, Owensboro, KY 42301',

  /* Exhibitor-only reception the evening before the show opens. */
  reception: 'Friday, March 12 · 6–8 p.m. · HBAO Building'
};

/* --------------------------------------------------------------------------
   EXHIBITOR DIRECTORY
   --------------------------------------------------------------------------
   Drives the directory on vendors.html and the six-card preview on the home
   page. Category filter chips build themselves from the `category` values in
   use, so adding a new category here is all it takes.

   Fields:
     name     (required)  Business name
     category (required)  Any string — see CATEGORIES below for the ones in use
     blurb    (required)  1–2 sentences, ~120–180 characters reads best
     logo     (optional)  Path under assets/img/vendors/ (lowercase, hyphenated)
     website  (optional)  Full URL including https://
     phone    (optional)  Display format, e.g. '(270) 555-0100'
     booth    (optional)  Booth number, e.g. '204'
     featured (optional)  true = sorts to the top of the directory
-------------------------------------------------------------------------- */

window.CATEGORIES = [
  'Builders & Remodeling',
  'Windows, Doors & Flooring',
  'Heating, Cooling & Insulation',
  'Outdoor & Landscape',
  'Pools & Spas',
  'Home Services',
  'Building Supply & Energy',
  'Finance & Insurance'
];

window.VENDORS = [
  {
    name: 'Hill Custom Homes',
    category: 'Builders & Remodeling',
    blurb: 'Custom home building in the Owensboro area — from lot selection and plan design through to finish-out.',
    logo: 'assets/img/vendors/hill-custom-homes.jpg',
    website: 'https://hillcustom.com/'
  },
  {
    name: 'Homes by Mattingly Construction',
    category: 'Builders & Remodeling',
    blurb: 'Custom home building and construction management, handling new builds and major remodeling projects across Daviess County.',
    logo: 'assets/img/vendors/homes-by-mattingly-construction.png',
    website: 'https://mattinglyhomes.com/'
  },
  {
    name: 'Sun Windows and Doors',
    category: 'Windows, Doors & Flooring',
    blurb: 'Regionally manufactured windows and doors for new construction and replacement projects, built to order.',
    logo: 'assets/img/vendors/sun-windows.svg',
    website: 'https://sunwindows.com/'
  },
  {
    name: "Wilson's Custom Flooring",
    category: 'Windows, Doors & Flooring',
    blurb: 'Flooring supply and installation — hardwood, luxury vinyl, tile and carpet, measured and fitted to your rooms.',
    logo: 'assets/img/vendors/wilsons-custom-flooring.webp',
    website: 'https://www.wilsonscustom.com/'
  },
  {
    name: 'Budget Blinds of Owensboro',
    category: 'Windows, Doors & Flooring',
    blurb: 'Custom window coverings — blinds, shades, shutters and drapery, with in-home measuring and installation.',
    logo: 'assets/img/vendors/budget-blinds.svg',
    website: 'https://www.budgetblinds.com/owensboro/'
  },
  {
    name: 'Schwartz Heating & Cooling',
    category: 'Heating, Cooling & Insulation',
    blurb: 'HVAC installation, seasonal maintenance and repair service for homeowners across the Green River region.',
    logo: 'assets/img/vendors/schwartz-heating-cooling.webp',
    website: 'https://www.schwartzheatingandcooling.com/'
  },
  {
    name: 'Owensboro Insulators',
    category: 'Heating, Cooling & Insulation',
    blurb: 'Residential and commercial insulation for new builds and retrofits, helping cut heating and cooling costs.',
    logo: 'assets/img/vendors/owensboro-insulators.webp',
    website: 'https://www.owensboroinsulators.com/'
  },
  {
    name: 'Backwoods Spray Foam',
    category: 'Heating, Cooling & Insulation',
    blurb: 'Spray foam insulation for attics, crawl spaces, walls and metal buildings — sealing air leaks at the source.',
    logo: 'assets/img/vendors/backwoods-spray-foam.jpg',
    website: 'https://backwoodsfoam.com/'
  },
  {
    name: 'Barnard Landscaping',
    category: 'Outdoor & Landscape',
    blurb: 'Landscape design, installation and maintenance — planting, hardscaping and outdoor living spaces.',
    logo: 'assets/img/vendors/barnard-landscaping.jpg',
    website: ''
  },
  {
    name: 'Rager Fencing & Lawn Care',
    category: 'Outdoor & Landscape',
    blurb: 'Fence installation in wood, vinyl, aluminum and chain link, plus ongoing lawn care and property upkeep.',
    logo: 'assets/img/vendors/rager-fencing.png',
    website: 'https://ragerfencinglawncarellc.com/'
  },
  {
    name: 'Bedrock Pools',
    category: 'Pools & Spas',
    blurb: 'In-ground pool design and construction, plus decking, water features and full backyard build-outs.',
    logo: 'assets/img/vendors/bedrock-pools.webp',
    website: 'https://bedrockpoolsky.com/'
  },
  {
    name: 'Disaster Team',
    category: 'Home Services',
    blurb: 'Water, fire and storm damage restoration — emergency mitigation, cleanup and reconstruction.',
    logo: 'assets/img/vendors/disaster-team.jpg',
    website: 'https://disasterteaminc.com/'
  },
  {
    name: 'Winsupply of Owensboro',
    category: 'Building Supply & Energy',
    blurb: 'Local distributor of plumbing, HVAC and waterworks supplies for contractors and trade professionals.',
    logo: 'assets/img/vendors/winsupply-owensboro.svg',
    website: 'https://www.winsupplyinc.com/ftue'
  },
  {
    name: 'Atmos Energy',
    category: 'Building Supply & Energy',
    blurb: 'Natural gas service, appliance rebates and energy-efficiency guidance for new builds and remodels.',
    logo: 'assets/img/vendors/atmos-energy.svg',
    website: 'https://www.atmosenergy.com/'
  },
  {
    name: 'Kentucky Farm Bureau Insurance',
    category: 'Finance & Insurance',
    blurb: 'Homeowners, builder\u2019s risk and property coverage from local agents who know Daviess County.',
    logo: 'assets/img/vendors/kentucky-farm-bureau.jpg',
    website: 'https://www.kyfb.com/'
  }
];

/* --------------------------------------------------------------------------
   GALLERY — photos from the 2026 show
   --------------------------------------------------------------------------
   Rendered on media.html, in this order.

     src    Full-size image used in the lightbox (1800px wide)
     thumb  Smaller image used for the grid tile (800px wide)
     alt    Descriptive alt text — required for screen readers
     cap    Short caption, shown on hover and under the lightbox image

   To add photos: resize to 1800px (plus an 800px "-thumb"), save as JPEG at
   about quality 82, drop them in assets/img/gallery/ and add an entry here.
   Never put camera originals in this folder — see the README.
-------------------------------------------------------------------------- */

window.GALLERY = [
  { src: "assets/img/gallery/expo-2026-01.jpg",
    thumb: "assets/img/gallery/expo-2026-01-thumb.jpg",
    alt: "A booth showing an illuminated wooden bar cabinet with glass shelving",
    cap: "Kitchen Interiors' backlit cabinetry and bar display" },
  { src: "assets/img/gallery/expo-2026-02.jpg",
    thumb: "assets/img/gallery/expo-2026-02-thumb.jpg",
    alt: "Racks of granite and quartz countertop samples at a stone fabricator's booth",
    cap: "Countertop and stone samples" },
  { src: "assets/img/gallery/expo-2026-03.jpg",
    thumb: "assets/img/gallery/expo-2026-03-thumb.jpg",
    alt: "Exhibitors assembling a large stacked-boulder water feature",
    cap: "A boulder water feature going up on the floor" },
  { src: "assets/img/gallery/expo-2026-04.jpg",
    thumb: "assets/img/gallery/expo-2026-04-thumb.jpg",
    alt: "A booth table covered with framed photographs of newly built homes",
    cap: "Homes by Mattingly's new-construction gallery" },
  { src: "assets/img/gallery/expo-2026-05.jpg",
    thumb: "assets/img/gallery/expo-2026-05-thumb.jpg",
    alt: "Two workers laying stone edging beside a compact loader before the show opens",
    cap: "Building a live hardscape display during move-in" },
  { src: "assets/img/gallery/expo-2026-06.jpg",
    thumb: "assets/img/gallery/expo-2026-06-thumb.jpg",
    alt: "Angled display racks holding hardwood and vinyl flooring samples",
    cap: "Wilson's Custom Flooring sample racks" },
  { src: "assets/img/gallery/expo-2026-07.jpg",
    thumb: "assets/img/gallery/expo-2026-07-thumb.jpg",
    alt: "A pest control company's booth with branded signage and literature",
    cap: "SWAT Pest Management on the floor" },
  { src: "assets/img/gallery/expo-2026-08.jpg",
    thumb: "assets/img/gallery/expo-2026-08-thumb.jpg",
    alt: "A large landscape display with artificial turf, evergreens and natural stone",
    cap: "Turf, trees and boulders in an outdoor-living display" },
  { src: "assets/img/gallery/expo-2026-09.jpg",
    thumb: "assets/img/gallery/expo-2026-09-thumb.jpg",
    alt: "A landscaping company's sign set into a display of natural rock",
    cap: "Hobgood Landscaping & Irrigation's stone display" },
  { src: "assets/img/gallery/expo-2026-10.jpg",
    thumb: "assets/img/gallery/expo-2026-10-thumb.jpg",
    alt: "Three visitors talking with staff at a gutter protection booth",
    cap: "Attendees at the LeafFilter gutter protection booth" },
  { src: "assets/img/gallery/expo-2026-11.jpg",
    thumb: "assets/img/gallery/expo-2026-11-thumb.jpg",
    alt: "Two men leaning over a booth table during a live product demonstration",
    cap: "A hands-on product demonstration" },
  { src: "assets/img/gallery/expo-2026-12.jpg",
    thumb: "assets/img/gallery/expo-2026-12-thumb.jpg",
    alt: "A visitor and an exhibitor examining a tiled walk-in shower display",
    cap: "Comparing a walk-in shower surround" },
  { src: "assets/img/gallery/expo-2026-13.jpg",
    thumb: "assets/img/gallery/expo-2026-13-thumb.jpg",
    alt: "Visitors gathered around a square fire bowl at a pool company's booth",
    cap: "Talking pools and fire features" },
  { src: "assets/img/gallery/expo-2026-14.jpg",
    thumb: "assets/img/gallery/expo-2026-14-thumb.jpg",
    alt: "A boat on a trailer displayed inside the exhibit hall",
    cap: "A boat display on the show floor" },
  { src: "assets/img/gallery/expo-2026-15.jpg",
    thumb: "assets/img/gallery/expo-2026-15-thumb.jpg",
    alt: "Staff in red shirts talking with attendees beside a garage door display",
    cap: "Exhibitors meeting visitors" },
  { src: "assets/img/gallery/expo-2026-16.jpg",
    thumb: "assets/img/gallery/expo-2026-16-thumb.jpg",
    alt: "Attendees browsing materials at the Kentucky Farm Bureau Insurance booth",
    cap: "Visitors at the Kentucky Farm Bureau booth" },
  { src: "assets/img/gallery/expo-2026-17.jpg",
    thumb: "assets/img/gallery/expo-2026-17-thumb.jpg",
    alt: "Two children playing on a miniature golf and putting green display",
    cap: "Kids on the putting-green display" },
  { src: "assets/img/gallery/expo-2026-18.jpg",
    thumb: "assets/img/gallery/expo-2026-18-thumb.jpg",
    alt: "A booth showing air movers and drying equipment used in damage restoration",
    cap: "Restoration equipment on display" },
  { src: "assets/img/gallery/expo-2026-19.jpg",
    thumb: "assets/img/gallery/expo-2026-19-thumb.jpg",
    alt: "Three attendees in conversation with an exhibitor on the show floor",
    cap: "Homeowners comparing notes with an exhibitor" },
  { src: "assets/img/gallery/expo-2026-20.jpg",
    thumb: "assets/img/gallery/expo-2026-20-thumb.jpg",
    alt: "Visitors browsing brochures spread across an exhibitor's table",
    cap: "Gathering brochures and ideas" },
  { src: "assets/img/gallery/expo-2026-21.jpg",
    thumb: "assets/img/gallery/expo-2026-21-thumb.jpg",
    alt: "Three exhibitors standing together in front of fence panel displays",
    cap: "An exhibitor team at their booth" },
  { src: "assets/img/gallery/expo-2026-22.jpg",
    thumb: "assets/img/gallery/expo-2026-22-thumb.jpg",
    alt: "Five exhibitors posed together in front of wooden fence panels",
    cap: "The team behind a fencing display" },
  { src: "assets/img/gallery/expo-2026-23.jpg",
    thumb: "assets/img/gallery/expo-2026-23-thumb.jpg",
    alt: "Three exhibitors standing together at their booth",
    cap: "Exhibitor team on the show floor" }
];
