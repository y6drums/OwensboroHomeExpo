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
     logoDark (optional)  true = white-lettered logo, shown on a navy plate
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
  'Home Services',
  'Building Supply & Energy',
  'Finance & Insurance',
  'Community & Education'
];

window.VENDORS = [
  {
    name: 'Lee Building Products',
    category: 'Building Supply & Energy',
    blurb: 'Brick, concrete masonry, pavers, retaining walls, stone and outdoor living products for residential and commercial projects.',
    logo: 'assets/img/sponsors/lee-building-products.webp',
    website: 'https://www.leebp.com/',
    featured: true
  },
  {
    name: 'Winsupply of Owensboro',
    category: 'Building Supply & Energy',
    blurb: 'Local distributor of plumbing, HVAC and waterworks supplies for contractors and trade professionals.',
    logo: 'assets/img/vendors/winsupply-owensboro.svg',
    website: 'https://www.winsupplyinc.com/ftue',
    featured: true
  },
  {
    name: 'Homes by Mattingly Construction',
    category: 'Builders & Remodeling',
    blurb: 'Custom home building and construction management, handling new builds and major remodeling projects across Daviess County.',
    logo: 'assets/img/vendors/homes-by-mattingly-construction.png',
    website: 'https://mattinglyhomes.com/'
  },
  {
    name: 'Trident Painting',
    category: 'Builders & Remodeling',
    blurb: 'Residential and commercial painting, plus cabinet painting, epoxy floor coatings, drywall repair and pressure washing.',
    logo: 'assets/img/vendors/trident-painting.png',
    website: 'https://tridentpaintingllc.com/'
  },
  {
    name: 'Unique Granite & Marble',
    category: 'Builders & Remodeling',
    blurb: 'Custom granite, marble and quartz countertops — measured, fabricated and installed from an Owensboro shop.',
    logo: 'assets/img/vendors/unique-granite-and-marble.png',
    logoDark: true,
    website: 'https://www.uniquegraniteandmarble.com/'
  },
  {
    name: 'Sun Windows and Doors',
    category: 'Windows, Doors & Flooring',
    blurb: 'Regionally manufactured windows and doors for new construction and replacement projects, built to order.',
    logo: 'assets/img/vendors/sun-windows.svg',
    website: 'https://sunwindows.com/'
  },
  {
    name: 'Window Shopping',
    category: 'Windows, Doors & Flooring',
    blurb: 'Replacement windows and doors — including storm, patio and French doors — for homes in the Owensboro and Evansville area.',
    logo: 'assets/img/vendors/window-shopping.webp',
    website: 'https://windowshoppingevansville.com/service-areas/owensboro-ky/'
  },
  {
    name: 'Owensboro Garage Doors',
    category: 'Windows, Doors & Flooring',
    blurb: 'Residential and commercial garage doors and openers — sales, installation, repair and maintenance.',
    logo: 'assets/img/vendors/owensboro-garage-doors.png',
    logoDark: true,
    website: 'https://owensborogaragedoors.com/'
  },
  {
    name: "Wilson's Custom Flooring",
    category: 'Windows, Doors & Flooring',
    blurb: 'Flooring supply and installation — hardwood, luxury vinyl, tile and carpet, measured and fitted to your rooms.',
    logo: 'assets/img/vendors/wilsons-custom-flooring.webp',
    website: 'https://www.wilsonscustom.com/'
  },
  {
    name: 'Carpets Unlimited Flooring Center',
    category: 'Windows, Doors & Flooring',
    blurb: 'Flooring sales and installation — carpet, hardwood, vinyl, laminate and ceramic tile.',
    logo: 'assets/img/vendors/carpets-unlimited.png',
    website: 'https://www.carpetsunl.com/'
  },
  {
    name: 'Budget Blinds of Owensboro',
    category: 'Windows, Doors & Flooring',
    blurb: 'Custom window coverings — blinds, shades, shutters and drapery, with in-home measuring and installation.',
    logo: 'assets/img/vendors/budget-blinds.svg',
    website: 'https://www.budgetblinds.com/owensboro/'
  },
  {
    name: 'Simmonds Blinds and Drapes',
    category: 'Windows, Doors & Flooring',
    blurb: 'Blinds, shades, drapery, motorized and exterior shades and awnings for homes and businesses, measured and installed.',
    logo: 'assets/img/vendors/simmonds-blinds-and-drapes.png',
    website: 'https://www.simmondsblinds.com/'
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
    name: "River's Edge Lawn & Landscape",
    category: 'Outdoor & Landscape',
    blurb: 'Lawn care, landscape and hardscape design and installation, and yard drainage for homes and businesses.',
    logo: 'assets/img/vendors/rivers-edge-lawn-and-landscape.png',
    website: 'https://www.riversedgelawn.net/'
  },
  {
    name: 'Hobgood Landscaping',
    category: 'Outdoor & Landscape',
    blurb: 'Year-round lawn care, landscaping, irrigation and landscape lighting for residential and commercial properties.',
    logo: 'assets/img/vendors/hobgood-landscaping.png',
    website: 'https://www.hobgoodlandscaping.com/'
  },
  {
    name: 'Rager Fencing & Lawn Care',
    category: 'Outdoor & Landscape',
    blurb: 'Fence installation in wood, vinyl, aluminum and chain link, plus ongoing lawn care and property upkeep.',
    logo: 'assets/img/vendors/rager-fencing.png',
    website: 'https://ragerfencinglawncarellc.com/'
  },
  {
    name: 'Disaster Team',
    category: 'Home Services',
    blurb: 'Water, fire and storm damage restoration — emergency mitigation, cleanup and reconstruction.',
    logo: 'assets/img/vendors/disaster-team.jpg',
    website: 'https://disasterteaminc.com/'
  },
  {
    name: 'The Honey Do Service',
    category: 'Home Services',
    blurb: 'Handyman and home-improvement work — repairs, carpentry, drywall, painting, flooring and remodels.',
    logo: 'assets/img/vendors/honey-do-service.png',
    logoDark: true,
    website: 'https://honeydoservice.com/improving/owensboro-ky/'
  },
  {
    name: 'Patriot Pest',
    category: 'Home Services',
    blurb: 'Residential and commercial pest control, including termite, rodent and bed bug treatment and prevention plans.',
    logo: 'assets/img/vendors/patriot-pest.jpg',
    website: 'https://patriotpestky.com/'
  },
  {
    name: "Ryan's Roll-Off Dumpsters",
    category: 'Home Services',
    blurb: 'Roll-off dumpster rental for construction, remodeling and cleanout debris, booked online.',
    logo: 'assets/img/vendors/ryans-roll-off-dumpsters.png',
    website: 'https://www.ryansrolloffdumpsters.com/'
  },
  {
    name: 'Ever Bin Clean',
    category: 'Home Services',
    blurb: 'Cleaning, disinfecting and deodorizing for residential garbage cans and dumpsters.',
    logo: 'assets/img/vendors/ever-bin-clean.png',
    website: 'https://everbinclean.com/'
  },
  {
    name: 'MarkWell & Co.',
    category: 'Home Services',
    blurb: 'Custom fabrication studio making wall art, signage, monuments, memorials, dedication plaques and engraving.',
    logo: 'assets/img/vendors/markwell-and-co.svg',
    website: 'https://www.markwellandco.com/'
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
    blurb: 'Homeowners, builder’s risk and property coverage from local agents who know Daviess County.',
    logo: 'assets/img/vendors/kentucky-farm-bureau.jpg',
    website: 'https://www.kyfb.com/'
  },
  {
    name: 'Rural 1st',
    category: 'Finance & Insurance',
    blurb: 'Rural home, land and lot loans from a Farm Credit lender, served locally through Farm Credit Mid-America.',
    logo: 'assets/img/vendors/rural-1st.svg',
    website: 'https://www.rural1st.com/'
  },
  {
    name: 'Owensboro Community & Technical College',
    category: 'Community & Education',
    blurb: 'Associate degrees, certificates and technical training in the trades, including a carpentry certificate.',
    logo: 'assets/img/vendors/octc.svg',
    website: 'https://owensboro.kctcs.edu/'
  },
  {
    name: 'OHS Carpentry',
    category: 'Community & Education',
    blurb: 'Owensboro High School carpentry students, showing the picnic tables, sheds and other projects built in class.',
    website: ''
  },
  {
    name: 'Daviess County Extension Master Gardeners',
    category: 'Community & Education',
    blurb: 'Volunteers trained by the county Extension office, answering home gardening questions and running community garden projects.',
    logo: 'assets/img/vendors/master-gardeners.png',
    website: 'https://daviess.ca.uky.edu/GRAEMGA'
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
