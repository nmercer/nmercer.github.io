# Site Model — nmercer.github.io

Personal dashboard for backcountry recreation in northwest Montana and surrounding regions. Aggregates avalanche forecasts, weather stations, webcams, snow data, and community links for daily planning of skiing, snowmobiling, and outdoor activities.

---

## index.html — Flathead Valley (Main Page)

**Region**: Northwest Montana — Flathead Valley, Whitefish Range, Swan Range, Glacier National Park
**Coordinates**: Centered around 48.407, -114.335 (Flathead area)

### Data Goals

**Avalanche**
- Flathead Avalanche Center (FAC): forecasts, observations, snowpack tracking, weather stations
- Search terms: `Flathead Avalanche Center`, `FAC avalanche forecast Montana`

**Weather & Snow**
- NOAA weather stations at mountain sites: Big Mountain (6737ft), Hornet Lookout (6500ft), Mount Aeneas (7120ft), Swan Lake (3100ft), Elk Mtn (4641ft), Snowslip (7020ft), Sperry Mountain (8038ft), Tunnel Ridge (6796ft), West Glacier Park (3154ft)
- SNOTEL sites: Grave Creek, Stahl Peak, Noisy Basin, Emery Creek, Flattop, Many Glacier, Pike Creek, Jocko, Hawkins
- Town weather: Eureka MT, Stryker MT, Whitefish MT, Bigfork MT, Coram MT, Essex MT, East Glacier MT, West Glacier MT
- OpenSummit maps: forecast radar, snow depth
- NWRFC snow data
- Air quality (Montana DEQ)
- Smoke forecasts (firesmoke.ca)
- Search terms: `SNOTEL Montana northwest`, `NOAA weather station Glacier Park`, `Montana air quality`

**Webcams**
- Whitefish Mountain Resort ski cams (Stumpy cam, base lodge, hellroaring)
- Flathead Lake cams (central, beach via elebase S3)
- Glacier National Park: Apgar Lookout, Middle Fork Bridge, Headquarters, St Mary, Two Medicine, West Entrance, Apgar Village, Lake McDonald, Many Glacier
- Creston 360, Desert Mountain 360
- Road cams: Essex, Hungry Horse (MDT RWIS)
- Search terms: `Whitefish Mountain webcam`, `Glacier National Park webcam`, `Montana road camera`

**Ski Resorts**
- Whitefish Mountain Resort (Big Mountain): snow report, webcams
- Search terms: `Whitefish Mountain snow report`, `Big Mountain ski conditions`

**Cross-Country Skiing**
- Blacktail Mountain / North Shore Nordic
- Dog Creek Lodge
- Glacier Nordic
- Search terms: `Flathead Valley cross country skiing grooming report`

**Snowmobiling**
- Flathead Snowmobile Association
- Ten Lakes Snowmobile Club
- Bitterroot Ridge Runner grooming/trail info
- Search terms: `Flathead snowmobile trail conditions`, `Ten Lakes snowmobile Montana`

**Community**
- Facebook groups: Backcountry Skiing, Snow & Dirt Bikers, Trail Fairies, Icebuds, Whitewater
- FAC Twitter/X feed

**Dynamic Data (JS)**
- Sunrise/sunset times via api.sunrise-sunset.org for Flathead coordinates

---

## canada/index.html — Canadian Rockies

**Region**: Southeast British Columbia — Nelson, Golden, Fernie, Kimberley, Revelstoke

### Data Goals

**Avalanche**
- Avalanche Canada: forecast map, blog, weather forecast, weather stations
- Search terms: `Avalanche Canada forecast`, `avalanche.ca`

**Nelson Area**
- Redfish Creek SNOTEL (Kokanee, 6900ft)
- Whitewater Ski Resort: snow report, lodge webcam
- Nelson Snowgoers: snowmobile area maps
- Search terms: `Whitewater ski resort Nelson BC`, `Nelson BC snowmobile`, `Kokanee Glacier snow`

**Golden Area**
- Kicking Horse Resort: snow report, webcam (khcam4 via skircr.com)
- Sled Golden: snowmobile riding areas
- Search terms: `Kicking Horse Resort snow report`, `Golden BC snowmobile`

**Fernie Area**
- Fernie Alpine Resort: snow report, webcam (fecam6 via skircr.com)
- Fernie Nordic: grooming report
- Morrissey Ridge SNOTEL (6100ft)
- Fernie Snowmobile Association: riding areas
- Search terms: `Fernie ski resort snow report`, `Fernie BC snowmobile`, `Fernie Nordic grooming`

**Kimberley Area**
- Kimberley Alpine Resort: snow report
- Kimberley Nordic: grooming report
- Search terms: `Kimberley ski resort snow report`, `Kimberley Nordic grooming BC`

**Revelstoke Area**
- Revelstoke Mountain Resort: snow report, gnorm webcam
- Revelstoke Nordic: grooming report
- Mount Revelstoke SNOTEL (6039ft)
- Sled Revelstoke: riding areas, webcams (revycam at Boulder Cabin 1670m)
- Mt Fidelity snowstake cam (Parks Canada, Rogers Pass)
- Search terms: `Revelstoke Mountain Resort snow report`, `Revelstoke snowmobile webcam`, `Rogers Pass snow conditions`

**Webcams**
- Sled Revelstoke revycam: `sledrevelstoke.com/cameras/revycam/CurrentImage.jpg`
- Mt Fidelity snowstake: `pc.gc.ca/images/remotecamera/sarnif/fidelity/snowstake.jpg`
- Fernie cam: `secure.skircr.com/cams2/fecam6/final.jpg`
- Whitewater lodge: `webcams.skiwhitewater.com/webcams/lodge/current.jpg`
- Revelstoke gnorm: `revelstokemountainresort.com/uploads/gnorm/gnorm-medium.jpg`
- Kicking Horse cam: `secure.skircr.com/cams2/khcam4/final.jpg`

**Community**
- Avalanche Canada Twitter/X feed

---

## panhandle/index.html — Idaho Panhandle

**Region**: North Idaho — Sandpoint, Bonners Ferry area

### Data Goals

**Avalanche**
- Idaho Panhandle Avalanche Center
- Search terms: `Idaho Panhandle Avalanche Center`, `north Idaho avalanche forecast`

**Snowmobiling**
- Sandpoint Winter Riders (Facebook)
- Search terms: `Sandpoint Idaho snowmobile`, `north Idaho snowmobile trails`

**Webcams**
- Currently minimal — needs expansion
- Search terms: `Sandpoint Idaho webcam`, `Schweitzer ski webcam`, `north Idaho road camera`

---

## Maintenance Notes

**Webcam URLs break frequently.** When checking or replacing webcams, search for:
- `[resort name] webcam` or `[resort name] webcam image URL`
- `[area] live camera` or `[area] snow camera`
- Check resort websites directly for updated cam paths
- BC highway cams: `images.drivebc.ca/bchighwaycam/pub/cameras/`
- Parks Canada cams: `pc.gc.ca/images/remotecamera/`
- Montana road cams: `rwis.mdt.mt.gov`
- Known webcam aggregators: seerevelstoke.com/discover/webcams, revyhub.com, onthesnow.com

**SNOTEL / Weather Station URLs are stable** — NWRFC snowplot URLs use station codes (e.g., GRCM8, STAM8) that rarely change.

**Twitter/X feeds** are embedded via platform.twitter.com widgets.
